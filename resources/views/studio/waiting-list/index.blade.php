@extends('layouts.app', ['title' => 'Waiting list'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Waiting list',
            'modal' => [
                'target' => '#create-waiting-list-modal',
                'icon' => 'plus',
                'label' => 'New lead'
            ]
        ])
    </div>

    <div id="waiting-list-container" class="studio-table-container studio-table-container-lg">
        <table id="waiting-list-table" class="display studio-table">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Parent</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('studio.waiting-list.create')
<div id="edit-waiting-list-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('studio.tables.state')
<script>
$(function() {
    const waitingListTable = window.studioDataTableState.create('#waiting-list-table', {
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
        ajax: @json(route('studio.tables.waiting-list')),
        columns: [
            {data: 'first_name', name: 'first_name'},
            {
                data: 'last_name',
                name: 'last_name',
                render: function(data) {
                    return data || '';
                },
            },
            {
                data: 'parent_name',
                name: 'parent_name',
                render: function(data) {
                    return data || '';
                },
            },
            {
                data: 'email',
                name: 'email',
                render: function(data) {
                    return data || '';
                },
            },
            {
                data: 'phone',
                name: 'phone',
                render: function(data) {
                    return data || '';
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('studio.waiting-list.edit', ['waitingList' => '__waitingList__'])).replace('__waitingList__', data);
                    const convertUrl = @json(route('studio.waiting-list.convert', ['waitingList' => '__waitingList__'])).replace('__waitingList__', data);
                    const deleteUrl = @json(route('studio.waiting-list.destroy', ['waitingList' => '__waitingList__'])).replace('__waitingList__', data);

                    return `
                        <div class="studio-table-actions">
                            <form method="POST" action="${convertUrl}" onsubmit="return confirm('Convert this lead into a student?')">
                                @csrf
                                <button type="submit" class="btn btn-sm btn-green rounded">@fa(['icon' => 'user-plus', 'mr' => 0])</button>
                            </form>
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-waiting-list" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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

    $('#waiting-list-table').on('click', '.js-edit-waiting-list', function() {
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
                    throw new Error('Unable to load waiting list form.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = $('#edit-waiting-list-modal-container');

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
