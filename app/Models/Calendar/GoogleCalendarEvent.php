<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Query\JoinClause;

class GoogleCalendarEvent extends BaseModel
{
    public const DEFAULT_RECURRING_SYNC_MONTHS = 2;

    public const RECURRING_SYNC_MONTH_OPTIONS = [2, 4, 6, 12];

    protected $casts = [
        'organizer_is_self' => 'boolean',
        'all_day' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'start_date' => 'date',
        'end_date' => 'date',
        'attendees' => 'array',
        'google_updated_at' => 'datetime',
    ];

    public function calendarConnection(): BelongsTo
    {
        return $this->belongsTo(GoogleCalendarConnection::class, 'google_calendar_connection_id');
    }

    public function setResponseStatusAttribute(?string $value): void
    {
        $this->attributes['response_status'] = $value === 'tentative' ? 'needsAction' : $value;
    }

    private function visibilityId(): string
    {
        return $this->recurring_event_id ?? $this->google_event_id;
    }

    public function calendarVisibilityKey(): string
    {
        return $this->google_calendar_connection_id.':'.$this->visibilityId();
    }

    public function calendarStart(): Carbon
    {
        $timezone = config('calendar.timezone');
        return $this->all_day
            ? Carbon::parse($this->start_date->toDateString(), $timezone)->startOfDay()
            : $this->starts_at->copy()->setTimezone($timezone);
    }

    public function scopeWithHiddenPreference(Builder $query): Builder
    {
        return $query
            ->leftJoin('hidden_google_calendar_events as occurrence_hide', function (JoinClause $join) {
                $join->on('occurrence_hide.google_calendar_connection_id', '=', 'google_calendar_events.google_calendar_connection_id')
                    ->on('occurrence_hide.google_event_id', '=', 'google_calendar_events.google_event_id');
            })
            ->leftJoin('hidden_google_calendar_events as series_hide', function (JoinClause $join) {
                $join->on('series_hide.google_calendar_connection_id', '=', 'google_calendar_events.google_calendar_connection_id')
                    ->on('series_hide.google_event_id', '=', 'google_calendar_events.recurring_event_id')
                    ->where(function ($range) {
                        $range->whereNull('series_hide.starts_at_utc')
                            ->orWhereColumn('google_calendar_events.starts_at', '>=', 'series_hide.starts_at_utc')
                            ->orWhereColumn('google_calendar_events.start_date', '>=', 'series_hide.all_day_from');
                    });
            });
    }

    public function scopeVisibleOnCalendar(Builder $query): Builder
    {
        return $query->withHiddenPreference()->whereNull('occurrence_hide.google_event_id')->whereNull('series_hide.google_event_id');
    }

