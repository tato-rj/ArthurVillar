@extends('layouts.app', ['title' => $student->full_name])

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.students.show', $student) }}

    <div class="row mb-4">
        @pagetitle([
            'label' => $student->full_name
        ])
    </div>

    <div class="row mb-4">
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'envelope', 'fa_color' => 'grey'])Email</div>
            <div class="font-weight-bold text-break">{{$student->email}}</div>
        </div>
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'phone', 'fa_color' => 'grey'])Phone</div>
            <div class="font-weight-bold">{{$student->phone ?: '—'}}</div>
        </div>
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'location-dot', 'fa_color' => 'grey'])Default location</div>
            <div class="font-weight-bold">{{$student->location?->name ?: '—'}}</div>
        </div>
        <div class="col-md-6 col-lg-3 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'money-bill-wave', 'fa_color' => 'grey'])Payment method</div>
            <div class="font-weight-bold">{{$student->payment_method ?: '—'}}</div>
        </div>
    </div>

    @if($student->parent_name || $student->notes)
        <div class="row mb-4">
            @if($student->parent_name)
                <div class="col-md-4 mb-3">
                    <div class="small opacity-4">@fa(['icon' => 'user-group', 'fa_color' => 'grey'])Parent</div>
                    <div class="font-weight-bold">{{$student->parent_name}}</div>
                </div>
            @endif
            @if($student->notes)
                <div class="col mb-3">
                    <div class="small opacity-4">@fa(['icon' => 'note-sticky', 'fa_color' => 'grey'])Notes</div>
                    <div style="white-space: pre-line">{{$student->notes}}</div>
                </div>
            @endif
        </div>
    @endif

    <div class="row">
        <div class="col-lg-6 mb-4">
            <div class="border rounded h-100 p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="h5 mb-0">Currently registered lessons</h3>
                    <span class="badge bg-light text-dark">
                        {{$registeredLessonPlans->count() + $registeredSingleLessons->count()}}
                    </span>
                </div>

                @forelse($registeredLessonPlans as $lessonPlan)
                    <div class="border-bottom pb-3 mb-3">
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
                    <div class="border-bottom pb-3 mb-3">
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
        </div>

        <div class="col-lg-6 mb-4">
            <div class="border rounded h-100 p-4">
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
        </div>
    </div>

    <div class="row">
        <div class="col-lg-6 mb-4">
            <div class="border rounded h-100 p-4">
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
        </div>

        <div class="col-lg-6 mb-4">
            <div class="border rounded h-100 p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3 class="h5 mb-0">Unpaid lessons</h3>
                    <span class="badge bg-red text-white">{{$unpaidLessons->count()}}</span>
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
                            @forelse($unpaidLessons as $lesson)
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
                                    <td class="text-red font-weight-bold">
                                        {{$lesson->fee_amount !== null ? payment()->usd($lesson->fee_amount) : '—'}}
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="3" class="opacity-4">No unpaid lessons.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection
