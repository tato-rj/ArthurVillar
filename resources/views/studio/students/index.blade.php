@extends('layouts.app', ['title' => 'Students'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Students',
            'modal' => [
                'target' => '#create-student-modal',
                'icon' => 'plus',
                'label' => 'New student'
            ]
        ])
    </div>
    <div id="students-container" class="studio-table-container">
        <table id="students-table" class="display studio-table">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Weekday</th>
                    <th>Duration</th>
                    <th>Fee</th>
                    <th>Location</th>
                    <th>Adult</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
@include('studio.students.create')
<div id="edit-student-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('studio.tables.state')
<script>
$(function() {
    const capitalize = function(value) {
        value = String(value || '');

        return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    };

    const formatFee = function(value) {
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

    const studentsTable = window.studioDataTableState.create('#students-table', {
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
        ajax: @json(route('studio.tables.students')),
        columns: [
            {data: 'first_name', name: 'first_name'},
            {data: 'last_name', name: 'last_name'},
            {
                data: 'gender',
                name: 'gender',
                render: function(data) {
                    return capitalize(data);
                },
            },
            {
                data: 'age',
                name: 'age',
                render: function(data) {
                    return data || '';
                },
            },
            {
                data: 'weekday',
                name: 'weekday',
                render: function(data) {
                    return capitalize(data);
                },
            },
            {
                data: 'duration_minutes',
                name: 'duration_minutes',
                render: function(data) {
                    return data ? `${data} min` : '';
                },
            },
            {
                data: 'fee_amount',
                name: 'fee_amount',
                render: function(data) {
                    return formatFee(data);
                },
            },
            {
                data: 'location',
                name: 'location',
                render: function(data) {
                    return data || '';
                },
            },
            {
                data: 'is_adult',
                name: 'is_adult',
                visible: false,
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const lessonPlanUrl = @json(route('studio.lessons.student', ['student' => '__student__'])).replace('__student__', data);
                    const deleteUrl = @json(route('studio.students.destroy', ['student' => '__student__'])).replace('__student__', data);
                    const editUrl = @json(route('studio.students.edit', ['student' => '__student__'])).replace('__student__', data);

                    return `
                        <div class="studio-table-actions">
                            <a href="${lessonPlanUrl}" class="btn btn-sm btn-secondary rounded">@fa(['icon' => 'calendar-days', 'mr' => 0])</a>
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-student" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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

    $('#students-table').on('click', '.js-edit-student', function() {
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
                    throw new Error('Unable to load student form.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = $('#edit-student-modal-container');

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
