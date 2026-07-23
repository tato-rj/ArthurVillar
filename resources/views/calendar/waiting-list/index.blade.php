@extends('layouts.app', ['title' => 'Waiting list'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.waiting-list.index') }}

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

    <div id="waiting-list-container" class="calendar-table-container calendar-table-container-lg">
        <table id="waiting-list-table" class="display calendar-table">
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

@include('calendar.waiting-list.create')
@include('calendar.students.create')
<div id="edit-waiting-list-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const escapeAttribute = function(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    const showModal = function(modal) {
        if (!modal) {
            return;
        }

        if (window.bootstrap && window.bootstrap.Modal && typeof window.bootstrap.Modal.getOrCreateInstance === 'function') {
            window.bootstrap.Modal.getOrCreateInstance(modal).show();
            return;
        }

        if (window.jQuery && typeof window.jQuery.fn.modal === 'function') {
            window.jQuery(modal).modal('show');
        }
    };

    const populateStudentCreateModal = function(entry) {
        const modal = document.getElementById('create-student-modal');
        const form = modal ? modal.querySelector('form') : null;

        if (!form) {
            return;
        }

        form.reset();

        const values = {
            waiting_list_id: entry.id || '',
            first_name: entry.first_name || '',
            last_name: entry.last_name || '',
            parent_name: entry.parent_name || '',
            email: entry.email || '',
            phone: entry.phone || '',
            notes: entry.notes || '',
        };

        Object.keys(values).forEach(function(name) {
            const input = form.querySelector(`[name="${name}"]`);

            if (input) {
                input.value = values[name];
            }
        });

        const isAdult = form.querySelector('[name="is_adult"]');

        if (isAdult) {
            isAdult.checked = Boolean(Number(entry.is_adult));
            isAdult.value = '1';
        }

        showModal(modal);
    };

    const waitingListTable = window.calendarDataTableState.create('#waiting-list-table', {
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
        ajax: @json(route('calendar.tables.waiting-list')),
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
                render: function(data, type, row) {
                    const editUrl = @json(route('calendar.waiting-list.edit', ['waitingList' => '__waitingList__'])).replace('__waitingList__', data);
                    const deleteUrl = @json(route('calendar.waiting-list.destroy', ['waitingList' => '__waitingList__'])).replace('__waitingList__', data);
                    const waitingListEntry = escapeAttribute(JSON.stringify(row || {}));

                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-green rounded js-create-student-from-waiting-list" data-waiting-list="${waitingListEntry}">@fa(['icon' => 'user-plus', 'mr' => 0])</button>
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

    $('#waiting-list-table').on('click', '.js-create-student-from-waiting-list', function() {
        const data = $(this).attr('data-waiting-list');

        if (!data) {
            return;
        }

        try {
            populateStudentCreateModal(JSON.parse(data));
        } catch (error) {
            console.error(error);
        }
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

                showModal(modal);
            })
            .catch(function(error) {
                console.error(error);
            });
    });
});
</script>
@endpush
