<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\LessonPlan;
use App\Models\Calendar\Location;
use App\Models\Calendar\ScheduleOverride;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class ScheduleOverridesController extends Controller
{
    public function edit(LessonPlan $lessonPlan, string $originalDate, string $originalStartTime)
    {
        $override = $this->findOccurrence($lessonPlan, $originalDate, $originalStartTime);
        $location = $override->lessonLocation();
        $locations = Location::query()->teaching()
            ->where(fn ($query) => $query->where('is_active', true)->orWhere('id', $location?->id))
            ->orderBy('name')
            ->get();

        return view('calendar.lessons.scheduleOverrides.edit', [
            'override' => $override,
            'details' => $override->lessonDetails(),
            'location' => $location,
            'locations' => $locations,
        ]);
    }

    public function update(Request $request, LessonPlan $lessonPlan, string $originalDate, string $originalStartTime)
    {
        $data = $request->validate([
            'date' => ['required', 'date_format:Y-m-d'],
            'start_time' => ['required', Rule::in(LessonPlan::timeOptions())],
            'duration_minutes' => ['required', 'integer', 'min:15', 'max:960', 'multiple_of:15'],
            'location_id' => ['sometimes', 'required', Rule::exists('locations', 'id')->where('usage', Location::USAGE_TEACHING)],
            'fee_amount' => ['sometimes', 'nullable', 'numeric', 'between:0,9999.99', 'decimal:0,2'],
            'payment_method' => ['sometimes', 'nullable', 'string', 'max:255'],
            'meeting_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
            'notes_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'travel_mode' => ['sometimes', 'required', Rule::in(['NONE', 'TRANSIT', 'WALK', 'DRIVE'])],
        ]);

        $startsAt = Carbon::createFromFormat('!Y-m-d H:i', $data['date'].' '.$data['start_time']);
        $endsAt = $startsAt->copy()->addMinutes((int) $data['duration_minutes']);

        if ($endsAt->gt($startsAt->copy()->setTime(23, 0))) {
            throw ValidationException::withMessages(['duration_minutes' => 'The lesson must end by 11:00 PM.']);
        }

        DB::transaction(function () use ($lessonPlan, $originalDate, $originalStartTime, $data, $startsAt, $endsAt) {
            $lessonPlan = LessonPlan::query()->lockForUpdate()->findOrFail($lessonPlan->id);
            $override = $this->findOccurrence($lessonPlan, $originalDate, $originalStartTime);
            $previousFee = $override->netFeeAmount();
            $previousDetails = $override->lessonDetails();

            $details = Arr::only($data, ScheduleOverride::LESSON_DETAIL_FIELDS);
            if (array_key_exists('fee_amount', $details)) {
                $details['fee_amount'] = $details['fee_amount'] === null ? null : (int) round($details['fee_amount'] * 100);
            }

            if (isset($data['location_id'])) {
                $override->location_id = (int) $data['location_id'] === (int) $lessonPlan->location_id ? null : $data['location_id'];
                $override->unsetRelation('location');
            }
            if (strtolower($override->lessonLocation()?->name ?? '') !== 'online' && isset($data['location_id'])) {
                $details['meeting_url'] = null;
                $details['notes_url'] = null;
            }

            // Store only differences so future plan edits still supply inherited values.
            $defaults = $lessonPlan->only(ScheduleOverride::LESSON_DETAIL_FIELDS);
            $defaults['fee_amount'] = $defaults['fee_amount'] === null ? null : (int) $defaults['fee_amount'];
            $defaults['travel_mode'] = $defaults['travel_mode'] ?: 'TRANSIT';
            $details = array_replace($override->lesson_details ?? [], $details);
            $details = array_filter($details, fn ($value, $key) => $value !== $defaults[$key], ARRAY_FILTER_USE_BOTH);

            $override->fill([
                'new_date' => $data['date'],
                'new_start_time' => $data['start_time'],
                'duration_minutes' => $data['duration_minutes'],
                'lesson_details' => $details ?: null,
            ])->save();
            $currentDetails = $override->lessonDetails();
            $recordChanges = ['starts_at' => $startsAt, 'ends_at' => $endsAt];
            $netFee = $override->netFeeAmount();
            if ($previousFee !== $netFee) {
                $recordChanges['fee_amount'] = $lessonPlan->student?->payment_exempt ? null : $netFee;
            }
            foreach (['payment_method', 'notes'] as $field) {
                if ($previousDetails[$field] !== $currentDetails[$field]) {
                    $recordChanges[$field] = $currentDetails[$field];
                }
            }
            if (array_key_exists('payment_method', $recordChanges) && $lessonPlan->student?->payment_exempt) {
                $recordChanges['payment_method'] = null;
            }

            $lessonPlan->lessonsForScheduledOccurrence($originalDate, $originalStartTime)->update($recordChanges);
        });

        return $request->wantsJson()
            ? response()->json(['date' => $data['date'], 'start_time' => $data['start_time'], 'end_time' => $endsAt->format('H:i')])
            : back()->with('success', 'The rescheduled lesson was successfully updated');
    }

    private function findOccurrence(LessonPlan $lessonPlan, string $originalDate, string $originalStartTime): ScheduleOverride
    {
        abort_unless(in_array($originalStartTime, LessonPlan::timeOptions(), true), 404);
        $override = $lessonPlan->scheduleOverrides()->firstOrNew([
            'original_date' => $originalDate,
            'original_start_time' => $originalStartTime,
        ]);

        if (! $override->exists) {
            // Older attendance confirmations removed the override once the moved lesson was recorded.
            $lesson = $lessonPlan->lessonsForScheduledOccurrence($originalDate, $originalStartTime)->first();
            abort_unless($lesson && ($lesson->starts_at->toDateString() !== $originalDate
                || $lesson->starts_at->format('H:i') !== $originalStartTime), 404);

            $override->fill([
                'new_date' => $lesson->starts_at->toDateString(),
                'new_start_time' => $lesson->starts_at->format('H:i'),
                'duration_minutes' => (int) $lesson->starts_at->diffInMinutes($lesson->ends_at),
            ]);
        }

        return $override->setRelation('lessonPlan', $lessonPlan);
    }
}
