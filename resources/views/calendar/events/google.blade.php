@extends('layouts.app', ['title' => 'Google Events'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.events.google') }}

    <div class="row mb-4">
        @pagetitle(['label' => 'Google Events'])
    </div>

    <div id="google-events-container" class="calendar-table-container calendar-table-container-lg">
        <table id="google-events-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Starts at</th>
                    <th>Ends at</th>
                    <th>Calendar</th>
                    <th>Organizer</th>
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
        order: [[1, 'asc'], [2, 'asc']],
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
            {data: 'name', name: 'name', render: textRenderer},
            {
                data: 'scheduled_date', name: 'scheduled_date', searchable: false,
                render: function(data, type) { return type === 'display' ? formatDate(data) : data; },
            },
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
            {
                data: 'external_url', name: 'actions', orderable: false, searchable: false, className: 'text-right',
                render: function(data) {
                    if (!data) return '';

                    const link = document.createElement('a');
                    link.className = 'btn btn-sm btn-outline-dark rounded';
                    link.href = data;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.title = 'Open in Google Calendar';
                    link.setAttribute('aria-label', 'Open in Google Calendar');
                    link.innerHTML = '<i class="fas fa-arrow-up-right-from-square mr-0" aria-hidden="true"></i>';

                    return link.outerHTML;
                },
            },
        ],
    });
});
</script>
@endpush
