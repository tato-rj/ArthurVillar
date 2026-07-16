@extends('layouts.app', ['title' => 'Expenses'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
@include('studio.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Expenses',
            'modal' => [
                'target' => '#create-expense-modal',
                'icon' => 'plus',
                'label' => 'New expense'
            ]
        ])
    </div>

    <div id="expenses-container" class="studio-table-container studio-table-container-lg">
        <table id="expenses-table" class="display studio-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Repeats</th>
                    <th>Starts on</th>
                    <th>Ends on</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('studio.expenses.create')
<div id="edit-expense-modal-container"></div>
@endsection


@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('studio.tables.state')
<script>
$(function() {
    const formatMonth = function(value) {
        if (!value) {
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
        }).format(new Date(`${value}T00:00:00`));
    };

    const formatMoney = function(value) {
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

    const showModal = function(modal) {
        if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
            window.bootstrap.Modal.getOrCreateInstance(modal).show();
            return;
        }

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(modal).modal('show');
        }
    };

    const expensesTable = window.studioDataTableState.create('#expenses-table', {
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
        ajax: @json(route('studio.tables.expenses')),
        columns: [
            {data: 'name', name: 'name'},
            {
                data: 'amount',
                name: 'amount',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return Number(data || 0);
                    }

                    return formatMoney(data);
                },
            },
            {data: 'recurrence_label', name: 'recurrence_label'},
            {
                data: 'starts_on',
                name: 'starts_on',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data || '';
                    }

                    return formatMonth(data);
                },
            },
            {
                data: 'ends_on',
                name: 'ends_on',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data || '';
                    }

                    return formatMonth(data);
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('studio.expenses.edit', ['expense' => '__expense__'])).replace('__expense__', data);
                    const deleteUrl = @json(route('studio.expenses.destroy', ['expense' => '__expense__'])).replace('__expense__', data);

                    return `
                        <div class="studio-table-actions">
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-expense" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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

    $('#expenses-table').on('click', '.js-edit-expense', function() {
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
                    throw new Error('Unable to load expense form.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = $('#edit-expense-modal-container');

                container.html(html);
                showModal(container.find('.modal').get(0));
            })
            .catch(function(error) {
                console.error(error);
            });
    });
});
</script>
@endpush
