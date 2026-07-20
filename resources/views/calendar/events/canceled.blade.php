@extends('layouts.app', ['title' => 'Canceled Events'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
@include('calendar.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Canceled Events'
        ])
    </div>

    <div class="calendar-table-filters mb-3" id="canceled-events-range">
        @daterange([
            'fromId' => 'canceled-events-from',
            'toId' => 'canceled-events-to',
            'fromValue' => request('canceled_from'),
            'toValue' => request('canceled_to'),
            'placeholder' => 'Filter by cancellation date',
        ])
    </div>

    <div id="canceled-events-container" class="calendar-table-container calendar-table-container-lg">
        <table id="canceled-events-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Event date</th>
                    <th>Starts at</th>
                    <th>Ends at</th>
                    <th>Type</th>
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

    const formatTime = function(value) {
        if (!value) {
            return '';
        }

        const [hours, minutes] = String(value).split(':').map(Number);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const hour = hours % 12 || 12;

        return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
    };

    const canceledEventsTable = window.calendarDataTableState.create('#canceled-events-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        order: [[5, 'desc']],
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
            url: @json(route('calendar.tables.canceled-events')),
            data: function(data) {
                data.canceled_from = $('#canceled-events-from').val();
                data.canceled_to = $('#canceled-events-to').val();
            },
        },
        columns: [
            {data: 'name', name: 'name'},
            {
                data: 'scheduled_date',
                name: 'scheduled_date',
                render: function(data, type) {
                    return type === 'display' ? formatDate(data) : data;
                },
            },
            {
                data: 'starts_at',
                name: 'starts_at',
                render: function(data, type) {
                    return type === 'display' ? formatTime(data) : data;
                },
            },
            {
                data: 'ends_at',
                name: 'ends_at',
                render: function(data, type) {
                    return type === 'display' ? formatTime(data) : data;
                },
            },
            {data: 'type', name: 'type', defaultContent: ''},
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
                    const revertUrl = @json(route('calendar.events.revert', ['event' => '__event__'])).replace('__event__', data);

                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-secondary rounded js-revert-canceled-event" data-url="${revertUrl}" aria-label="Revert cancellation" title="Revert cancellation">
                                @fa(['icon' => 'rotate-left', 'mr' => 0])
                            </button>
                        </div>`;
                },
            },
        ],
    }, {
        restore: function(params) {
            $('#canceled-events-from').val(params.get('canceled_from') || '');
            $('#canceled-events-to').val(params.get('canceled_to') || '');
        },
        extraParams: function() {
            return {
                canceled_from: $('#canceled-events-from').val(),
                canceled_to: $('#canceled-events-to').val(),
            };
        },
    });

    $('#canceled-events-range').on('date-range:change', function() {
        canceledEventsTable.ajax.reload();
    });

    $('#canceled-events-table').on('click', '.js-revert-canceled-event', function() {
        const button = this;

        button.disabled = true;

        fetch(button.dataset.url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': @json(csrf_token()),
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Unable to revert event cancellation.');
                }

                return response.json();
            })
            .then(function() {
                canceledEventsTable.ajax.reload(null, false);
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
