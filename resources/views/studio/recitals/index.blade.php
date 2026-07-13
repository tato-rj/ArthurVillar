@extends('layouts.app', ['title' => 'Recitals'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
<link href="{{ mix('css/studio.css') }}" rel="stylesheet">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Recitals',
            'modal' => [
                'target' => '#create-recital-modal',
                'icon' => 'plus',
                'label' => 'New recital'
            ]
        ])
    </div>

    <div id="recitals-container" class="studio-table-container studio-table-container-lg">
        <table id="recitals-table" class="display studio-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>Venue</th>
                    <th>Participants</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('studio.recitals.create')
@include('studio.recitals.participants')
<div id="edit-recital-modal-container"></div>
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

    const table = window.studioDataTableState.create('#recitals-table', {
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
        ajax: @json(route('studio.tables.recitals')),
        columns: [
            {data: 'name', name: 'name'},
            {data: 'date', name: 'date', render: function(data, type) { return type === 'display' ? formatDate(data) : data; }},
            {data: 'start_time', name: 'start_time', render: function(data, type) { return type === 'display' ? formatTime(data) : data; }},
            {data: 'venue', name: 'venue', defaultContent: ''},
            {
                data: 'students_count', name: 'students_count',
                render: function(data) {
                    const count = Number(data || 0);
                    return `${count} ${count === 1 ? 'student' : 'students'}`;
                },
            },
            {
                data: 'id', name: 'actions', orderable: false, searchable: false, className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('studio.recitals.edit', ['recital' => '__recital__'])).replace('__recital__', data);
                    const studentsUrl = @json(route('studio.recitals.students.update', ['recital' => '__recital__'])).replace('__recital__', data);
                    const deleteUrl = @json(route('studio.recitals.destroy', ['recital' => '__recital__'])).replace('__recital__', data);

                    return `
                        <div class="studio-table-actions">
                            <button type="button" class="btn btn-sm btn-primary rounded js-recital-students" data-url="${studentsUrl}">@fa(['icon' => 'users', 'mr' => 0])</button>
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-recital" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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

    const participantsModal = document.getElementById('recital-participants-modal');
    const participantsForm = document.getElementById('recital-participants-form');
    const combobox = participantsModal.querySelector('[data-recital-student-combobox]');
    const search = participantsModal.querySelector('[data-recital-student-search]');
    const options = Array.from(participantsModal.querySelectorAll('[data-recital-student-option]'));
    const empty = participantsModal.querySelector('[data-recital-student-empty]');
    const list = participantsModal.querySelector('[data-recital-participant-list]');
    const inputs = participantsModal.querySelector('[data-recital-participant-inputs]');
    let selectedStudents = [];

    const filterOptions = function() {
        const query = search.value.trim().toLowerCase();
        let visible = 0;

        options.forEach(function(option) {
            const selected = selectedStudents.some(function(student) { return String(student.id) === String(option.dataset.studentId); });
            const matches = !query || option.dataset.studentName.toLowerCase().includes(query);
            option.style.display = !selected && matches ? '' : 'none';
            visible += !selected && matches ? 1 : 0;
        });
        empty.style.display = visible ? 'none' : '';
    };

    const renderParticipants = function() {
        list.innerHTML = '';
        inputs.innerHTML = '';

        if (!selectedStudents.length) {
            const message = document.createElement('div');
            message.className = 'opacity-4 py-2';
            message.textContent = 'No students selected.';
            list.appendChild(message);
        }

        selectedStudents.forEach(function(student) {
            const row = document.createElement('div');
            const name = document.createElement('span');
            const remove = document.createElement('button');
            const input = document.createElement('input');

            row.className = 'recital-participant-row';
            name.textContent = student.name;
            remove.type = 'button';
            remove.className = 'btn btn-sm btn-red rounded';
            remove.setAttribute('aria-label', `Remove ${student.name}`);
            remove.innerHTML = '<i class="fas fa-trash-alt mr-0"></i>';
            remove.addEventListener('click', function() {
                selectedStudents = selectedStudents.filter(function(item) { return String(item.id) !== String(student.id); });
                renderParticipants();
            });
            input.type = 'hidden';
            input.name = 'student_ids[]';
            input.value = student.id;
            row.appendChild(name);
            row.appendChild(remove);
            list.appendChild(row);
            inputs.appendChild(input);
        });

        filterOptions();
    };

    search.addEventListener('focus', function() { combobox.setAttribute('open', ''); filterOptions(); });
    search.addEventListener('input', function() { combobox.setAttribute('open', ''); filterOptions(); });
    options.forEach(function(option) {
        option.addEventListener('click', function() {
            selectedStudents.push({id: option.dataset.studentId, name: option.dataset.studentName});
            search.value = '';
            combobox.removeAttribute('open');
            renderParticipants();
        });
    });
    document.addEventListener('click', function(event) {
        if (!combobox.contains(event.target)) combobox.removeAttribute('open');
    });

    $('#recitals-table').on('click', '.js-recital-students', function() {
        const recital = table.row($(this).closest('tr')).data();
        participantsForm.action = $(this).data('url');
        participantsModal.querySelector('.modal-title').textContent = `${recital.name} participants`;
        selectedStudents = (recital.students || []).map(function(student) { return {id: student.id, name: student.name}; });
        search.value = '';
        renderParticipants();
        showModal(participantsModal);
    });

    $('#recitals-table').on('click', '.js-edit-recital', function() {
        fetch($(this).data('url'), {headers: {Accept: 'text/html', 'X-Requested-With': 'XMLHttpRequest'}})
            .then(function(response) { if (!response.ok) throw new Error('Unable to load recital form.'); return response.text(); })
            .then(function(html) {
                const container = document.getElementById('edit-recital-modal-container');
                container.innerHTML = html;
                showModal(container.querySelector('.modal'));
            })
            .catch(console.error);
    });
});
</script>
@endpush
