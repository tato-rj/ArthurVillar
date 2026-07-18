@extends('layouts.app', ['title' => 'Recurring Lesson Plans'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">

<style>
</style>
@endpush

@section('content')
@include('calendar.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Recurring Lesson Plans',
            'modal' => [
                'target' => '#create-calendar-lesson-plan-modal',
                'icon' => 'plus',
                'label' => 'New lesson plan'
            ]
        ])
    </div>

    <div class="calendar-table-filters mb-3" id="lesson-plans-starts-range">
        @daterange([
            'fromId' => 'lesson-plans-starts-from',
            'toId' => 'lesson-plans-starts-to',
            'fromValue' => request('starts_from'),
            'toValue' => request('starts_to'),
            'placeholder' => 'Filter by active date range',
        ])
    </div>

    <div id="lesson-plans-container" class="calendar-table-container calendar-table-container-lg">
        <table id="lesson-plans-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Weekday</th>
                    <th>Start time</th>
                    <th>Duration</th>
                    <th>Recurrence</th>
                    <th>Starts on</th>
                    <th>Ends on</th>
                    <th>Fee</th>
                    <th>Payment</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
<div id="edit-lesson-plan-modal-container"></div>
@include('calendar.lessonPlans.create')
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
@include('calendar.lessonPlans.create-scripts')
<script>
$(function() {
    const capitalize = function(value) {
        value = String(value || '');

        return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
    };

    const formatDate = function(value) {
        if (!value) {
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(`${value}T00:00:00`));
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

    const formatTime = function(value) {
        if (!value) {
            return '';
        }

        const [hours, minutes] = String(value).split(':').map(Number);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const hour = hours % 12 || 12;

        return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
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

    const setLessonPlanOnlineFields = function(form, shouldEmpty) {
        const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
        const selectedOption = locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
        const isOnline = selectedOption && selectedOption.dataset.isOnline === '1';

        (form ? form.querySelectorAll('.lesson-plan-online-field') : []).forEach(function(field) {
            const input = field.querySelector('input');

            field.style.display = isOnline ? '' : 'none';

            if (input) {
                input.disabled = !isOnline;

                if (!isOnline || shouldEmpty) {
                    input.value = '';
                }
            }
        });
    };

    const setFormFieldValue = function(form, name, value) {
        const field = form ? form.querySelector(`[name="${name}"]`) : null;

        if (field) {
            field.value = value == null ? '' : value;
        }
    };

    const formatFeeInput = function(value) {
        const cents = Number(value || 0);

        if (!cents) {
            return '';
        }

        const dollars = cents / 100;

        return Number.isInteger(dollars) ? String(dollars) : String(dollars.toFixed(2));
    };

    const openDuplicateLessonPlanModal = function(lessonPlan) {
        const modal = document.getElementById('create-calendar-lesson-plan-modal');
        const form = modal ? modal.querySelector('form') : null;

        if (!modal || !form || !lessonPlan) {
            return;
        }

        form.reset();

        const studentInput = form.querySelector('[data-student-combobox-input]');
        const studentValue = form.querySelector('[data-student-combobox-value]');

        if (studentInput) {
            studentInput.value = lessonPlan.student || '';
            studentInput.setCustomValidity('');
        }

        if (studentValue) {
            studentValue.value = lessonPlan.student_id || '';
        }

        setFormFieldValue(form, 'location_id', lessonPlan.location_id);
        setFormFieldValue(form, 'weekday', lessonPlan.weekday);
        setFormFieldValue(form, 'recurrence_interval', lessonPlan.recurrence_interval);
        setFormFieldValue(form, 'starts_on', '');
        setFormFieldValue(form, 'ends_on', '');
        setFormFieldValue(form, 'start_time', lessonPlan.start_time);
        setFormFieldValue(form, 'duration_minutes', lessonPlan.duration_minutes);
        setFormFieldValue(form, 'fee_amount', formatFeeInput(lessonPlan.fee_amount));
        setFormFieldValue(form, 'payment_method', lessonPlan.payment_method);
        setFormFieldValue(form, 'meeting_url', lessonPlan.meeting_url);
        setFormFieldValue(form, 'notes_url', lessonPlan.notes_url);
        setFormFieldValue(form, 'notes', lessonPlan.notes);

        setLessonPlanOnlineFields(form, false);

        if (window.calendarLessonPlanCreateForms && typeof window.calendarLessonPlanCreateForms.initialize === 'function') {
            window.calendarLessonPlanCreateForms.initialize(modal);
        }

        showModal(modal);
    };

    const lessonPlansTable = window.calendarDataTableState.create('#lesson-plans-table', {
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
            url: @json(route('calendar.tables.lesson-plans')),
            data: function(data) {
                data.starts_from = $('#lesson-plans-starts-from').val();
                data.starts_to = $('#lesson-plans-starts-to').val();
            },
        },
        createdRow: function(row, data) {
            $('td', row).attr('data-status', data.status || 'inactive');
        },
        columns: [
            {data: 'student', name: 'student'},
            {
                data: 'weekday_name',
                name: 'weekday_name',
                render: function(data, type, row) {
                    if (type === 'sort' || type === 'type') {
                        return row.weekday;
                    }

                    return capitalize(data);
                },
            },
            {
                data: 'start_time',
                name: 'start_time',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
                    }

                    return formatTime(data);
                },
            },
            {
                data: 'duration_minutes',
                name: 'duration_minutes',
                render: function(data) {
                    return data ? `${data} min` : '';
                },
            },
            {data: 'recurrence', name: 'recurrence'},
            {
                data: 'starts_on',
                name: 'starts_on',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data || '';
                    }

                    return formatDate(data);
                },
            },
            {
                data: 'ends_on',
                name: 'ends_on',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data || '';
                    }

                    return formatDate(data);
                },
            },
            {
                data: 'fee_amount',
                name: 'fee_amount',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return Number(data || 0);
                    }

                    return formatFee(data);
                },
            },
            {
                data: 'payment_method',
                name: 'payment_method',
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
                data: 'status_order',
                name: 'status_order',
                searchable: false,
                render: function(data, type, row) {
                    return capitalize(row.status);
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('calendar.lesson-plans.edit', ['lessonPlan' => '__lessonPlan__'])).replace('__lessonPlan__', data);
                    const deleteUrl = @json(route('calendar.lesson-plans.destroy', ['lessonPlan' => '__lessonPlan__'])).replace('__lessonPlan__', data);

                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-secondary rounded js-duplicate-lesson-plan">@fa(['icon' => 'copy', 'mr' => 0])</button>
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-lesson-plan" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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
            $('#lesson-plans-starts-from').val(params.get('starts_from') || '');
            $('#lesson-plans-starts-to').val(params.get('starts_to') || '');
        },
        extraParams: function() {
            return {
                starts_from: $('#lesson-plans-starts-from').val(),
                starts_to: $('#lesson-plans-starts-to').val(),
            };
        },
    });

    $('#lesson-plans-starts-range').on('date-range:change', function() {
        lessonPlansTable.ajax.reload(null, true);
    });

    $('#lesson-plans-table').on('click', '.js-duplicate-lesson-plan', function() {
        openDuplicateLessonPlanModal(lessonPlansTable.row($(this).closest('tr')).data());
    });

    $('#lesson-plans-table').on('click', '.js-edit-lesson-plan', function() {
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
                    throw new Error('Unable to load lesson plan form.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = $('#edit-lesson-plan-modal-container');

                container.html(html);

                const modal = container.find('.modal').get(0);
                const form = modal ? modal.querySelector('form') : null;

                setLessonPlanOnlineFields(form, false);

                showModal(modal);
            })
            .catch(function(error) {
                console.error(error);
            });
    });

    $('#edit-lesson-plan-modal-container').on('change', 'select[name="location_id"]', function() {
        setLessonPlanOnlineFields(this.closest('form'), true);
    });
});
</script>
@endpush
