<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class FootballEvent extends BaseModel
{
    protected $casts = [
        'starts_at' => 'datetime',
        'synced_at' => 'datetime',
    ];

    public function calendarPayload(): array
    {
        $start = $this->starts_at->copy()->setTimezone(config('calendar.timezone'));
        $end = $start->copy()->addMinutes(config('calendar.football.duration_minutes', 120));

        if (! $end->isSameDay($start)) {
            $end = $start->copy()->setTime(23, 45);
        }

        $details = collect([$this->league_name, $this->league_round])->filter()->implode(' · ');
        $location = collect([$this->venue_name, $this->venue_city])->filter()->implode(', ');

        return [
            'id' => 'football-'.$this->id,
            'name' => $this->home_team_name.' vs '.$this->away_team_name,
            'scheduled_date' => $start->toDateString(),
            'starts_at' => $start->format('H:i'),
            'ends_at' => $end->format('H:i'),
            'notes' => $details ?: null,
            'notification_minutes_before' => null,
            'canceled_at' => null,
            'type' => 'general-event',
            'event_type' => $this->league_name ?: 'Football',
            'event_type_icon' => 'futbol',
            'edit_url' => '',
            'reschedule_url' => '',
            'revert_url' => '',
            'destroy_url' => '',
            'external_provider' => 'football',
            'external_url' => null,
            'meeting_url' => null,
            'response_status' => null,
            'response_url' => null,
            'organizer_name' => null,
            'organizer_email' => null,
            'location' => $location ?: null,
            'travel_mode' => 'NONE',
            'all_day' => false,
            'read_only' => true,
            'ignore_conflicts' => true,
        ];
    }
}
