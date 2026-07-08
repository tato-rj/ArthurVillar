<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $dates = ['date_of_birth'];

    protected $casts = ['is_adult' => 'boolean'];

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
        return $this->hasMany(LessonPlan::class)->orderBy('starts_on');
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
        $today = today();

        if ($this->relationLoaded('lessonPlans')) {
            return $this->lessonPlans
                ->filter(fn (LessonPlan $lessonPlan) => $lessonPlan->isCurrent())
                ->sortByDesc('starts_on')
                ->first();
        }

        return $this->lessonPlans()
            ->where('status', 'active')
            ->whereNotNull('starts_on')
            ->whereNotNull('ends_on')
            ->whereDate('starts_on', '<', $today->toDateString())
            ->whereDate('ends_on', '>', $today->toDateString())
            ->latest('starts_on')
            ->first();
    }

    public function getAgeAttribute()
    {
        if (! $this->date_of_birth) {
            return null;
        }

        return carbon($this->date_of_birth)->age;
    }

}
