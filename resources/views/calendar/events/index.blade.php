@extends('layouts.app', ['title' => 'Events'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
@include('calendar.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Events',
            'modal' => [
                'target' => '#create-event-modal',
                'icon' => 'plus',
                'label' => 'New event'
            ]
        ])
    </div>

    <div id="events-container" class="calendar-table-container calendar-table-container-lg">
        <table id="events-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Starts at</th>
                    <th>Ends at</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('calendar.events.create')
<div id="edit-event-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const showModal = function(modal) {
        if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
            window.bootstrap.Modal.getOrCreateInstance(modal).show();
            return;
        }

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(modal).modal('show');
        }
    };

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

    window.calendarDataTableState.create('#events-table', {
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
        ajax: @json(route('calendar.tables.events')),
        columns: [
            {data: 'name', name: 'name'},
            {data: 'scheduled_date', name: 'scheduled_date', render: function(data, type) { return type === 'display' ? formatDate(data) : data; }},
            {data: 'starts_at', name: 'starts_at', render: function(data, type) { return type === 'display' ? formatTime(data) : data; }},
            {data: 'ends_at', name: 'ends_at', render: function(data, type) { return type === 'display' ? formatTime(data) : data; }},
            {
                data: 'id', name: 'actions', orderable: false, searchable: false, className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('calendar.events.edit', ['event' => '__event__'])).replace('__event__', data);
                    const deleteUrl = @json(route('calendar.events.destroy', ['event' => '__event__'])).replace('__event__', data);

                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-event" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
                            <form method="POST" action="${deleteUrl}" confirm>
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-red rounded">@fa(['icon' => 'trash-alt', 'mr' => 0])</button>
                            </form>
                        </div>`;
                },
            },
        ],
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
});
</script>
@endpush
