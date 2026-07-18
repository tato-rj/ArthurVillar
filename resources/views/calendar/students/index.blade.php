@extends('layouts.app', ['title' => 'Students'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
@include('calendar.calendar.home-icon')
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
    <div id="students-container" class="calendar-table-container">
        <table id="students-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Location</th>
                    <th>Adult</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
@include('calendar.students.create')
<div id="student-missed-lessons-modal-container"></div>
<div id="edit-student-modal-container"></div>
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

    const capitalize = function(value) {
        value = String(value || '');

        return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    };

    const studentsTable = window.calendarDataTableState.create('#students-table', {
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
        ajax: @json(route('calendar.tables.students')),
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
                render: function(data, type, row) {
                    const deleteUrl = @json(route('calendar.students.destroy', ['student' => '__student__'])).replace('__student__', data);
                    const editUrl = @json(route('calendar.students.edit', ['student' => '__student__'])).replace('__student__', data);
                    const missedLessonsUrl = @json(route('calendar.students.missed-lessons', ['student' => '__student__'])).replace('__student__', data);
                    const missedLessonsButton = row.has_current_lesson_plan
                        ? `<button type="button" class="btn btn-sm btn-secondary rounded js-student-missed-lessons" data-url="${missedLessonsUrl}">@fa(['icon' => 'calendar-day', 'mr' => 0])</button>`
                        : '';

                    return `
                        <div class="calendar-table-actions">
                            ${missedLessonsButton}
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

    $('#students-table').on('click', '.js-student-missed-lessons', function() {
        fetch($(this).data('url'), {
            headers: {
                Accept: 'text/html',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Unable to load missed lessons.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = document.getElementById('student-missed-lessons-modal-container');
                container.innerHTML = html;
                showModal(container.querySelector('.modal'));
            })
            .catch(console.error);
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

                showModal(modal);
            })
            .catch(function(error) {
                console.error(error);
            });
    });
});
</script>
@endpush
