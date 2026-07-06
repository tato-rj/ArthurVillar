@extends('layouts.app', ['title' => 'Lessons'])

@push('header')
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => str_possessive($student->first_name).' lessons',
            'modal' => [
                'target' => '#create-lessonPlan-modal',
                'icon' => 'plus',
                'label' => 'New lesson plan'
            ]
        ])
    </div>

    <div class="d-flex flex-wrap mb-5">
        @foreach($student->lessonPlans as $lessonPlan)
        @include('studio.lessonPlans.card')
        @endforeach
    </div>

    <div id="lessons-container" class="studio-table-container studio-table-container-lg">
        <table id="lessons-table" class="display studio-table">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Start time</th>
                    <th>Duration</th>
                    <th>Fee</th>
                    <th>Payment</th>
                </tr>
            </thead>
        </table>
    </div>
</section>

@include('studio.lessonPlans.create')
@foreach($student->lessonPlans as $lessonPlan)
    @include('studio.lessonPlans.edit', ['lessonPlan' => $lessonPlan])
@endforeach
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

    const formatTime = function(value) {
        if (!value) {
            return '';
        }

        const [hours, minutes] = String(value).split(':').map(Number);
        const suffix = hours >= 12 ? 'PM' : 'AM';
        const hour = hours % 12 || 12;

        return `${hour}:${String(minutes).padStart(2, '0')} ${suffix}`;
    };

    $('#lessons-table').DataTable({
        processing: false,
        serverSide: true,
        autoWidth: false,
        ajax: {
            url: @json(route('studio.tables.lessons')),
            data: {
                student_id: @json($student->id),
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
                data: 'payment',
                name: 'payment',
                render: function(data, type, row) {
                    if (type === 'sort' || type === 'type') {
                        return row.paid_at || '';
                    }

                    return `<span class="${row.payment_class}">${data}</span>`;
                },
            },
        ],
    });
});
</script>
@endpush
