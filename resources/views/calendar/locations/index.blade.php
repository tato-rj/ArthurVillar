@extends('layouts.app', ['title' => 'Locations'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.locations.index') }}

    <div class="row mb-4">
        @pagetitle([
            'label' => 'Locations',
            'modal' => [
                'target' => '#create-location-modal',
                'icon' => 'plus',
                'label' => 'New location'
            ]
        ])
    </div>

    <div id="locations-container" class="calendar-table-container calendar-table-container-lg">
        <table id="locations-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Usage</th>
                    <th>Address</th>
                    <th>Hourly fee</th>
                    <th>Tax withheld</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('calendar.locations.create')
@include('calendar.locations.info')

<div id="edit-location-modal-container"></div>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const formatPercentage = function(value) {
        const percentage = Number(value || 0);

        return `${percentage.toLocaleString('en-US', {
            maximumFractionDigits: 2,
        })}%`;
    };

    const formatFee = function(value, emptyValue = '') {
        const cents = Number(value || 0);

        if (!cents) {
            return emptyValue;
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(cents / 100);
    };

    const formatDuration = function(value) {
        const minutes = Math.round(Number(value || 0));

        if (!minutes) {
            return '-';
        }

        return `${minutes} min`;
    };

    const formatTime = function(value) {
        if (!value) {
            return '';
        }

        const parts = String(value).split(':');
        const hour = Number(parts[0] || 0);
        const minute = Number(parts[1] || 0);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;

        return `${hour12}:${String(minute).padStart(2, '0')} ${suffix}`;
    };

    const escapeHtml = function(value) {
        return String(value || '').replace(/[&<>"']/g, function(character) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
            }[character];
        });
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

    const locationsTable = window.calendarDataTableState.create('#locations-table', {
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
        ajax: @json(route('calendar.tables.locations')),
        columns: [
            {data: 'name', name: 'name'},
            {
                data: 'usage',
                name: 'usage',
                render: function(data) {
                    const usage = String(data || '');

                    return usage ? usage.charAt(0).toUpperCase() + usage.slice(1) : '';
                },
            },
            {
                data: 'address',
                name: 'address',
                render: function(data, type, row) {
                    return [
                        data,
                        [row.city, row.state].filter(Boolean).join(', '),
                        row.postal_code,
                    ].filter(Boolean).join(', ');
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
                data: 'tax_withheld_percentage',
                name: 'tax_withheld_percentage',
                render: function(data) {
                    return formatPercentage(data);
                },
            },
            {
                data: 'is_active',
                name: 'is_active',
                render: function(data) {
                    return Number(data) ? 'Active' : 'Inactive';
                },
            },
            {
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data, type, row) {
                    const editUrl = @json(route('calendar.locations.edit', ['location' => '__location__'])).replace('__location__', data);
                    const deleteUrl = @json(route('calendar.locations.destroy', ['location' => '__location__'])).replace('__location__', data);
                    const infoButton = row.usage === 'teaching'
                        ? `<button type="button" class="btn btn-sm btn-primary rounded js-location-info">@fa(['icon' => 'circle-info', 'mr' => 0])</button>`
                        : '';

                    return `
                        <div class="calendar-table-actions">
                            ${infoButton}
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-location" data-url="${editUrl}">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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

    $('#locations-table').on('click', '.js-location-info', function() {
        const location = locationsTable.row($(this).closest('tr')).data();
        const info = location.info || {};
        const students = info.students || [];
        const modal = $('#location-info-modal');

        modal.find('#location-info-name').text(location.name || 'Location');
        modal.find('#location-info-students-count').text(Number(info.students_count || 0));
        modal.find('#location-info-average-length').text(formatDuration(info.average_lesson_length));
        modal.find('#location-info-average-fee').text(formatFee(info.average_lesson_fee, '$0'));
        modal.find('#location-info-weekly-gross').text(formatFee(info.weekly_gross_income, '$0'));
        modal.find('#location-info-weekly-net').text(formatFee(info.weekly_net_income, '$0'));
        modal.find('#location-info-monthly-net').text(formatFee(info.monthly_net_projection, '$0'));
        modal.find('#location-info-tax').text(`${formatFee(info.weekly_tax_withheld, '$0')} withheld per week at ${formatPercentage(location.tax_withheld_percentage)}`);

        modal.find('#location-info-lessons').html(students.length
            ? students.map(function(student) {
                return `
                    <div class="calendar-break-lesson">
                        <div class="font-weight-bold">${escapeHtml(student.name || 'Student')}</div>
                        <div class="opacity-4">
                            ${escapeHtml(student.weekday || '')} ${formatTime(student.start_time)}
                            · ${formatDuration(student.duration_minutes)}
                            · ${formatFee(student.fee_amount, '$0')}
                            · ${escapeHtml(student.recurrence || '')}
                        </div>
                    </div>
                `;
            }).join('')
            : '<div class="opacity-4">No current active lesson plans for this location.</div>');

        showModal(modal.get(0));
    });

    $('#locations-table').on('click', '.js-edit-location', function() {
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
                    throw new Error('Unable to load location form.');
                }

                return response.text();
            })
            .then(function(html) {
                const container = $('#edit-location-modal-container');

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
