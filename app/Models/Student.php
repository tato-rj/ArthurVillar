<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $birthdayWindow = 5; //in before and after days

    protected $dates = ['date_of_birth'];

    protected $casts = ['is_adult' => 'boolean'];

    protected $guarded = [];

    protected static function booted()
    {
        static::deleting(function (Student $student) {
            $student->scheduleOverrides()->delete();
            $student->lessons()->delete();
            $student->singleLessonPlans()->delete();
            $student->lessonPlans()->delete();
        });
    }

    public static function birthdayWindow()
    {
        return (new static)->birthdayWindow;
    }

    public function lessonPlans()
    {
        return $this->hasMany(LessonPlan::class)->orderBy('starts_on');
    }

    public function singleLessonPlans()
    {
        return $this->hasMany(SingleLessonPlan::class)->orderBy('scheduled_date');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class);   
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function recitals()
    {
        return $this->belongsToMany(Recital::class)->withTimestamps();
    }

    public function scheduleOverrides()
    {
        return $this->hasManyThrough(ScheduleOverride::class, LessonPlan::class);
    }
    
    public function currentLessonPlan()
    {
        $today = today()->startOfDay();

        if ($this->relationLoaded('lessonPlans')) {
            $currentLessonPlan = $this->lessonPlans
                ->filter(fn (LessonPlan $lessonPlan) => $this->lessonPlanIsCurrentToday($lessonPlan, $today))
                ->sortByDesc(fn (LessonPlan $lessonPlan) => $lessonPlan->starts_on->toDateString())
                ->first();

            return $currentLessonPlan ?: $this->lessonPlans
                ->filter(fn (LessonPlan $lessonPlan) => $this->lessonPlanIsUpcoming($lessonPlan, $today))
                ->sortBy(fn (LessonPlan $lessonPlan) => implode(' ', [
                    $lessonPlan->starts_on->toDateString(),
                    $lessonPlan->start_time,
                    str_pad($lessonPlan->id, 10, '0', STR_PAD_LEFT),
                ]))
                ->first();
        }

        $currentLessonPlan = $this->lessonPlans()
            ->whereNotNull('starts_on')
            ->whereNotNull('ends_on')
            ->whereDate('starts_on', '<=', $today->toDateString())
            ->whereDate('ends_on', '>=', $today->toDateString())
            ->latest('starts_on')
            ->first();

        return $currentLessonPlan ?: $this->lessonPlans()
            ->whereNotNull('starts_on')
            ->whereNotNull('ends_on')
            ->whereDate('starts_on', '>', $today->toDateString())
            ->orderBy('starts_on')
            ->orderBy('start_time')
            ->first();
    }

    private function lessonPlanIsCurrentToday(LessonPlan $lessonPlan, $today)
    {
        return $lessonPlan->starts_on
            && $lessonPlan->ends_on
            && $lessonPlan->starts_on->copy()->startOfDay()->lte($today)
            && $lessonPlan->ends_on->copy()->startOfDay()->gte($today);
    }

    private function lessonPlanIsUpcoming(LessonPlan $lessonPlan, $today)
    {
        return $lessonPlan->starts_on
            && $lessonPlan->ends_on
            && $lessonPlan->starts_on->copy()->startOfDay()->gt($today);
    }

    public function getAgeAttribute()
    {
        if (! $this->date_of_birth) {
            return null;
        }

        return carbon($this->date_of_birth)->age;
    }

    public function getFullNameAttribute()
    {
        return trim(collect([$this->first_name, $this->last_name])
            ->filter()
            ->implode(' '));
    }

}
