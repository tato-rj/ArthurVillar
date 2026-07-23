@extends('layouts.app', ['title' => 'Breaks'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    {{ Breadcrumbs::render('calendar.breaks.index') }}

    <div class="row mb-4">
        @pagetitle([
            'label' => 'Breaks',
            'modal' => [
                'target' => '#create-break-modal',
                'icon' => 'plus',
                'label' => 'New break'
            ]
        ])
    </div>

    <div id="breaks-container" class="calendar-table-container calendar-table-container-lg">
        <table id="breaks-table" class="display calendar-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Locations</th>
                    <th>Starts on</th>
                    <th>Ends on</th>
                    <th>Lessons missed</th>
                    <th>Money missed</th>
                    <th>Actions</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('calendar.breaks.partials.form', [
    'id' => 'create-break-modal',
    'title' => 'New break',
    'formId' => 'create-break-form',
    'method' => 'POST',
    'action' => route('calendar.breaks.store'),
])

@include('calendar.breaks.partials.form', [
    'id' => 'edit-break-modal',
    'title' => 'Edit break',
    'formId' => 'edit-break-form',
    'method' => 'PATCH',
    'action' => '',
])
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('calendar.tables.state')
<script>
$(function() {
    const today = @json(now()->toDateString());

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
            return '$0';
        }

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(cents / 100);
    };

    const updateBreakImpact = function(form) {
        const startsOn = form.find('[name="starts_on"]').val();
        const endsOn = form.find('[name="ends_on"]').val();
        const summary = form.find('[data-break-impact]');

        if (!startsOn || !endsOn || endsOn < startsOn || startsOn < today) {
            summary.text('Choose future dates to preview missed lessons.');
            return;
        }

        const url = new URL(@json(route('calendar.breaks.impact')), window.location.origin);
        url.searchParams.set('starts_on', startsOn);
        url.searchParams.set('ends_on', endsOn);
        form.find('[name="location_ids[]"]:checked').each(function() {
            url.searchParams.append('location_ids[]', this.value);
        });

        summary.text('Calculating...');

        fetch(url, {
            headers: {
                Accept: 'application/json',
            },
        })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Unable to calculate break impact.');
                }

                return response.json();
            })
            .then(function(payload) {
                const count = Number(payload.lessons_count || 0);
                summary.text(`${count} ${count === 1 ? 'lesson' : 'lessons'} missed · ${formatFee(payload.fee_amount)} missed`);
            })
            .catch(function() {
                summary.text('Unable to calculate the break impact.');
            });
    };

    const breaksTable = window.calendarDataTableState.create('#breaks-table', {
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
        ajax: @json(route('calendar.tables.breaks')),
        order: [[2, 'asc']],
        columns: [
            {data: 'title', name: 'title'},
            {data: 'locations_label', name: 'locations_label'},
            {
                data: 'starts_on',
                name: 'starts_on',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
                    }

                    return formatDate(data);
                },
            },
            {
                data: 'ends_on',
                name: 'ends_on',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
                    }

                    return formatDate(data);
                },
            },
            {
                data: 'lessons_count',
                name: 'lessons_count',
                render: function(data) {
                    const count = Number(data || 0);
                    return `${count} ${count === 1 ? 'lesson' : 'lessons'}`;
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
                data: 'id',
                name: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-right',
                render: function(data) {
                    const deleteUrl = @json(route('calendar.breaks.destroy', ['break' => '__break__'])).replace('__break__', data);

                    return `
                        <div class="calendar-table-actions">
                            <button type="button" class="btn btn-sm btn-warning rounded js-edit-break" data-bs-toggle="modal" data-bs-target="#edit-break-modal">@fa(['icon' => 'pen-to-square', 'mr' => 0])</button>
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

    $('#breaks-table').on('click', '.js-edit-break', function() {
        const teachingBreak = breaksTable.row($(this).closest('tr')).data();
        const form = $('#edit-break-form');
        const updateUrl = @json(route('calendar.breaks.update', ['break' => '__break__'])).replace('__break__', teachingBreak.id);

        form.attr('action', updateUrl);
        form.find('[name="title"]').val(teachingBreak.title || '');
        form.find('[name="reason"]').val(teachingBreak.reason || '');
        form.find('[name="starts_on"]').val(teachingBreak.starts_on || '');
        form.find('[name="ends_on"]').val(teachingBreak.ends_on || '');
        form.find('[name="location_ids[]"]').prop('checked', false);
        (teachingBreak.locations || []).forEach(function(location) {
            form.find(`[name="location_ids[]"][value="${location.id}"]`).prop('checked', true);
        });
        updateBreakImpact(form);
    });

    $('.calendar-break-form [name="starts_on"], .calendar-break-form [name="ends_on"], .calendar-break-form [name="location_ids[]"]').on('change', function() {
        updateBreakImpact($(this).closest('form'));
    });

    $('#create-break-modal').on('shown.bs.modal', function() {
        updateBreakImpact($('#create-break-form'));
    });
});
</script>
@endpush
