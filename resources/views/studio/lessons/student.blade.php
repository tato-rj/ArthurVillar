@extends('layouts.app', ['title' => 'Lessons'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
<link href="{{ mix('css/studio.css') }}" rel="stylesheet">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => str_possessive($student->first_name).' lessons',
            'modal' => [
                'target' => '#create-calendar-lesson-plan-modal',
                'icon' => 'plus',
                'label' => 'New lesson plan'
            ]
        ])
    </div>

    @php($currentPlan = $student->currentLessonPlan())
    @if($currentPlan)
    <div class="row mb-3">
        <div class="col-lg-8 col-md-10 col-12 mx-auto row">
        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'piggy-bank', 'fa_color' => 'grey'])Payment method</div>
            <div class="h4 mb-0">{{$currentPlan->payment_method}}</div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'money-bill-wave', 'fa_color' => 'grey'])Fee amount</div>
            <div class="h4 mb-0">{{payment()->usd($currentPlan->fee_amount)}}</div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'repeat', 'fa_color' => 'grey'])Recurrence</div>
            <div class="h4 mb-0">{{$currentPlan->recurrence}}</div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'location-dot', 'fa_color' => 'grey'])Location</div>
            <div class="h4 mb-0">{{$currentPlan->location->name}}</div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'clock', 'fa_color' => 'grey'])Time</div>
            <div class="h4 mb-0">{{$currentPlan->startTime()->format('g:i A')}}</div>
        </div>

        <div class="col-6 col-md-4 mb-3">
            <div class="small opacity-4">@fa(['icon' => 'calculator', 'fa_color' => 'grey'])Number of lessons</div>
            <div class="h4 mb-0">{{$currentPlan->projectedLessonCount()}}</div>
        </div>
    </div>
    </div>

    @endif

    <div class="d-flex flex-wrap mb-5">
        @foreach($student->lessonPlans as $lessonPlan)
        @include('studio.lessonPlans.card')
        @endforeach
    </div>

    <div id="lessons-container" class="studio-table-container studio-table-container-lg">
        <table id="lessons-table" class="display studio-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Start time</th>
                    <th>Duration</th>
                    <th>Fee</th>
                    <th>Payment</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('studio.lessonPlans.create')
@foreach($student->lessonPlans as $lessonPlan)
    @include('studio.lessonPlans.edit', ['lessonPlan' => $lessonPlan])
@endforeach
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('studio.tables.state')
@include('studio.lessonPlans.create-scripts')
<script>
$(function() {
    const capitalize = function(value) {
        value = String(value || '');

        return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    };

    const formatFee = function(value) {
        const cents = Number(value || 0);

        if (!cents) {
            return '';
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(cents / 100);
    };

    const formatDate = function(value) {
        if (!value) {
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(`${value}T00:00:00`));
    };

    const formatTime = function(value) {
        if (!value) {
            return '';
        }

        const [hours, minutes] = String(value).split(':').map(Number);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const hour = hours % 12 || 12;

        return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
    };

    window.studioDataTableState.create('#lessons-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        language: {
            search: '',
            searchPlaceholder: 'Search',
            lengthMenu: 'Show _MENU_ rows',
            info: 'Showing _START_ to _END_ of _TOTAL_',
            paginate: {
                previous: '<i class="fas fa-angle-left mr-0"></i>',
                next: '<i class="fas fa-angle-right mr-0"></i>',
            },
        },
        ajax: {
            url: @json(route('studio.tables.lessons')),
            data: {
                student_id: @json($student->id),
            },
        },
        columns: [
            {
                data: 'scheduled_date',
                name: 'scheduled_date',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
                    }

                    return formatDate(data);
                },
            },
            {
                data: 'weekday',
                name: 'weekday',
                render: function(data, type, row) {
                    if (type === 'sort' || type === 'type') {
                        return row.weekday_order;
                    }

                    return capitalize(data);
                },
            },
            {
                data: 'start_time',
                name: 'start_time',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
                    }

                    return formatTime(data);
                },
            },
            {
                data: 'duration_minutes',
                name: 'duration_minutes',
                render: function(data) {
                    return data ? `${data} min` : '';
                },
            },
            {
                data: 'fee_amount',
                name: 'fee_amount',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return Number(data || 0);
                    }

                    return formatFee(data);
                },
            },
            {
                data: 'payment',
                name: 'payment',
                render: function(data, type, row) {
                    if (type === 'sort' || type === 'type') {
                        return row.paid_at || '';
                    }

                    return `<span class="${row.payment_class}">${data}</span>`;
                },
            },
        ],
    });
});
</script>
@endpush
