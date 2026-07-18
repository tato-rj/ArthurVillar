@extends('layouts.app', ['title' => 'Financial Report'])

@section('content')
@php
    $money = function ($value) {
        if ($value === null) {
            return '';
        }

        return '$'.number_format(((int) $value) / 100, 0);
    };
@endphp
@include('calendar.calendar.home-icon')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Financial Report',
            'modal' => [
                'target' => '#simulate-income-modal',
                'icon' => 'wand-magic-sparkles',
                'label' => 'Simulate income'
            ]
        ])
    </div>

    <form method="GET" class="calendar-table-filters mb-3" id="financial-report-filters">
        @foreach($simulation as $locationId => $percentage)
            <input type="hidden" name="simulation[{{$locationId}}]" value="{{$percentage}}">
        @endforeach
        @daterange([
            'fromName' => 'starts_from',
            'toName' => 'starts_to',
            'fromValue' => $startsFrom->format('Y-m'),
            'toValue' => $startsTo->format('Y-m'),
            'output' => 'month',
            'placeholder' => 'Select report range',
        ])
    </form>

    @if($simulationEnabled)
        <div class="d-flex align-items-center gap-2 mb-3">
            <span class="badge bg-warning text-dark">Simulation enabled</span>
            <a
                href="{{route('calendar.expenses.report', ['starts_from' => $startsFrom->format('Y-m'), 'starts_to' => $startsTo->format('Y-m')])}}"
                class="btn btn-sm btn-secondary rounded"
            >
                Clear simulation
            </a>
        </div>
    @endif

    <div class="calendar-table-container calendar-table-container-lg mb-4">
        <table class="table table-striped table-hover align-middle calendar-table">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Total expenses</th>
                    <th>Expected income</th>
                    <th>Expected net</th>
                </tr>
            </thead>
            <tbody>
                @foreach($months as $month)
                    <tr>
                        <td>{{$month['month']}}</td>
                        <td>{{$money($month['expenses'])}}</td>
                        <td>{{$money($month['expected_income'])}}</td>
                        <td class="{{$month['expected_net'] < 0 ? 'text-red' : 'text-green'}}">{{$money($month['expected_net'])}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div>
        <p>@fa(['icon' => 'piggy-bank'])On average, you are making <span class="fw-bold" id="average-income">{{$money($averageIncome)}}</span> and potentially saving <span class="fw-bold" id="average-savings">{{$money($averageSavings)}}</span> each month.</p>
    </div>
</section>

@include('calendar.expenses.simulate')
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const filters = document.getElementById('financial-report-filters');

    if (!filters) {
        return;
    }

    filters.querySelector('[data-date-range]').addEventListener('date-range:change', function() {
        filters.submit();
    });
});
</script>
@endpush
