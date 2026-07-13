@extends('layouts.app', ['title' => 'Venues'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Venues',
            'modal' => [
                'target' => '#create-venue-modal',
                'icon' => 'plus',
                'label' => 'New venue'
            ]
        ])
    </div>

    <div id="venues-container" class="studio-table-container studio-table-container-lg">
        <table id="venues-table" class="display studio-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Postal code</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('studio.venues.create')
<div id="edit-venue-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('studio.tables.state')
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

    window.studioDataTableState.create('#venues-table', {
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
        ajax: @json(route('studio.tables.venues')),
        columns: [
            {data: 'name', name: 'name'},
            {data: 'address', name: 'address', defaultContent: ''},
            {data: 'city', name: 'city', defaultContent: ''},
            {data: 'state', name: 'state', defaultContent: ''},
            {data: 'postal_code', name: 'postal_code', defaultContent: ''},
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data, type, row) {
                    const editUrl = @json(route('studio.venues.edit', ['venue' => '__venue__'])).replace('__venue__', data);
                    const deleteUrl = @json(route('studio.venues.destroy', ['venue' => '__venue__'])).replace('__venue__', data);

                    return `
                        <div class="studio-table-actions">
                            <a target="_blank" rel="noopener noreferrer" href="${row.google_maps_url}" class="btn btn-sm btn-secondary rounded">@fa(['icon' => 'location-dot', 'mr' => 0])</a>
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-venue" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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

    $('#venues-table').on('click', '.js-edit-venue', function() {
        fetch($(this).data('url'), {
            headers: {Accept: 'text/html', 'X-Requested-With': 'XMLHttpRequest'},
        })
            .then(function(response) {
                if (!response.ok) throw new Error('Unable to load venue form.');
                return response.text();
            })
            .then(function(html) {
                const container = document.getElementById('edit-venue-modal-container');
                container.innerHTML = html;
                showModal(container.querySelector('.modal'));
            })
            .catch(console.error);
    });
});
</script>
@endpush
