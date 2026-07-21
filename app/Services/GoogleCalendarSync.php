<?php

namespace App\Services;

use App\Models\Calendar\GoogleCalendarConnection;
use App\Models\Calendar\GoogleCalendarEvent;
use Carbon\Carbon;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Throwable;

class GoogleCalendarSync
{
    public function __construct(private GoogleCalendarClient $client)
    {
    }

    public function sync(GoogleCalendarConnection $connection, bool $retryExpiredToken = true): int
    {
        try {
            [$events, $nextSyncToken] = $this->download($connection);
            $recurringThrough = GoogleCalendarEvent::recurringSyncThrough();

            DB::transaction(function () use ($connection, $events, $nextSyncToken, $recurringThrough) {
                if (! $connection->sync_token) {
                    $connection->events()->delete();
                } else {
                    $cutoff = GoogleCalendarEvent::syncCutoff();

                    $connection->events()
                        ->where(function ($events) use ($cutoff) {
                            $events->where(function ($allDay) use ($cutoff) {
                                $allDay->where('all_day', true)
                                    ->whereDate('start_date', '<', $cutoff->toDateString());
                            })->orWhere(function ($timed) use ($cutoff) {
                                $timed->where('all_day', false)
                                    ->where('starts_at', '<', $cutoff->copy()->utc());
                            });
                        })
                        ->delete();
                }

                $connection->events()
                    ->beyondRecurringSyncHorizon($recurringThrough)
                    ->delete();

                foreach ($events as $event) {
                    $this->applyEvent($connection, $event, $recurringThrough);
                }

                $connection->update([
                    'sync_token' => $nextSyncToken ?: $connection->sync_token,
                    'last_synced_at' => now(),
                    'last_error' => null,
                ]);
            });

            return count($events);
        } catch (RequestException $exception) {
            if ($retryExpiredToken && $exception->response?->status() === 410) {
                $connection->update(['sync_token' => null]);

                return $this->sync($connection->fresh(), false);
            }

            $this->recordError($connection, $exception);
            throw $exception;
        } catch (Throwable $exception) {
            $this->recordError($connection, $exception);
            throw $exception;
        }
    }

    private function download(GoogleCalendarConnection $connection): array
    {
        $parameters = [
            'maxResults' => 2500,
            'showDeleted' => 'true',
            'singleEvents' => 'true',
        ];

        if ($connection->sync_token) {
            $parameters['syncToken'] = $connection->sync_token;
        } else {
            $parameters['timeMin'] = GoogleCalendarEvent::syncCutoff()
                ->utc()
                ->toRfc3339String();
        }

        $events = [];
        $nextSyncToken = null;

        do {
            $page = $this->client->listEvents($connection, $parameters);
            $events = array_merge($events, $page['items'] ?? []);
            $nextSyncToken = $page['nextSyncToken'] ?? $nextSyncToken;
            $pageToken = $page['nextPageToken'] ?? null;

            if ($pageToken) {
                $parameters['pageToken'] = $pageToken;
            }
        } while ($pageToken);

        return [$events, $nextSyncToken];
    }

    private function applyEvent(
        GoogleCalendarConnection $connection,
        array $event,
        Carbon $recurringThrough
    ): void
    {
        $googleEventId = $event['id'] ?? null;

        if (! $googleEventId) {
            return;
        }

        $existing = $connection->events()->where('google_event_id', $googleEventId);
        $selfAttendee = collect($event['attendees'] ?? [])->firstWhere('self', true);
        $organizerIsSelf = (bool) Arr::get($event, 'organizer.self', false);
        $responseStatus = $selfAttendee['responseStatus'] ?? null;

        if (($event['status'] ?? null) === 'cancelled'
            || ! $selfAttendee
            || $organizerIsSelf
            || $responseStatus === 'declined') {
            $existing->delete();
            return;
        }

        $allDay = isset($event['start']['date']);
        $startsAt = $allDay ? null : $this->parseDateTime(Arr::get($event, 'start.dateTime'));
        $endsAt = $allDay ? null : $this->parseDateTime(Arr::get($event, 'end.dateTime'));

        if ((! $allDay && (! $startsAt || ! $endsAt)) || ($allDay && ! Arr::get($event, 'start.date'))) {
            return;
        }

        $eventStart = $allDay
            ? Carbon::parse(Arr::get($event, 'start.date'), config('calendar.timezone'))->startOfDay()
            : $startsAt->copy()->setTimezone(config('calendar.timezone'));

        if ($eventStart->lt(GoogleCalendarEvent::syncCutoff())) {
            $existing->delete();
            return;
        }

        if (! empty($event['recurringEventId'])
            && $eventStart->gt($recurringThrough)) {
            $existing->delete();
            return;
        }

        $connection->events()->updateOrCreate(
            ['google_event_id' => $googleEventId],
            [
                'recurring_event_id' => $event['recurringEventId'] ?? null,
                'title' => $event['summary'] ?? 'Untitled Google event',
                'description' => $event['description'] ?? null,
                'location' => $event['location'] ?? null,
                'html_link' => $event['htmlLink'] ?? null,
                'meeting_url' => $event['hangoutLink'] ?? $this->videoEntryPoint($event),
                'response_status' => $responseStatus,
                'all_day' => $allDay,
                'starts_at' => $startsAt,
                'ends_at' => $endsAt,
                'start_date' => $allDay ? Arr::get($event, 'start.date') : null,
                'end_date' => $allDay ? Arr::get($event, 'end.date') : null,
                'organizer_name' => Arr::get($event, 'organizer.displayName'),
                'organizer_email' => Arr::get($event, 'organizer.email'),
                'attendees' => $event['attendees'] ?? [],
                'google_updated_at' => $this->parseDateTime($event['updated'] ?? null),
            ]
        );
    }

    private function parseDateTime(?string $value): ?Carbon
    {
        return $value ? Carbon::parse($value)->utc() : null;
    }

    private function videoEntryPoint(array $event): ?string
    {
        return collect(Arr::get($event, 'conferenceData.entryPoints', []))
            ->firstWhere('entryPointType', 'video')['uri'] ?? null;
    }

    private function recordError(GoogleCalendarConnection $connection, Throwable $exception): void
    {
        $connection->update([
            'last_error' => str($exception->getMessage())->limit(2000)->toString(),
        ]);
    }
}
