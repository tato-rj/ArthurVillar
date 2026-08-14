
@unless($recurringLessonPlans->isEmpty())
    <h5 class="mb-3">Recurring Lesson Plans</h5>

    @foreach($recurringLessonPlans as $lessonPlan)
    {{$lessonPlan->id}}
{{--         <div class="border rounded p-4 mb-3">
            <div class="{{$loop->last ? null : 'border-bottom pb-3 mb-3'}}">
                <div class="small font-weight-bold text-{{$lessonPlan->isCurrent() ? 'green' : 'light'}} mb-1">{{$lessonPlan->isCurrent() ? 'CURRENT' : 'PAST'}}</div>
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
        </div> --}}
    @endforeach
@endunless

@unless($singleLessonsPlans->isEmpty())

    <h5 class="mb-3">Single  Lesson Plans</h5>
    @foreach($singleLessonsPlans as $lessonPlan)
    <div class="border rounded p-4 mb-3">
        <div class="{{$loop->last ? null: 'border-bottom pb-3 mb-3'}}">
            <div class="small font-weight-bold text-{{$lessonPlan->isUpcoming() ? 'green' : 'light'}} mb-1">{{$lessonPlan->isUpcoming() ? 'UPCOMING' : 'PAST'}}</div>
            <div class="font-weight-bold">
                {{$lessonPlan->scheduled_date->format('l, F j, Y')}}
            </div>
            <div class="small opacity-6">
                {{\App\Models\Calendar\LessonPlan::timeLabel($lessonPlan->start_time)}}
                · {{$lessonPlan->duration_minutes}} minutes
            </div>
            @if($lessonPlan->location)
            <div class="small mt-1">@fa(['icon' => 'location-dot', 'classes' => 'opacity-4']){{$lessonPlan->location->name}}</div>
            @endif
        </div>
    </div>
    @endforeach
@endunless

@if($recurringLessonPlans->isEmpty() && $singleLessonsPlans->isEmpty())
<div class="opacity-4">No single or recurring lesson plans registered.</div>
@endif

