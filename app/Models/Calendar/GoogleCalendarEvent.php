<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GoogleCalendarEvent extends BaseModel
{
    protected $casts = [
        'all_day' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'start_date' => 'date',
        'end_date' => 'date',
        'attendees' => 'array',
        'google_updated_at' => 'datetime',
    ];

    public function connection(): BelongsTo
    {
        return $this->belongsTo(GoogleCalendarConnection::class, 'google_calendar_connection_id');
    }

    public static function syncCutoff(): Carbon
    {
        return Carbon::parse(
            config('calendar.google_calendar_start_date'),
            config('calendar.timezone')
        )->startOfDay();
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

    public function calendarPayload(): array
    {
        $timezone = config('calendar.timezone');
        $start = $this->all_day
            ? Carbon::parse($this->start_date, $timezone)->startOfDay()
            : $this->starts_at->copy()->setTimezone($timezone);
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
            'ends_at' => $this->all_day ? '23:59' : $end->format('H:i'),
            'notes' => $this->description,
            'notification_minutes_before' => null,
            'canceled_at' => null,
            'type' => 'general-event',
            'event_type' => 'Google Calendar',
            'event_type_icon' => 'calendar-days',
            'edit_url' => '',
            'reschedule_url' => '',
            'revert_url' => '',
            'destroy_url' => '',
            'external_provider' => 'google',
            'external_url' => $this->safeUrl($this->html_link),
            'meeting_url' => $this->safeUrl($this->meeting_url),
            'response_status' => $this->response_status,
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
