<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'scheduled_date' => 'date',
    ];

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
            'type' => 'general-event',
            'edit_url' => route('studio.events.edit', $this),
            'reschedule_url' => route('studio.events.reschedule', $this),
            'destroy_url' => route('studio.events.destroy', $this),
        ];
    }
}
