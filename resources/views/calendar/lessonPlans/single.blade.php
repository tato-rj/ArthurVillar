@extends('layouts.app', ['title' => 'Lesson Plans'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
@endpush

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.lesson-plans.index') }}

    <div class="row mb-4">
        @pagetitle([
            'label' => 'Lesson Plans',
            'subtitle' => 'Recurring and one-time teaching commitments.',
            'modal' => [
                'target' => '#create-single-lesson-plan-modal',
                'icon' => 'plus',
                'label' => 'New one-time plan'
            ]
        ])
    </div>

    <div class="d-flex justify-content-center mb-4">
        <div class="btn-group" role="group" aria-label="Lesson plan type">
            <a class="btn btn-outline-secondary" href="{{route('calendar.lesson-plans.index', ['type' => 'recurring'])}}">
                @fa(['icon' => 'rotate'])Recurring
            </a>
            <a class="btn btn-secondary" href="{{route('calendar.lesson-plans.index', ['type' => 'one-time'])}}">
                @fa(['icon' => 'calendar-day'])One-time
            </a>
        </div>
    </div>

    <div class="calendar-table-filters mb-3" id="single-lesson-plans-scheduled-range">
        @daterange([
            'fromId' => 'single-lesson-plans-scheduled-from',
            'toId' => 'single-lesson-plans-scheduled-to',
            'fromValue' => request('scheduled_from'),
            'toValue' => request('scheduled_to'),
            'placeholder' => 'Filter by lesson date',
        ])
    </div>

    <div id="single-lesson-plans-container" class="calendar-table-container calendar-table-container-lg">
        <table id="single-lesson-plans-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Start time</th>
                    <th>Duration</th>
                    <th>Fee</th>
                    <th>Payment</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

<div id="edit-single-lesson-plan-modal-container"></div>
@include('calendar.singleLessonPlans.create')
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
@include('calendar.lessonPlans.create-scripts')
<script>
$(function() {
    const formatDate = function(value) {
        return value ? new Intl.DateTimeFormat('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
        }).format(new Date(`${value}T00:00:00`)) : '';
    };
    const formatTime = function(value) {
        if (!value) return '';
        const parts = String(value).split(':');
        const hour = Number(parts[0]);
        return `${hour % 12 || 12}:${parts[1]} ${hour >= 12 ? 'PM' : 'AM'}`;
    };
    const formatFee = function(value) {
        const cents = Number(value || 0);
        return cents ? new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', maximumFractionDigits: 0,
        }).format(cents / 100) : '';
    };
    const showModal = function(modal) {
        if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
            window.bootstrap.Modal.getOrCreateInstance(modal).show();
            return;
        }

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(modal).modal('show');
        }
    };

    const table = window.calendarDataTableState.create('#single-lesson-plans-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        order: [[0, 'asc'], [2, 'asc']],
        language: {
            search: '', searchPlaceholder: 'Search', lengthMenu: 'Show _MENU_ rows',
            info: 'Showing _START_ to _END_ of _TOTAL_',
            paginate: {
                previous: '<i class="fas fa-angle-left mr-0"></i>',
                next: '<i class="fas fa-angle-right mr-0"></i>',
            },
        },
        ajax: {
            url: @json(route('calendar.tables.single-lesson-plans')),
            data: function(data) {
                data.scheduled_from = $('#single-lesson-plans-scheduled-from').val();
                data.scheduled_to = $('#single-lesson-plans-scheduled-to').val();
            },
        },
        columns: [
            {data: 'scheduled_date', name: 'scheduled_date', render: function(data, type) { return type === 'display' ? formatDate(data) : data; }},
            {data: 'student', name: 'student'},
            {data: 'start_time', name: 'start_time', render: function(data, type) { return type === 'display' ? formatTime(data) : data; }},
            {data: 'duration_minutes', name: 'duration_minutes', render: function(data) { return data ? `${data} min` : ''; }},
            {data: 'fee_amount', name: 'fee_amount', render: function(data, type) { return type === 'display' ? formatFee(data) : Number(data || 0); }},
            {data: 'payment_method', name: 'payment_method', defaultContent: ''},
            {data: 'location', name: 'location', defaultContent: ''},
            {
                data: 'status', name: 'status', defaultContent: '',
                render: function(data) {
                    const label = !data || data === 'active' ? 'Scheduled' : data.charAt(0).toUpperCase() + data.slice(1);
                    return `<span class="${label === 'Scheduled' ? 'text-green' : 'text-light'}">${label}</span>`;
                },
            },
            {
                data: 'id', name: 'actions', orderable: false, searchable: false, className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('calendar.single-lesson-plans.edit', ['singleLessonPlan' => '__plan__'])).replace('__plan__', data);
                    const deleteUrl = @json(route('calendar.single-lesson-plans.destroy', ['singleLessonPlan' => '__plan__'])).replace('__plan__', data);

                    return `<div class="calendar-table-actions">
                        <button type="button" class="btn btn-sm btn-warning rounded js-edit-single-lesson-plan" data-url="${editUrl}" aria-label="Edit one-time plan">
                            @fa(['icon' => 'pen-to-square', 'mr' => 0])
                        </button>
                        <form method="POST" action="${deleteUrl}" confirm>
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-red rounded" aria-label="Delete one-time plan">
                                @fa(['icon' => 'trash-alt', 'mr' => 0])
                            </button>
                        </form>
                    </div>`;
                },
            },
        ],
    }, {
        restore: function(params) {
            $('#single-lesson-plans-scheduled-from').val(params.get('scheduled_from') || '');
            $('#single-lesson-plans-scheduled-to').val(params.get('scheduled_to') || '');
        },
        extraParams: function() {
            return {
                type: 'one-time',
                scheduled_from: $('#single-lesson-plans-scheduled-from').val(),
                scheduled_to: $('#single-lesson-plans-scheduled-to').val(),
            };
        },
    });

    $('#single-lesson-plans-scheduled-range').on('date-range:change', function() {
        table.ajax.reload();
    });

    $('#single-lesson-plans-table').on('click', '.js-edit-single-lesson-plan', function() {
        fetch($(this).data('url'), {
            headers: {Accept: 'text/html', 'X-Requested-With': 'XMLHttpRequest'},
        })
            .then(function(response) {
                if (!response.ok) throw new Error('Unable to load one-time lesson plan form.');
                return response.text();
            })
            .then(function(html) {
                const container = document.getElementById('edit-single-lesson-plan-modal-container');
                container.innerHTML = html;
                const modal = container.querySelector('.modal');
                window.calendarLessonPlanCreateForms.initialize(modal);
                showModal(modal);
            })
            .catch(console.error);
    });
});
</script>
@endpush
