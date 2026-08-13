<div class="border rounded p-4 mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h5 mb-0">Confirmed lessons</h3>
        <div class="d-flex align-items-center">
            <span class="badge bg-green text-white" title="Confirmed lessons">{{$confirmedLessons->count()}}</span>
            <span class="badge bg-red text-white ml-2" title="Unpaid lessons">{{$unpaidLessons->count()}}</span>
        </div>
    </div>

    @php
        $lessons = $confirmedLessons
            ->concat($unpaidLessons)
            ->sortByDesc(fn ($lesson) => ($lesson->scheduled_date ?: $lesson->starts_at)->timestamp);
    @endphp

    <div class="table-responsive">
        <table class="table mb-0">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Payment</th>
                </tr>
            </thead>
            <tbody>
                @forelse($lessons as $lesson)
                    @php($lessonDate = $lesson->scheduled_date ?: $lesson->starts_at)
                    @php($lessonTime = $lesson->scheduled_start_time
                        ? \App\Models\Calendar\LessonPlan::timeLabel($lesson->scheduled_start_time)
                        : $lesson->starts_at->format('g:i A'))
                    <tr>
                        <td>
                            <div class="font-weight-bold">{{$lessonDate->format('M j, Y')}}</div>
                            <div class="small opacity-6">{{$lessonTime}}</div>
                        </td>
                        <td>{{$lesson->lesson_plan_id ? 'Recurring' : 'Single'}}</td>
                        <td>
                            @if($lesson->paid_at)
                                <div class="text-green font-weight-bold">
                                    {{$lesson->fee_amount !== null ? payment()->usd($lesson->fee_amount) : '—'}}
                                </div>
                                <div class="small opacity-6">{{$lesson->paid_at->format('M j, Y')}}</div>
                            @else
                                <div class="text-red font-weight-bold">Unpaid</div>
                            @endif
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" class="opacity-4">No confirmed or unpaid lessons.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
