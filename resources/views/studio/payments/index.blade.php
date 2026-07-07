@extends('layouts.app', ['title' => 'Payments'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Payments',
        ])
    </div>

    <div class="studio-table-filters mb-3">
        <label>
            <span>From</span>
            <input type="date" id="payments-paid-from">
        </label>
        <label>
            <span>To</span>
            <input type="date" id="payments-paid-to">
        </label>
        <button type="button" id="payments-clear-dates" class="btn btn-sm btn-secondary rounded">Clear</button>
    </div>

    <div id="payments-container" class="studio-table-container studio-table-container-lg">
        <table id="payments-table" class="display studio-table">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Paid on</th>
                    <th>Lesson date</th>
                    <th>Fee</th>
                    <th>Method</th>
                </tr>
            </thead>
        </table>
    </div>
</section>
@endsection

@push('scripts')
<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
@include('studio.tables.state')
<script>
$(function() {
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

    const paymentsTable = window.studioDataTableState.create('#payments-table', {
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
            url: @json(route('studio.tables.payments')),
            data: function(data) {
                data.paid_from = $('#payments-paid-from').val();
                data.paid_to = $('#payments-paid-to').val();
            },
        },
        order: [[1, 'desc']],
        columns: [
            {data: 'student', name: 'student'},
            {
                data: 'paid_on',
                name: 'paid_on',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
                    }

                    return formatDate(data);
                },
            },
            {
                data: 'lesson_date',
                name: 'lesson_date',
                render: function(data, type) {
                    if (type === 'sort' || type === 'type') {
                        return data;
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
        ],
    }, {
        restore: function(params) {
            $('#payments-paid-from').val(params.get('paid_from') || '');
            $('#payments-paid-to').val(params.get('paid_to') || '');
        },
        extraParams: function() {
            return {
                paid_from: $('#payments-paid-from').val(),
                paid_to: $('#payments-paid-to').val(),
            };
        },
    });

    $('#payments-paid-from, #payments-paid-to').on('change', function() {
        paymentsTable.ajax.reload();
    });

    $('#payments-clear-dates').on('click', function() {
        $('#payments-paid-from, #payments-paid-to').val('');
        paymentsTable.ajax.reload();
    });
});
</script>
@endpush
