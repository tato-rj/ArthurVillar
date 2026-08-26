<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends BaseModel
{
    protected $casts = [
        'scheduled_date' => 'date',
        'canceled_at' => 'datetime',
        'notification_sent_at' => 'datetime',
    ];

    public function notificationUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'notification_user_id');
    }

    public static function notificationOptions(): array
    {
        return [
            0 => 'At the event time',
            // 5 => '5 minutes before',
            // 10 => '10 minutes before',
            15 => '15 minutes before',
            30 => '30 minutes before',
            60 => '1 hour before',
            120 => '2 hours before',
            1440 => '1 day before',
        ];
    }

    public static function defaultNotificationMinutesBefore(): ?int
    {
        $minutes = (int) Settings::getValue('notifications.default_event_minutes_before', -1);

        return array_key_exists($minutes, static::notificationOptions()) ? $minutes : null;
    }

    public static function typeOptions(): array
    {
        return [
            'users' => 'Meeting',
            'school' => 'Work',
            'handshake' => 'Trial lesson',
            'masks-theater' => 'Theater',
            'ticket' => 'Concert',
            'film' => 'Cinema',
            'dumbbell' => 'Gymn',
            'scissors' => 'Haircut',
            'calendar-day' => 'Appointment',
        ];
    }

    public static function travelModeOptions(): array
    {
        return [
            'NONE' => 'No directions',
            'TRANSIT' => 'Public transit',
            'WALK' => 'Walking',
            'DRIVE' => 'Driving',
        ];
    }

    public function typeIcon(): ?string
    {
        return array_search($this->type, static::typeOptions(), true) ?: null;
    }

    public static function timeOptions(): array
    {
        $times = [];

        for ($minutes = 7 * 60; $minutes <= 23 * 60; $minutes += 15) {
            $times[] = sprintf('%02d:%02d', intdiv($minutes, 60), $minutes % 60);
        }

        return $times;
    }

    public static function timeLabel(string $value): string
    {
        return Carbon::createFromFormat('H:i', $value)->format('g:i A');
    }

    public function getFullAddressAttribute(): string
    {
        return collect([
            $this->address,
            collect([$this->city, $this->state])->filter()->implode(', '),
            $this->postal_code,
        ])->filter()->implode(', ');
    }

    public function getMapUrlAttribute(): ?string
    {
        return $this->full_address
            ? 'https://www.google.com/maps/search/?api=1&query='.urlencode($this->full_address)
            : null;
    }

    public function calendarPayload(): array
    {
        $location = $this->full_address ? [
            'name' => $this->full_address,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'postal_code' => $this->postal_code,
            'map_url' => $this->map_url,
        ] : null;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'scheduled_date' => $this->scheduled_date->toDateString(),
            'starts_at' => $this->starts_at,
            'ends_at' => $this->ends_at,
            'notes' => $this->notes,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'postal_code' => $this->postal_code,
            'travel_mode' => $this->travel_mode,
            'location' => $location,
            'notification_enabled' => $this->notification_user_id !== null,
            'notification_minutes_before' => $this->notification_minutes_before,
            'canceled_at' => $this->canceled_at?->toIso8601String(),
            'type' => 'general-event',
            'event_type' => $this->type,
            'event_type_icon' => $this->typeIcon(),
            'edit_url' => route('calendar.events.edit', $this),
            'notes_update_url' => route('calendar.events.notes.update', $this),
            'reschedule_url' => route('calendar.events.reschedule', $this),
            'revert_url' => route('calendar.events.revert', $this),
            'destroy_url' => route('calendar.events.destroy', $this),
        ];
    }
}
