@extends('layouts.app', ['title' => 'Locations'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Locations',
            'modal' => [
                'target' => '#create-location-modal',
                'icon' => 'plus',
                'label' => 'New location'
            ]
        ])
    </div>

    <div id="locations-container" class="studio-table-container studio-table-container-lg">
        <table id="locations-table" class="display studio-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Tax withheld</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('studio.locations.create')
<div id="edit-location-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('studio.tables.state')
<script>
$(function() {
    const formatPercentage = function(value) {
        const percentage = Number(value || 0);

        return `${percentage.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        })}%`;
    };

    const locationsTable = window.studioDataTableState.create('#locations-table', {
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
        ajax: @json(route('studio.tables.locations')),
        columns: [
            {data: 'name', name: 'name'},
            {
                data: 'tax_withheld_percentage',
                name: 'tax_withheld_percentage',
                render: function(data) {
                    return formatPercentage(data);
                },
            },
            {
                data: 'is_active',
                name: 'is_active',
                render: function(data) {
                    return Number(data) ? 'Active' : 'Inactive';
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('studio.locations.edit', ['location' => '__location__'])).replace('__location__', data);
                    const deleteUrl = @json(route('studio.locations.destroy', ['location' => '__location__'])).replace('__location__', data);

                    return `
                        <div class="studio-table-actions">
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-location" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
                            <form method="POST" action="${deleteUrl}" confirm>
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-sm btn-red rounded">@fa(['icon' => 'trash-alt', 'mr' => 0])</button>
                            </form>
                        </div>
                    `;
                },
            },
        ],
    });

    $('#locations-table').on('click', '.js-edit-location', function() {
        const url = $(this).data('url');

        if (!url) {
            return;
        }

        fetch(url, {
            headers: {
                Accept: 'text/html',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Unable to load location form.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = $('#edit-location-modal-container');

                container.html(html);

                const modal = container.find('.modal').get(0);

                if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
                    window.bootstrap.Modal.getOrCreateInstance(modal).show();
                    return;
                }

                if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
                    window.jQuery(modal).modal('show');
                }
            })
            .catch(function(error) {
                console.error(error);
            });
    });
});
</script>
@endpush
