<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class EarlyPayment extends BaseModel
{
    protected $dates = [
        'scheduled_date',
    ];

    public function lessonPlan()
    {
        return $this->belongsTo(LessonPlan::class);
    }

    public function singleLessonPlan()
    {
        return $this->belongsTo(SingleLessonPlan::class);
    }

    public function scopeForOccurrence($query, $lessonPlanId, $singleLessonPlanId, $scheduledDate, $scheduledStartTime)
    {
        if ($singleLessonPlanId) {
            return $query->where('single_lesson_plan_id', $singleLessonPlanId);
        }

        return $query
            ->where('lesson_plan_id', $lessonPlanId)
            ->whereDate('scheduled_date', $scheduledDate)
            ->where('scheduled_start_time', LessonPlan::normalizeTime($scheduledStartTime));
    }

    public function setScheduledStartTimeAttribute($value)
    {
        $this->attributes['scheduled_start_time'] = LessonPlan::normalizeTime($value);
    }
}
