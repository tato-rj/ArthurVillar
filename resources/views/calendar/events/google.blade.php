@extends('layouts.app', ['title' => 'Google Events'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.events.google') }}

    <div class="row mb-4">
        @pagetitle([
            'label' => 'Google Events',
            'subtitle' => 'Events imported from your connected Google Calendars.',
        ])
    </div>

    <div id="google-events-container" class="calendar-table-container calendar-table-container-lg">
        <div class="alert alert-danger" data-google-visibility-error role="alert" hidden></div>
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

    const table = window.calendarDataTableState.create('#google-events-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        order: [[0, 'asc'], [2, 'asc']],
        language: {
            search: '', searchPlaceholder: 'Search', lengthMenu: 'Show _MENU_ rows',
            info: 'Showing _START_ to _END_ of _TOTAL_',
            paginate: {
                previous: '@icon('chevron-left', ['mr' => 0])',
                next: '@icon('chevron-right', ['mr' => 0])',
            },
        },
        ajax: @json(route('calendar.tables.google-events')),
        columns: [
            {data: 'scheduled_date', name: 'scheduled_date', searchable: false, render: function(data, type) { return type === 'display' ? formatDate(data) : data; }},
            {
                data: 'name', name: 'name',
                render: function(data, type, row) {
                    if (type !== 'display') return data;
                    const name = textRenderer.display(data);
                    return row.restore_url ? name + '<div class="small text-muted">Hidden</div>' : name;
                },
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

                    if (type !== 'display') return status;

                    const color = status === 'Accepted' ? 'text-green' : 'text-muted';
                    return `<span class="${color}">${textRenderer.display(status)}</span>`;
                },
            },
            {
                data: 'restore_url', name: 'actions', orderable: false, searchable: false, className: 'text-right',
                render: function(url, type, row) {
                    if (type !== 'display' || !url) return '';
                    const label = row.recurring_event_id ? 'Show series' : 'Show on calendar';
                    return `<div class="calendar-table-actions">
                        <button type="button" class="btn btn-sm btn-warning rounded text-nowrap" data-restore-google-event>@icon('rotate-ccw')${label}</button>
                    </div>`;
                },
            },
        ],
    });

    $('#google-events-table').on('click', '[data-restore-google-event]', async function() {
        const row = table.row(this.closest('tr')).data();
        if (!row?.restore_url || this.disabled) return;

        const error = document.querySelector('[data-google-visibility-error]');
        error.hidden = true;
        this.disabled = true;
        try {
            const response = await fetch(row.restore_url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ hidden: false }),
            });
            const result = await response.json();
            if (!response.ok || result.hidden !== false) throw new Error();
            table.ajax.reload(null, false);
        } catch {
            error.textContent = 'Unable to restore this Google event. Please try again.';
            error.hidden = false;
            this.disabled = false;
        }
    });
});
</script>
@endpush
