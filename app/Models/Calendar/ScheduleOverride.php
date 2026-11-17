<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class ScheduleOverride extends BaseModel
{
    public const LESSON_DETAIL_FIELDS = ['fee_amount', 'payment_method', 'meeting_url', 'notes_url', 'notes', 'travel_mode'];

    protected $casts = [
        'lesson_details' => 'array',
    ];

    public function lessonPlan()
    {
        return $this->belongsTo(LessonPlan::class);
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function lessonLocation()
    {
        return $this->location ?? $this->lessonPlan->location;
    }

    public function lessonDetails(): array
    {
        return array_replace($this->lessonPlan->only(self::LESSON_DETAIL_FIELDS), $this->lesson_details ?? []);
    }

    public function netFeeAmount()
    {
        $fee = $this->lessonDetails()['fee_amount'];
        $location = $this->lessonLocation();

        return $location ? $location->netAmount($fee) : $fee;
    }

    public function getOriginalStartTimeAttribute($value)
    {
        return $value ? LessonPlan::normalizeTime($value) : null;
    }

    public function setOriginalStartTimeAttribute($value)
    {
        $this->attributes['original_start_time'] = LessonPlan::normalizeTime($value);
    }

    public function getNewStartTimeAttribute($value)
    {
        return $value ? LessonPlan::normalizeTime($value) : null;
    }

    public function setNewStartTimeAttribute($value)
    {
        $this->attributes['new_start_time'] = LessonPlan::normalizeTime($value);
    }
}
