<div class="border rounded p-4 mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h5 mb-0">Currently registered lessons</h3>
        <span class="badge bg-light text-dark">
            {{$registeredLessonPlans->count() + $registeredSingleLessons->count()}}
        </span>
    </div>

    @forelse($registeredLessonPlans as $lessonPlan)
        <div class="{{$loop->last ? null: 'border-bottom pb-3 mb-3'}}">
            <div class="small font-weight-bold text-green mb-1">RECURRING LESSON</div>
            <div class="font-weight-bold">
                {{ucfirst($lessonPlan->weekday_name)}} at {{\App\Models\Calendar\LessonPlan::timeLabel($lessonPlan->start_time)}}
            </div>
            <div class="small opacity-6">
                {{$lessonPlan->recurrence}}
                @if($lessonPlan->starts_on && $lessonPlan->ends_on)
                    · {{$lessonPlan->starts_on->format('M j, Y')}}–{{$lessonPlan->ends_on->format('M j, Y')}}
                @endif
            </div>
            @if($lessonPlan->location)
                <div class="small mt-1">@fa(['icon' => 'location-dot', 'classes' => 'opacity-4']){{$lessonPlan->location->name}}</div>
            @endif
        </div>
    @empty
    @endforelse

    @foreach($registeredSingleLessons as $singleLesson)
        <div class="{{$loop->last ? null: 'border-bottom pb-3 mb-3'}}">
            <div class="small font-weight-bold text-green mb-1">SINGLE LESSON</div>
            <div class="font-weight-bold">
                {{$singleLesson->scheduled_date->format('l, F j, Y')}}
            </div>
            <div class="small opacity-6">
                {{\App\Models\Calendar\LessonPlan::timeLabel($singleLesson->start_time)}}
                · {{$singleLesson->duration_minutes}} minutes
            </div>
            @if($singleLesson->location)
                <div class="small mt-1">@fa(['icon' => 'location-dot', 'classes' => 'opacity-4']){{$singleLesson->location->name}}</div>
            @endif
        </div>
    @endforeach

    @if($registeredLessonPlans->isEmpty() && $registeredSingleLessons->isEmpty())
        <div class="opacity-4">No current or upcoming lesson registrations.</div>
    @endif
</div>
