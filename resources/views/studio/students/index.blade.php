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
                    <th>Age</th>
                    <th>Weekday</th>
                    <th>Duration</th>
                    <th>Fee</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
@include('studio.students.create')

@modal(['title' => 'Edit student', 'id' => 'edit-student-modal'])
<form id="edit-student-form" method="POST" action="">
    @method('PATCH')
    @csrf

    <div class="row">
        @input(['label' => 'First name', 'name' => 'first_name', 'required' => true, 'grid' => 'col'])
        @input(['label' => 'Last name', 'name' => 'last_name', 'required' => true, 'grid' => 'col'])
    </div>

    @input(['label' => 'Parent name', 'name' => 'parent_name'])

    @input(['label' => 'Email', 'name' => 'email', 'required' => true])

    <div class="row">
        @input(['label' => 'Phone', 'name' => 'phone', 'mask' => 'phone', 'grid' => 'col'])
        @input(['label' => 'Date of birth', 'name' => 'date_of_birth', 'mask' => 'date', 'grid' => 'col'])
    </div>

    @submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
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

    const studentsTable = $('#students-table').DataTable({
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
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const lessonPlanUrl = @json(route('studio.lessons.student', ['student' => '__student__'])).replace('__student__', data);
                    const deleteUrl = @json(route('studio.students.destroy', ['student' => '__student__'])).replace('__student__', data);

                    return `
                        <div class="studio-table-actions">
                            <a href="${lessonPlanUrl}" class="btn btn-sm btn-secondary rounded">@fa(['icon' => 'calendar-days', 'mr' => 0])</a>
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-student" data-bs-toggle="modal" data-bs-target="#edit-student-modal">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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
        const student = studentsTable.row($(this).closest('tr')).data();
        const form = $('#edit-student-form');
        const updateUrl = @json(route('studio.students.update', ['student' => '__student__'])).replace('__student__', student.id);

        form.attr('action', updateUrl);
        form.find('[name="first_name"]').val(student.first_name || '');
        form.find('[name="last_name"]').val(student.last_name || '');
        form.find('[name="parent_name"]').val(student.parent_name || '');
        form.find('[name="email"]').val(student.email || '');
        form.find('[name="phone"]').val(student.phone || '');
        form.find('[name="date_of_birth"]').val(student.date_of_birth || '');
    });
});
</script>
@endpush
