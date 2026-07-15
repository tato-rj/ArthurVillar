<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'scheduled_date' => 'date',
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

    public static function timeOptions(): array
    {
        $times = [];

        for ($minutes = 0; $minutes < 24 * 60; $minutes += 15) {
            $times[] = sprintf('%02d:%02d', intdiv($minutes, 60), $minutes % 60);
        }

        return $times;
    }

    public static function timeLabel(string $value): string
    {
        return Carbon::createFromFormat('H:i', $value)->format('g:i A');
    }

    public function calendarPayload(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'scheduled_date' => $this->scheduled_date->toDateString(),
            'starts_at' => $this->starts_at,
            'ends_at' => $this->ends_at,
            'notes' => $this->notes,
            'notification_minutes_before' => $this->notification_minutes_before,
            'type' => 'general-event',
            'edit_url' => route('studio.events.edit', $this),
            'reschedule_url' => route('studio.events.reschedule', $this),
            'destroy_url' => route('studio.events.destroy', $this),
        ];
    }
}
