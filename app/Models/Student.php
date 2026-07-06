<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $dates = ['date_of_birth'];

    protected $guarded = [];

    protected static function booted()
    {
        static::deleting(function (Student $student) {
            $student->scheduleOverrides()->delete();
            $student->lessons()->delete();
            $student->lessonPlans()->delete();
        });
    }

    public function lessonPlans()
    {
        return $this->hasMany(LessonPlan::class)->latest();
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);   
    }

    public function scheduleOverrides()
    {
        return $this->hasManyThrough(ScheduleOverride::class, LessonPlan::class);
    }
    
    public function currentLessonPlan()
    {
        if ($this->relationLoaded('lessonPlans')) {
            return $this->lessonPlans->sortByDesc('created_at')->first();
        }

        return $this->lessonPlans()->latest()->first();
    }

    public function getAgeAttribute()
    {
        if (! $this->date_of_birth) {
            return null;
        }

        return carbon($this->date_of_birth)->age;
    }

}
