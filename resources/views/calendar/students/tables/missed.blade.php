<div class="border rounded p-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h5 mb-0">Future lessons missed</h3>
        <span class="badge bg-light text-dark">{{$missedDates->count()}}</span>
    </div>

    @if($missedLessonPlan)
        <div class="mb-3">
            <div>
                @fa(['icon' => 'calendar-day', 'classes' => 'opacity-4'])
                <span>
                    {{ucfirst($missedLessonPlan->weekday_name)}}
                    at {{\App\Models\Calendar\LessonPlan::timeLabel($missedLessonPlan->start_time)}}
                </span>
            </div>
            <div class="small opacity-6">
                {{$missedLessonPlan->recurrence}}
                · {{$missedLessonPlan->starts_on->format('M j, Y')}}–{{$missedLessonPlan->ends_on->format('M j, Y')}}
            </div>
        </div>
    @endif

    <div class="calendar-break-lessons">
        @forelse($missedDates as $missedDate)
            <div class="calendar-break-lesson d-flex justify-content-between align-items-start">
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
            <div class="opacity-4">No future lessons are missed because of holidays or breaks.</div>
        @endforelse
    </div>
</div>