<div class="border rounded p-4 mb-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="h5 mb-0">Confirmed lessons</h3>
        <span class="badge bg-green text-white">{{$confirmedLessons->count()}}</span>
    </div>

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
                @forelse($confirmedLessons as $lesson)
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
                            <div class="text-green font-weight-bold">
                                {{$lesson->fee_amount !== null ? payment()->usd($lesson->fee_amount) : '—'}}
                            </div>
                            <div class="small opacity-6">{{$lesson->paid_at->format('M j, Y')}}</div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3" class="opacity-4">No confirmed lessons.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>