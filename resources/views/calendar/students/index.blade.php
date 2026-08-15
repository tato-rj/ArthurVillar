@extends('layouts.app', ['title' => 'Students'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
@php
    $selectedStudentLocations = collect(explode(',', request('student_locations', 'home,online,bkcm')));
    $selectedStudentLocationPhrases = collect([
        'home' => 'at home',
        'bkcm' => 'at BKCM',
        'online' => 'online',
    ])->filter(fn ($phrase, $location) => $selectedStudentLocations->contains($location))->values();
    $studentsInitialLocationDescription = match ($selectedStudentLocationPhrases->count()) {
        0 => '',
        1 => ' '.$selectedStudentLocationPhrases->first(),
        2 => ' '.$selectedStudentLocationPhrases->join(' and '),
        default => ' '.$selectedStudentLocationPhrases->slice(0, -1)->join(', ').', and '.$selectedStudentLocationPhrases->last(),
    };
@endphp
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.students.index') }}

    <div class="row mb-4">
        @component('components.pagetitle', [
            'label' => 'Students',
            'modal' => [
                'target' => '#create-student-modal',
                'icon' => 'plus',
                'label' => 'New student'
            ]
        ])
        @slot('subtitle')
        <div class="text-center" id="students-totals" aria-live="polite">
            Total of <span data-students-total>{{$studentsInitialTotal}} {{\Illuminate\Support\Str::plural('student', $studentsInitialTotal)}}</span><span data-students-location-description>{{$studentsInitialLocationDescription}}</span>
        </div>
        @endslot
        @endcomponent
    </div>

    <div class="calendar-table-filters mb-3">
        @tablefilter([
            'id' => 'students-row-filters',
            'placeholder' => 'Filter students',
            'groups' => [
                'Location' => [
                    [
                        'id' => 'student-location-home',
                        'label' => 'Home',
                        'value' => 'home',
                        'checked' => $selectedStudentLocations->contains('home'),
                        'attributes' => ['data-student-location-filter' => ''],
                    ],
                    [
                        'id' => 'student-location-online',
                        'label' => 'Online',
                        'value' => 'online',
                        'checked' => $selectedStudentLocations->contains('online'),
                        'attributes' => ['data-student-location-filter' => ''],
                    ],
                    [
                        'id' => 'student-location-bkcm',
                        'label' => 'BKCM',
                        'value' => 'bkcm',
                        'checked' => $selectedStudentLocations->contains('bkcm'),
                        'attributes' => ['data-student-location-filter' => ''],
                    ],
                ],
            ],
        ])
    </div>

    <div id="students-container" class="calendar-table-container">
        <table id="students-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Location</th>
                    <th>Paid</th>
                    <th>Unpaid</th>
                    <th>Canceled</th>
                    <th>Adult</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
@include('calendar.students.create')
<div id="edit-student-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const textRenderer = $.fn.dataTable.render.text();

    const selectedFilterValues = function(selector) {
        const values = Array.from(document.querySelectorAll(selector))
            .filter(function(input) {
                return input.checked;
            })
            .map(function(input) {
                return input.value;
            });

        return values.length ? values.join(',') : 'none';
    };

    const restoreFilterValues = function(selector, value, defaultValue) {
        const selected = new Set(String(value || defaultValue).split(','));

        document.querySelectorAll(selector).forEach(function(input) {
            input.checked = selected.has(input.value);
        });
    };

    const pluralizeStudents = function(total) {
        const count = Number(total || 0);

        return `${count} ${count === 1 ? 'student' : 'students'}`;
    };

    const selectedLocationDescription = function() {
        const selected = new Set(
            Array.from(document.querySelectorAll('[data-student-location-filter]:checked'))
                .map(function(input) {
                    return input.value;
                })
        );
        const phrases = [
            ['home', 'at home'],
            ['bkcm', 'at BKCM'],
            ['online', 'online'],
        ]
            .filter(function(location) {
                return selected.has(location[0]);
            })
            .map(function(location) {
                return location[1];
            });

        if (!phrases.length) {
            return '';
        }

        if (phrases.length === 1) {
            return ` ${phrases[0]}`;
        }

        if (phrases.length === 2) {
            return ` ${phrases[0]} and ${phrases[1]}`;
        }

        return ` ${phrases.slice(0, -1).join(', ')}, and ${phrases[phrases.length - 1]}`;
    };

    const updateStudentTotals = function(response) {
        const total = document.querySelector('[data-students-total]');
        const locationDescription = document.querySelector('[data-students-location-description]');

        if (!total || !locationDescription) {
            return;
        }

        total.textContent = pluralizeStudents(response.recordsTotal);
        locationDescription.textContent = selectedLocationDescription();
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
        ajax: {
            url: @json(route('calendar.tables.students')),
            data: function(data) {
                data.student_locations = selectedFilterValues('[data-student-location-filter]');
            },
            dataSrc: function(response) {
                updateStudentTotals(response);

                return response.data;
            },
        },
        columns: [
            {data: 'name', name: 'name'},
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
                render: function(data, type, row) {
                    if (type !== 'display' || !data) {
                        return data || '';
                    }

                    const location = textRenderer.display(data);
                    const icon = /^[a-z0-9-]+$/.test(row.location_icon || '')
                        ? `<i class="fas fa-${row.location_icon} mr-2 opacity-6 text-blue" aria-hidden="true"></i>`
                        : '';

                    return `${icon}${location}`;
                },
            },
            {
                data: 'paid_lessons_count',
                name: 'paid_lessons_count',
                searchable: false,
                className: 'text-center',
                render: function(data, type) {
                    return type === 'display' && Number(data) !== 0
                        ? `<span class="text-green">${data}</span>`
                        : data;
                },
            },
            {
                data: 'unpaid_lessons_count',
                name: 'unpaid_lessons_count',
                searchable: false,
                className: 'text-center',
                render: function(data, type) {
                    return type === 'display' && Number(data) !== 0
                        ? `<span class="text-red">${data}</span>`
                        : data;
                },
            },
            {
                data: 'canceled_lessons_count',
                name: 'canceled_lessons_count',
                searchable: false,
                className: 'text-center',
                render: function(data, type) {
                    return type === 'display' && Number(data) !== 0
                        ? `<span class="text-light">${data}</span>`
                        : data;
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
                    const infoUrl = @json(route('calendar.students.show', ['student' => '__student__'])).replace('__student__', data);

                    return `
                        <div class="calendar-table-actions">
                            <a href="${infoUrl}" class="btn btn-sm btn-secondary rounded" aria-label="Student info" title="Student info">@fa(['icon' => 'circle-info', 'mr' => 0])</a>
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-student" data-url="${editUrl}" aria-label="Edit student" title="Edit student">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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
    }, {
        restore: function(params) {
            restoreFilterValues('[data-student-location-filter]', params.get('student_locations'), 'home,online,bkcm');
        },
        extraParams: function() {
            return {
                student_locations: selectedFilterValues('[data-student-location-filter]'),
            };
        },
    });

    $('#students-row-filters').on('change', 'input[type="checkbox"]', function() {
        studentsTable.ajax.reload(null, true);
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
                showModal(container.find('.modal').get(0));
            })
            .catch(function(error) {
                console.error(error);
            });
    });
});
</script>
@endpush
