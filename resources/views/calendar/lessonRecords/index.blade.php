@extends('layouts.app', ['title' => 'Lesson Records'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
@endpush

@section('content')
@php
    $selectedRecordStatuses = collect(explode(',', request('record_statuses', 'paid,unpaid,canceled')));
@endphp
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.lesson-records.index') }}

    <div class="row mb-4">
        @component('components.pagetitle', ['label' => 'Lesson Records'])

        @slot('subtitle')
        <div class="text-center" id="lesson-records-totals" aria-live="polite">
            <span data-lesson-record-total="paid">
                Total paid <span class="text-green" data-lesson-record-total-amount>$0</span>
            </span>
            <span data-lesson-record-total="unpaid">
                <span data-lesson-record-total-divider> · </span>Total unpaid <span class="text-red" data-lesson-record-total-amount>$0</span>
            </span>
            <span data-lesson-record-total="canceled">
                <span data-lesson-record-total-divider> · </span>Total canceled <span class="text-muted" data-lesson-record-total-amount>$0</span>
            </span>
        </div>
        @endslot
        @endcomponent
    </div>

    <div class="calendar-table-filters mb-3" id="lesson-records-scheduled-range">
        @daterange([
            'fromId' => 'lesson-records-scheduled-from',
            'toId' => 'lesson-records-scheduled-to',
            'fromValue' => request('scheduled_from'),
            'toValue' => request('scheduled_to'),
            'placeholder' => 'Filter by lesson date',
        ])

        @tablefilter([
            'id' => 'lesson-records-row-filters',
            'placeholder' => 'Filter records',
            'groups' => [
                'Status' => [
                    [
                        'id' => 'lesson-record-status-paid',
                        'label' => 'Paid lessons',
                        'value' => 'paid',
                        'checked' => $selectedRecordStatuses->contains('paid'),
                        'attributes' => ['data-lesson-record-status-filter' => ''],
                    ],
                    [
                        'id' => 'lesson-record-status-unpaid',
                        'label' => 'Unpaid lessons',
                        'value' => 'unpaid',
                        'checked' => $selectedRecordStatuses->contains('unpaid'),
                        'attributes' => ['data-lesson-record-status-filter' => ''],
                    ],
                    [
                        'id' => 'lesson-record-status-canceled',
                        'label' => 'Canceled lessons',
                        'value' => 'canceled',
                        'checked' => $selectedRecordStatuses->contains('canceled'),
                        'attributes' => ['data-lesson-record-status-filter' => ''],
                    ],
                ],
            ],
        ])
    </div>

    <div id="lesson-records-container" class="calendar-table-container calendar-table-container-lg">
        <table id="lesson-records-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Student</th>
                    <th>Type</th>
                    <th>Weekday</th>
                    <th>Start time</th>
                    <th>Duration</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
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

    const formatTotal = function(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(value || 0) / 100);
    };

    const updateLessonRecordTotals = function(table) {
        const totals = {
            paid: 0,
            unpaid: 0,
            canceled: 0,
        };

        table.rows({page: 'current'}).data().each(function(row) {
            const status = row.status === 'Confirmed'
                ? 'paid'
                : String(row.status || '').toLowerCase();

            if (Object.prototype.hasOwnProperty.call(totals, status)) {
                totals[status] += Number(row.fee_amount || 0);
            }
        });

        const enabledStatuses = new Set(
            Array.from(document.querySelectorAll('[data-lesson-record-status-filter]:checked'))
                .map(function(input) {
                    return input.value;
                })
        );

        const totalsContainer = document.querySelector('#lesson-records-totals');
        totalsContainer.hidden = enabledStatuses.size === 0;
        let visibleTotalIndex = 0;

        document.querySelectorAll('[data-lesson-record-total]').forEach(function(totalRow) {
            const status = totalRow.dataset.lessonRecordTotal;
            const isVisible = enabledStatuses.has(status);
            totalRow.hidden = !isVisible;

            const divider = totalRow.querySelector('[data-lesson-record-total-divider]');
            if (divider) {
                divider.hidden = !isVisible || visibleTotalIndex === 0;
            }

            totalRow.querySelector('[data-lesson-record-total-amount]').textContent = formatTotal(totals[status]);

            if (isVisible) {
                visibleTotalIndex += 1;
            }
        });
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

    const formatPaymentDate = function(value) {
        if (!value) {
            return '';
        }

        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(new Date(value));
    };

    const initializePaymentPopovers = function() {
        document.querySelectorAll('#lesson-records-table [data-bs-toggle="popover"]').forEach(function(element) {
            if (window.bootstrap && window.bootstrap.Popover) {
                window.bootstrap.Popover.getOrCreateInstance(element);
                return;
            }

            if (window.jQuery && typeof window.jQuery.fn.popover === 'function') {
                window.jQuery(element).popover();
            }
        });
    };

    const lessonRecordsTable = window.calendarDataTableState.create('#lesson-records-table', {
        processing: false,
        serverSide: true,
        autoWidth: false,
        scrollX: true,
        drawCallback: function() {
            initializePaymentPopovers();
            updateLessonRecordTotals(this.api());
        },
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
            url: @json(route('calendar.tables.lesson-records')),
            data: function(data) {
                data.scheduled_from = $('#lesson-records-scheduled-from').val();
                data.scheduled_to = $('#lesson-records-scheduled-to').val();
                data.record_statuses = selectedFilterValues('[data-lesson-record-status-filter]');
            },
        },
        columns: [
            {
                data: 'scheduled_date',
                name: 'scheduled_date',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
                    }

                    return formatDate(data);
                },
            },
            {data: 'student', name: 'student'},
            {data: 'lesson_type', name: 'lesson_type'},
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
                render: function(data, type, row) {
                    if (type === 'sort' || type === 'type') {
                        return Number(data || 0);
                    }

                    const amount = formatFee(data);

                    if (row.status === 'Canceled') {
                        return `<span class="text-light text-decoration-line-through">${amount}</span>`;
                    }

                    if (!row.paid_at) {
                        return `<span class="text-red">${amount}</span>`;
                    }

                    const paymentDate = formatPaymentDate(row.paid_at);

                    return `<span class="text-green" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-container="body" data-bs-placement="top" data-bs-content="Paid on ${paymentDate}">${amount}</span>`;
                },
            },
            {
                data: 'status',
                name: 'status',
                render: function(data) {
                    const statusClass = data === 'Confirmed'
                        ? 'text-green'
                        : (data === 'Unpaid' ? 'text-red' : 'text-light');

                    return `<span class="${statusClass}">${data}</span>`;
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const deleteUrl = @json(route('calendar.lessons.destroy', ['lesson' => '__lesson__'])).replace('__lesson__', data);

                    return `<div class="calendar-table-actions">
                        <form method="POST" action="${deleteUrl}" confirm>
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-red rounded" aria-label="Delete lesson record" title="Delete lesson record">
                                @fa(['icon' => 'trash-alt', 'mr' => 0])
                            </button>
                        </form>
                    </div>`;
                },
            },
        ],
    }, {
        restore: function(params) {
            $('#lesson-records-scheduled-from').val(params.get('scheduled_from') || '');
            $('#lesson-records-scheduled-to').val(params.get('scheduled_to') || '');
            restoreFilterValues('[data-lesson-record-status-filter]', params.get('record_statuses'), 'paid,unpaid,canceled');
        },
        extraParams: function() {
            return {
                scheduled_from: $('#lesson-records-scheduled-from').val(),
                scheduled_to: $('#lesson-records-scheduled-to').val(),
                record_statuses: selectedFilterValues('[data-lesson-record-status-filter]'),
            };
        },
    });

    $('#lesson-records-scheduled-range').on('date-range:change', function() {
        lessonRecordsTable.ajax.reload();
    });

    $('#lesson-records-row-filters').on('change', 'input[type="checkbox"]', function() {
        updateLessonRecordTotals(lessonRecordsTable);
        lessonRecordsTable.ajax.reload(null, true);
    });

});
</script>
@endpush
