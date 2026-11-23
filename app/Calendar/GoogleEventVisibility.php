<?php

namespace App\Calendar;

use App\Models\Calendar\GoogleCalendarEvent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class GoogleEventVisibility
{
    public function __construct(private GoogleCalendarEvent $event)
    {
    }

    private function occurrences(): Builder
    {
        $query = GoogleCalendarEvent::query()->where('google_calendar_events.google_calendar_connection_id', $this->event->google_calendar_connection_id);
        return $this->event->recurring_event_id
            ? $query->where('recurring_event_id', $this->event->recurring_event_id)
            : $query->whereKey($this->event->id);
    }

    private function selectableOccurrences(): Builder
    {
        return $this->occurrences()->startingOnOrAfterSyncCutoff()->withinRecurringSyncHorizon()
            ->whereIn('response_status', ['accepted', 'needsAction']);
    }

    public function availableDates(): array
    {
        return $this->selectableOccurrences()->visibleOnCalendar()->get(['all_day', 'starts_at', 'start_date'])
            ->map(fn ($event) => $event->calendarStart()->toDateString())->unique()->sort()->values()->all();
    }

    public function update(bool $hidden, ?string $scope, array $dates): array
    {
        return DB::transaction(function () use ($hidden, $scope, $dates) {
            // Serialize overlapping choices from two tabs, including the first rule in a series.
            $this->event->calendarConnection()->lockForUpdate()->firstOrFail();
            if ($hidden) {
                // A calendar tab opened before scope selection was released sends no scope.
                $scope ??= $this->event->recurring_event_id ? 'all' : 'current';
                if ($scope !== 'current' && ! $this->event->recurring_event_id) {
                    throw ValidationException::withMessages(['scope' => 'This Google event does not repeat.']);
                }
                $this->hide($scope, $dates);
            } else {
                $this->restore($scope);
            }

            $hiddenIds = $hidden ? $this->occurrences()->withHiddenPreference()
                ->where(fn ($q) => $q->whereNotNull('occurrence_hide.google_event_id')->orWhereNotNull('series_hide.google_event_id'))
                ->pluck('google_calendar_events.id')->map(fn ($id) => 'google-'.$id)->all() : [];

            return ['google_visibility_key' => $this->event->calendarVisibilityKey(), 'hidden' => $hidden, 'hidden_ids' => $hiddenIds];
        });
    }

    private function preferences()
    {
        return DB::table('hidden_google_calendar_events')->where('google_calendar_connection_id', $this->event->google_calendar_connection_id);
    }

    private function saveRules(array $rows): void
    {
        if ($rows) {
            DB::table('hidden_google_calendar_events')->upsert($rows, ['google_calendar_connection_id', 'google_event_id'], ['series_id', 'starts_at_utc', 'all_day_from']);
        }
    }

    private function hide(string $scope, array $dates): void
    {
        $event = $this->event;
        $series = $event->recurring_event_id;
        if ($scope === 'multiple' || $scope === 'current') {
            $occurrences = collect([$event]);
            if ($scope === 'multiple') {
                $byDate = $this->selectableOccurrences()->get(['google_event_id', 'all_day', 'start_date', 'starts_at'])->toBase()
                    ->groupBy(fn ($item) => $item->calendarStart()->toDateString());
                if (! $dates || array_diff($dates, $byDate->keys()->all())) {
                    throw ValidationException::withMessages(['dates' => 'Some selected dates are no longer available. Reopen the picker to update them.']);
                }
                $occurrences = $byDate->only($dates)->collapse();
            }
            $rows = $occurrences->map(fn ($item) => [
                'google_calendar_connection_id' => $event->google_calendar_connection_id,
                'google_event_id' => $item->google_event_id,
                'series_id' => $series,
                'starts_at_utc' => $series ? $item->calendarStart()->utc()->toDateTimeString() : null,
                'all_day_from' => null,
            ])->all();
            foreach (array_chunk($rows, 200) as $chunk) {
                $this->saveRules($chunk);
            }
            return;
        }

        $start = $event->calendarStart();
        $utc = $scope === 'future' ? $start->copy()->utc()->toDateTimeString() : null;
        $existing = $this->preferences()->where('google_event_id', $series)->first();
        if ($utc && $existing && ($existing->starts_at_utc === null || $existing->starts_at_utc <= $utc)) {
            return;
        }
        // All-day starts use calendar-local dates. A timed noon cutoff begins covering all-day events tomorrow.
        $allDayFrom = $start->isStartOfDay() ? $start : $start->copy()->addDay();
        $this->saveRules([[
            'google_calendar_connection_id' => $event->google_calendar_connection_id,
            'google_event_id' => $series,
            'series_id' => null,
            'starts_at_utc' => $utc,
            'all_day_from' => $utc ? $allDayFrom->toDateString() : null,
        ]]);
    }

    private function restore(?string $requestedScope): void
    {
        $scope = $this->occurrences()->whereKey($this->event->id)->withRestoreScope()->firstOrFail()->restore_scope;
        if (! $scope) {
            return;
        }
        if ($requestedScope && $requestedScope !== $scope) {
            throw ValidationException::withMessages(['scope' => 'Visibility changed. Refresh the Google Events list and try again.']);
        }
        if ($scope === 'current') {
            $this->preferences()->where('google_event_id', $this->event->google_event_id)->delete();
            return;
        }
        $series = $this->event->recurring_event_id;
        $rule = $this->preferences()->where('google_event_id', $series);
        $individual = $this->preferences()->where('series_id', $series);
        if ($scope === 'future') {
            $range = $rule->first();
            $imported = $this->occurrences()->select('google_event_id');
            $covered = (clone $imported)->where(fn ($q) => $q->where('starts_at', '>=', $range->starts_at_utc)
                ->orWhere('start_date', '>=', $range->all_day_from));
            // Use the latest dates after a reschedule and the saved start for occurrences pruned by sync.
            $individual->where(fn ($q) => $q->whereIn('google_event_id', $covered)
                ->orWhere(fn ($missing) => $missing->whereNotIn('google_event_id', $imported)
                    ->where('starts_at_utc', '>=', $range->starts_at_utc)));
        }
        $individual->delete();
        $rule->delete();
    }
}
