@extends('layouts.app', ['title' => 'Lessons'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
@include('calendar.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Lessons'
        ])
    </div>

    <div class="calendar-table-filters mb-3" id="lessons-scheduled-range">
        @daterange([
            'fromId' => 'lessons-scheduled-from',
            'toId' => 'lessons-scheduled-to',
            'fromValue' => request('scheduled_from'),
            'toValue' => request('scheduled_to'),
            'placeholder' => 'Filter by lesson date',
        ])
    </div>

    <div id="lessons-container" class="calendar-table-container calendar-table-container-lg">
        <table id="lessons-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Start time</th>
                    <th>Duration</th>
                    <th>Fee</th>
                    <th>Payment</th>
                    <th>Status</th>
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
        }).format(new Date(`${value}T00:00:00`));
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

    const lessonsTable = window.calendarDataTableState.create('#lessons-table', {
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
            url: @json(route('calendar.tables.lessons')),
            data: function(data) {
                data.scheduled_from = $('#lessons-scheduled-from').val();
                data.scheduled_to = $('#lessons-scheduled-to').val();
            },
        },
        columns: [
            {data: 'student', name: 'student'},
            {data: 'lesson_type', name: 'lesson_type'},
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
            {
                data: 'status',
                name: 'status',
                render: function(data) {
                    return `<span class="${data === 'Canceled' ? 'text-red' : 'text-green'}">${data}</span>`;
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data, type, row) {
                    if (row.status !== 'Canceled') {
                        return '';
                    }

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
            $('#lessons-scheduled-from').val(params.get('scheduled_from') || '');
            $('#lessons-scheduled-to').val(params.get('scheduled_to') || '');
        },
        extraParams: function() {
            return {
                scheduled_from: $('#lessons-scheduled-from').val(),
                scheduled_to: $('#lessons-scheduled-to').val(),
            };
        },
    });

    $('#lessons-scheduled-range').on('date-range:change', function() {
        lessonsTable.ajax.reload();
    });

    $('#lessons-table').on('click', '.js-revert-canceled-lesson', function() {
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
            body: JSON.stringify({lesson_id: button.dataset.lessonId}),
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Unable to revert lesson cancellation.');
                }

                return response.json();
            })
            .then(function() {
                lessonsTable.ajax.reload(null, false);
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
