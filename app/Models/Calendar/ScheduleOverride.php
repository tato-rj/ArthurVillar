<?php

namespace App\Models\Calendar;

use App\Models\BaseModel;

class ScheduleOverride extends BaseModel
{
    public function lessonPlan()
    {
        return $this->belongsTo(LessonPlan::class);
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
