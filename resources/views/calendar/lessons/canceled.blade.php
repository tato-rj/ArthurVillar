@extends('layouts.app', ['title' => 'Canceled Lessons'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
@include('calendar.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Canceled Lessons'
        ])
    </div>

    <div class="calendar-table-filters mb-3" id="canceled-lessons-range">
        @daterange([
            'fromId' => 'canceled-lessons-from',
            'toId' => 'canceled-lessons-to',
            'fromValue' => request('canceled_from'),
            'toValue' => request('canceled_to'),
            'placeholder' => 'Filter by cancellation date',
        ])
    </div>

    <div id="canceled-lessons-container" class="calendar-table-container calendar-table-container-lg">
        <table id="canceled-lessons-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Type</th>
                    <th>Lesson date</th>
                    <th>Weekday</th>
                    <th>Start time</th>
                    <th>Duration</th>
                    <th>Fee</th>
                    <th>Canceled by</th>
                    <th>Canceled on</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const capitalize = function(value) {
        value = String(value || '');

        return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    };

    const formatDate = function(value) {
        if (!value) {
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(`${String(value).substring(0, 10)}T00:00:00`));
    };

    const formatDateTime = function(value) {
        if (!value) {
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
        }).format(new Date(value));
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

    const formatTime = function(value) {
        if (!value) {
            return '';
        }

        const [hours, minutes] = String(value).split(':').map(Number);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const hour = hours % 12 || 12;

        return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
    };

    const canceledLessonsTable = window.calendarDataTableState.create('#canceled-lessons-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        order: [[8, 'desc']],
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
            url: @json(route('calendar.tables.canceled-lessons')),
            data: function(data) {
                data.canceled_from = $('#canceled-lessons-from').val();
                data.canceled_to = $('#canceled-lessons-to').val();
            },
        },
        columns: [
            {data: 'student', name: 'student'},
            {data: 'lesson_type', name: 'lesson_type'},
            {
                data: 'scheduled_date',
                name: 'scheduled_date',
                render: function(data, type) {
                    return type === 'display' ? formatDate(data) : data;
                },
            },
            {
                data: 'weekday',
                name: 'weekday',
                render: function(data, type, row) {
                    return type === 'display' ? capitalize(data) : row.weekday_order;
                },
            },
            {
                data: 'start_time',
                name: 'start_time',
                render: function(data, type) {
                    return type === 'display' ? formatTime(data) : data;
                },
            },
            {
                data: 'duration_minutes',
                name: 'duration_minutes',
                render: function(data, type) {
                    return type === 'display' && data ? `${data} min` : data;
                },
            },
            {
                data: 'fee_amount',
                name: 'fee_amount',
                render: function(data, type) {
                    return type === 'display' ? formatFee(data) : Number(data || 0);
                },
            },
            {
                data: 'canceled_by',
                name: 'canceled_by',
                render: function(data, type) {
                    return type === 'display' ? (capitalize(data) || 'Not specified') : data;
                },
            },
            {
                data: 'canceled_at',
                name: 'canceled_at',
                render: function(data, type) {
                    return type === 'display' ? formatDateTime(data) : data;
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-secondary rounded js-revert-canceled-lesson" data-lesson-id="${data}" aria-label="Revert cancellation" title="Revert cancellation">
                                @fa(['icon' => 'rotate-left', 'mr' => 0])
                            </button>
                        </div>`;
                },
            },
        ],
    }, {
        restore: function(params) {
            $('#canceled-lessons-from').val(params.get('canceled_from') || '');
            $('#canceled-lessons-to').val(params.get('canceled_to') || '');
        },
        extraParams: function() {
            return {
                canceled_from: $('#canceled-lessons-from').val(),
                canceled_to: $('#canceled-lessons-to').val(),
            };
        },
    });

    $('#canceled-lessons-range').on('date-range:change', function() {
        canceledLessonsTable.ajax.reload();
    });

    $('#canceled-lessons-table').on('click', '.js-revert-canceled-lesson', function() {
        const button = this;

        button.disabled = true;

        fetch(@json(route('calendar.lessons.revert')), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': @json(csrf_token()),
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
                lesson_id: button.dataset.lessonId,
                schedule_override_id: '',
                early_payment_id: '',
            }),
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Unable to revert lesson cancellation.');
                }

                return response.json();
            })
            .then(function() {
                canceledLessonsTable.ajax.reload(null, false);
            })
            .catch(function(error) {
                console.error(error);
                button.disabled = false;
                window.alert(error.message);
            });
    });
});
</script>
@endpush
