@extends('layouts.app', ['title' => 'Single Lessons'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
@endpush

@section('content')
@include('calendar.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Single Lessons Plans',
            'modal' => [
                'target' => '#create-single-lesson-plan-modal',
                'icon' => 'plus',
                'label' => 'New lesson'
            ]
        ])
    </div>

    <div class="calendar-table-filters mb-3" id="single-lesson-plans-scheduled-range">
        @daterange([
            'fromId' => 'single-lesson-plans-scheduled-from',
            'toId' => 'single-lesson-plans-scheduled-to',
            'fromValue' => request('scheduled_from'),
            'toValue' => request('scheduled_to'),
            'placeholder' => 'Filter by scheduled date',
        ])
    </div>

    <div id="single-lesson-plans-container" class="calendar-table-container calendar-table-container-lg">
        <table id="single-lesson-plans-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Start time</th>
                    <th>Duration</th>
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
<div id="edit-single-lesson-plan-modal-container"></div>
@include('calendar.singleLessonPlans.create')
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

    const setSingleLessonOnlineFields = function(form, shouldEmpty) {
        const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
        const selectedOption = locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
        const isOnline = selectedOption && selectedOption.dataset.isOnline === '1';

        (form ? form.querySelectorAll('.single-lesson-plan-online-field') : []).forEach(function(field) {
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

    const syncSingleLessonFee = function(form) {
        const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
        const durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
        const feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
        const selectedOption = locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
        const hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
        const duration = durationSelect ? Number(durationSelect.value || 0) : 0;

        if (!feeInput || !hourlyFee || !duration) {
            return;
        }

        const proratedFee = hourlyFee * (duration / 60);
        const roundedFee = Math.floor(proratedFee / 5) * 5;

        feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
    };

    const singleLessonPlansTable = window.calendarDataTableState.create('#single-lesson-plans-table', {
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
            url: @json(route('calendar.tables.single-lesson-plans')),
            data: function(data) {
                data.scheduled_from = $('#single-lesson-plans-scheduled-from').val();
                data.scheduled_to = $('#single-lesson-plans-scheduled-to').val();
            },
        },
        columns: [
            {data: 'student', name: 'student'},
            {
                data: 'scheduled_date',
                name: 'scheduled_date',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data || '';
                    }

                    return formatDate(data);
                },
            },
            {
                data: 'weekday',
                name: 'weekday',
                render: function(data, type, row) {
                    if (type === 'sort' || type === 'type') {
                        return row.weekday_order;
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
                data: 'status',
                name: 'status',
                render: function(data) {
                    return capitalize(data);
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const editUrl = @json(route('calendar.single-lesson-plans.edit', ['singleLessonPlan' => '__singleLessonPlan__'])).replace('__singleLessonPlan__', data);
                    const deleteUrl = @json(route('calendar.single-lesson-plans.destroy', ['singleLessonPlan' => '__singleLessonPlan__'])).replace('__singleLessonPlan__', data);

                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-single-lesson-plan" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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
            $('#single-lesson-plans-scheduled-from').val(params.get('scheduled_from') || '');
            $('#single-lesson-plans-scheduled-to').val(params.get('scheduled_to') || '');
        },
        extraParams: function() {
            return {
                scheduled_from: $('#single-lesson-plans-scheduled-from').val(),
                scheduled_to: $('#single-lesson-plans-scheduled-to').val(),
            };
        },
    });

    $('#single-lesson-plans-scheduled-range').on('date-range:change', function() {
        singleLessonPlansTable.ajax.reload(null, true);
    });

    $('#single-lesson-plans-table').on('click', '.js-edit-single-lesson-plan', function() {
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
                    throw new Error('Unable to load single lesson form.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = $('#edit-single-lesson-plan-modal-container');

                container.html(html);

                const modal = container.find('.modal').get(0);
                const form = modal ? modal.querySelector('form') : null;

                setSingleLessonOnlineFields(form, false);

                showModal(modal);
            })
            .catch(function(error) {
                console.error(error);
            });
    });

    $('#edit-single-lesson-plan-modal-container').on('change', 'select[name="location_id"]', function() {
        const form = this.closest('form');

        syncSingleLessonFee(form);
        setSingleLessonOnlineFields(form, true);
    });

    $('#edit-single-lesson-plan-modal-container').on('change', 'select[name="duration_minutes"]', function() {
        syncSingleLessonFee(this.closest('form'));
    });
});
</script>
@endpush
