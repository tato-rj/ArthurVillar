<div class="d-grid gap-2 mt-3">
    @forelse($plans as $item)
        @php($plan = $item['plan'])
        <button type="button" class="calendar-student-plan {{$item['current'] ? 'is-current' : 'is-muted'}}"
            data-student-plan-edit data-url="{{route($item['single'] ? 'calendar.single-lesson-plans.edit' : 'calendar.lesson-plans.edit', $plan)}}">
            <div class="d-apart">
                <div class="small fw-bold mb-1">{{$item['current'] ? 'CURRENT LESSON PLAN' : ($plan->canceled_at ? 'INACTIVE' : ($item['date'] > today()->toDateString() ? 'UPCOMING' : 'PAST / INACTIVE'))}}</div>
                <div>{{$plan->duration_minutes}} min</div>
            </div>
            <span class="d-block fw-bold">{{$item['single'] ? 'Single lesson' : ucfirst($plan->weekday_name)}} at {{\App\Models\Calendar\LessonPlan::timeLabel($plan->start_time)}}</span>
            <span class="d-block small">
                @if($item['single'])
                    {{optional($plan->scheduled_date)->format('M j, Y')}}
                @else
                    {{$plan->recurrence}} · {{optional($plan->starts_on)->format('M j, Y') ?: 'No start date'}} – {{optional($plan->ends_on)->format('M j, Y') ?: 'No end date'}}
                @endif
            </span>
            {{-- @if($plan->location)<span class="d-block small mt-1">{{$plan->location->name}}</span>@endif --}}
        </button>
    @empty
        <p class="text-muted mb-0">No lesson plans registered.</p>
    @endforelse
</div>
