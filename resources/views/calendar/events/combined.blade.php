@extends('layouts.app', ['title' => $source === 'general' ? 'My Events' : 'Google Events'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render($source === 'general' ? 'calendar.events.index' : 'calendar.events.google') }}

    <div class="row mb-4">
        @pagetitle([
            'label' => $source === 'general' ? 'My Events' : 'Google Events',
            'subtitle' => $source === 'general'
                ? 'Events you created in this calendar.'
                : 'Events imported from your connected Google Calendars.',
            'modal' => $source === 'general' ? [
                'target' => '#create-event-modal',
                'icon' => 'plus',
                'label' => 'New event'
            ] : null
        ])
    </div>

    @if($source === 'general')
        <div class="calendar-table-filters mb-3" id="events-scheduled-range">
            @daterange([
                'fromId' => 'events-scheduled-from',
                'toId' => 'events-scheduled-to',
                'fromValue' => request('scheduled_from'),
                'toValue' => request('scheduled_to'),
                'placeholder' => 'Filter by event date',
            ])
        </div>

        <div id="events-container" class="calendar-table-container calendar-table-container-lg">
            <table id="events-table" class="display calendar-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Starts</th>
                        <th>Ends</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </table>
        </div>
    @else
        <div id="google-events-container" class="calendar-table-container calendar-table-container-lg">
            <table id="google-events-table" class="display calendar-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Starts</th>
                        <th>Ends</th>
                        <th>Calendar</th>
                        <th>Organizer</th>
                        <th>Response</th>
                    </tr>
                </thead>
            </table>
        </div>
    @endif
</section>

@if($source === 'general')
    @include('calendar.events.create')
    <div id="edit-event-modal-container"></div>
@endif
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const textRenderer = $.fn.dataTable.render.text();
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

    @if($source === 'general')
        const showModal = function(modal) {
            if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
                window.bootstrap.Modal.getOrCreateInstance(modal).show();
                return;
            }

            if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
                window.jQuery(modal).modal('show');
            }
        };

        const table = window.calendarDataTableState.create('#events-table', {
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
                url: @json(route('calendar.tables.events')),
                data: function(data) {
                    data.scheduled_from = $('#events-scheduled-from').val();
                    data.scheduled_to = $('#events-scheduled-to').val();
                },
            },
            columns: [
                {data: 'scheduled_date', name: 'scheduled_date', render: function(data, type) { return type === 'display' ? formatDate(data) : data; }},
                {data: 'name', name: 'name', render: textRenderer},
                {data: 'starts_at', name: 'starts_at', render: function(data, type) { return type === 'display' ? formatTime(data) : data; }},
                {data: 'ends_at', name: 'ends_at', render: function(data, type) { return type === 'display' ? formatTime(data) : data; }},
                {data: 'type', name: 'type', defaultContent: ''},
                {
                    data: 'status',
                    name: 'status',
                    render: function(data) {
                        return `<span class="${data === 'Canceled' ? 'text-light' : 'text-green'}">${data}</span>`;
                    },
                },
                {
                    data: 'id', name: 'actions', orderable: false, searchable: false, className: 'text-right',
                    render: function(data, type, row) {
                        if (row.status === 'Canceled') {
                            const revertUrl = @json(route('calendar.events.revert', ['event' => '__event__'])).replace('__event__', data);

                            return `<div class="calendar-table-actions">
                                <button type="button" class="btn btn-sm btn-secondary rounded js-revert-canceled-event" data-url="${revertUrl}" aria-label="Revert cancellation" title="Revert cancellation">
                                    @fa(['icon' => 'rotate-left', 'mr' => 0])
                                </button>
                            </div>`;
                        }

                        const editUrl = @json(route('calendar.events.edit', ['event' => '__event__'])).replace('__event__', data);
                        const deleteUrl = @json(route('calendar.events.destroy', ['event' => '__event__'])).replace('__event__', data);

                        return `<div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-event" data-url="${editUrl}" aria-label="Edit event">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
                            <form method="POST" action="${deleteUrl}" confirm>
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-red rounded" aria-label="Cancel event">@fa(['icon' => 'trash-alt', 'mr' => 0])</button>
                            </form>
                        </div>`;
                    },
                },
            ],
        }, {
            restore: function(params) {
                $('#events-scheduled-from').val(params.get('scheduled_from') || '');
                $('#events-scheduled-to').val(params.get('scheduled_to') || '');
            },
            extraParams: function() {
                return {
                    scheduled_from: $('#events-scheduled-from').val(),
                    scheduled_to: $('#events-scheduled-to').val(),
                };
            },
        });

        $('#events-scheduled-range').on('date-range:change', function() {
            table.ajax.reload();
        });

        $('#events-table').on('click', '.js-edit-event', function() {
            fetch($(this).data('url'), {headers: {Accept: 'text/html', 'X-Requested-With': 'XMLHttpRequest'}})
                .then(function(response) {
                    if (!response.ok) throw new Error('Unable to load event form.');
                    return response.text();
                })
                .then(function(html) {
                    const container = document.getElementById('edit-event-modal-container');
                    container.innerHTML = html;
                    showModal(container.querySelector('.modal'));
                })
                .catch(console.error);
        });

        $('#events-table').on('click', '.js-revert-canceled-event', function() {
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
                    if (!response.ok) throw new Error('Unable to revert event cancellation.');
                    return response.json();
                })
                .then(function() {
                    table.ajax.reload(null, false);
                })
                .catch(function(error) {
                    console.error(error);
                    button.disabled = false;
                    window.alert(error.message);
                });
        });
    @else
        const formatStatus = function(value) {
            return ({
                accepted: 'Accepted',
                declined: 'Declined',
                needsAction: 'Awaiting response',
                tentative: 'Maybe',
            })[value] || value || '';
        };

        window.calendarDataTableState.create('#google-events-table', {
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
            ajax: @json(route('calendar.tables.google-events')),
            columns: [
                {data: 'scheduled_date', name: 'scheduled_date', searchable: false, render: function(data, type) { return type === 'display' ? formatDate(data) : data; }},
                {data: 'name', name: 'name', render: textRenderer},
                {
                    data: 'starts_at', name: 'starts_at', searchable: false,
                    render: function(data, type, row) {
                        if (type !== 'display') return data;
                        return row.all_day ? 'All day' : formatTime(data);
                    },
                },
                {
                    data: 'ends_at', name: 'ends_at', searchable: false,
                    render: function(data, type, row) {
                        if (type !== 'display') return data;
                        return row.all_day ? '' : formatTime(data);
                    },
                },
                {data: 'calendar', name: 'calendar', render: textRenderer},
                {data: 'organizer', name: 'organizer', defaultContent: '', render: textRenderer},
                {
                    data: 'response_status', name: 'response_status', defaultContent: '',
                    render: function(data, type) {
                        const status = formatStatus(data);
                        return type === 'display' ? textRenderer.display(status) : status;
                    },
                },
            ],
        });
    @endif
});
</script>
@endpush
