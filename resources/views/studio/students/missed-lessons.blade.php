@modal(['title' => $student->full_name.' missed lessons', 'id' => 'student-'.$student->id.'-missed-lessons-modal'])
<div class="mb-3">
    <div class="mb-1">
        @fa(['icon' => 'calendar-day', 'classes' => 'opacity-4'])
        <span>{{ucfirst($lessonPlan->weekday_name)}} at {{\App\Models\LessonPlan::timeLabel($lessonPlan->start_time)}}</span>
    </div>
    <div class="small opacity-6">
        {{$lessonPlan->recurrence}} · {{$lessonPlan->starts_on->format('M j, Y')}}–{{$lessonPlan->ends_on->format('M j, Y')}}
    </div>
</div>

<div class="small font-weight-bold opacity-6 mb-2">MISSED LESSONS</div>
<div class="studio-break-lessons">
    @forelse($missedDates as $missedDate)
        <div class="studio-break-lesson d-flex justify-content-between align-items-start">
            <div>
                <div class="font-weight-bold">{{carbon($missedDate['date'])->format('l, F j, Y')}}</div>
                <div class="small opacity-6">
                    {{collect($missedDate['reasons'])->map(function ($reason) {
                        return ucfirst($reason['type']).': '.$reason['title'];
                    })->implode(' · ')}}
                </div>
            </div>
        </div>
    @empty
        <div class="opacity-4">No lessons are missed because of holidays or breaks.</div>
    @endforelse
</div>
@endmodal