    public function scopeWithRestoreScope(Builder $query): Builder
    {
        return $query->withHiddenPreference()->selectRaw("CASE
            WHEN series_hide.starts_at_utc IS NOT NULL THEN 'future'
            WHEN series_hide.google_event_id IS NOT NULL THEN 'all'
            WHEN occurrence_hide.google_event_id IS NOT NULL THEN 'current'
            END AS restore_scope");
    }

    public static function syncCutoff(): Carbon
    {
        return Carbon::parse(
            config('calendar.google_calendar_start_date'),
            config('calendar.timezone')
        )->startOfDay();
    }

    public static function recurringSyncMonths(): int
    {
        $months = (int) Settings::getValue(
            'google_calendar.recurring_sync_months',
            self::DEFAULT_RECURRING_SYNC_MONTHS
        );

        return in_array($months, self::RECURRING_SYNC_MONTH_OPTIONS, true)
            ? $months
            : self::DEFAULT_RECURRING_SYNC_MONTHS;
    }

    public static function recurringSyncThrough(): Carbon
    {
        return now(config('calendar.timezone'))
            ->addMonthsNoOverflow(self::recurringSyncMonths())
            ->endOfDay();
    }

    public function scopeStartingOnOrAfterSyncCutoff(Builder $query): Builder
    {
        $cutoff = self::syncCutoff();

        return $query->where(function ($events) use ($cutoff) {
            $events->where(function ($allDay) use ($cutoff) {
                $allDay->where('google_calendar_events.all_day', true)
                    ->whereDate('google_calendar_events.start_date', '>=', $cutoff->toDateString());
            })->orWhere(function ($timed) use ($cutoff) {
                $timed->where('google_calendar_events.all_day', false)
                    ->where('google_calendar_events.starts_at', '>=', $cutoff->copy()->utc());
            });
        });
    }

    public function scopeWithinRecurringSyncHorizon(Builder $query): Builder
    {
        $through = self::recurringSyncThrough();

        return $query->where(function ($events) use ($through) {
            $events->whereNull('google_calendar_events.recurring_event_id')
                ->orWhere(function ($recurring) use ($through) {
                    $recurring->whereNotNull('google_calendar_events.recurring_event_id')
                        ->where(function ($occurrence) use ($through) {
                            $occurrence->where(function ($allDay) use ($through) {
                                $allDay->where('google_calendar_events.all_day', true)
                                    ->whereDate('google_calendar_events.start_date', '<=', $through->toDateString());
                            })->orWhere(function ($timed) use ($through) {
                                $timed->where('google_calendar_events.all_day', false)
                                    ->where('google_calendar_events.starts_at', '<=', $through->copy()->utc());
                            });
                        });
                });
        });
    }

    public function scopeBeyondRecurringSyncHorizon(Builder $query, ?Carbon $through = null): Builder
    {
        $through = $through ?: self::recurringSyncThrough();

        return $query->whereNotNull('google_calendar_events.recurring_event_id')
            ->where(function ($events) use ($through) {
                $events->where(function ($allDay) use ($through) {
                    $allDay->where('google_calendar_events.all_day', true)
                        ->whereDate('google_calendar_events.start_date', '>', $through->toDateString());
                })->orWhere(function ($timed) use ($through) {
                    $timed->where('google_calendar_events.all_day', false)
                        ->where('google_calendar_events.starts_at', '>', $through->copy()->utc());
                });
            });
    }

    public function calendarPayload(): array
    {
        $timezone = config('calendar.timezone');
        $connection = $this->relationLoaded('calendarConnection')
            ? $this->getRelation('calendarConnection')
            : null;
        $accountEmail = $this->getAttribute('calendar_id') ?: $connection?->calendar_id;
        $calendarName = $this->getAttribute('calendar_name') ?: $connection?->calendar_name;
        $start = $this->calendarStart();
        $allDayEndDate = $this->end_date
            ?: Carbon::parse($this->start_date, $timezone)->addDay();
        $end = $this->all_day
            ? Carbon::parse($allDayEndDate, $timezone)->subSecond()
            : $this->ends_at->copy()->setTimezone($timezone);

        if (! $this->all_day && ! $end->isSameDay($start)) {
            $end = $start->copy()->endOfDay();
        }

        return [
            'id' => 'google-'.$this->id,
            'name' => $this->title,
            'scheduled_date' => $start->toDateString(),
            'starts_at' => $this->all_day ? '00:00' : $start->format('H:i'),
            'ends_at' => $this->all_day ? '23:45' : $end->format('H:i'),
            'notes' => $this->description,
            'notification_minutes_before' => null,
            'canceled_at' => null,
            'type' => 'general-event',
            'event_type' => filter_var($accountEmail, FILTER_VALIDATE_EMAIL)
                ? $accountEmail
                : ($calendarName ?: 'Google Calendar'),
            'event_type_icon' => 'google',
            'edit_url' => '',
            'reschedule_url' => '',
            'revert_url' => '',
            'destroy_url' => '',
            'external_provider' => 'google',
            'visibility_url' => route('calendar.google-calendar.events.visibility', $this),
            'occurrences_url' => $this->recurring_event_id ? route('calendar.google-calendar.events.occurrences', $this) : null,
            'google_visibility_key' => $this->calendarVisibilityKey(),
            'is_recurring' => $this->recurring_event_id !== null,
            'external_url' => $this->safeUrl($this->html_link),
            'meeting_url' => $this->safeUrl($this->meeting_url),
            'response_status' => $this->response_status,
            'response_url' => $this->organizer_is_self ? null : route('calendar.google-calendar.events.respond', $this),
            'organizer_name' => $this->organizer_name,
            'organizer_email' => $this->organizer_email,
            'location' => $this->location,
            'all_day' => $this->all_day,
            'read_only' => true,
        ];
    }

    private function safeUrl(?string $url): ?string
    {
        if (! $url || ! filter_var($url, FILTER_VALIDATE_URL)) {
            return null;
        }

        return in_array(parse_url($url, PHP_URL_SCHEME), ['http', 'https'], true) ? $url : null;
    }
}
