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

    <form method="GET" class="studio-table-filters mb-3" id="financial-report-filters">
        @foreach($simulation as $locationId => $percentage)
            <input type="hidden" name="simulation[{{$locationId}}]" value="{{$percentage}}">
        @endforeach
        <label>
            <span>From</span>
            <input type="month" name="starts_from" value="{{$startsFrom->format('Y-m')}}">
        </label>
        <label>
            <span>To</span>
            <input type="month" name="starts_to" value="{{$startsTo->format('Y-m')}}">
        </label>
        <a href="{{route('studio.expenses.report')}}" class="btn btn-sm btn-secondary rounded">Clear</a>
    </form>

    @if($simulationEnabled)
        <div class="d-flex align-items-center gap-2 mb-3">
            <span class="badge bg-warning text-dark">Simulation enabled</span>
            <a
                href="{{route('studio.expenses.report', ['starts_from' => $startsFrom->format('Y-m'), 'starts_to' => $startsTo->format('Y-m')])}}"
                class="btn btn-sm btn-secondary rounded"
            >
                Clear simulation
            </a>
        </div>
    @endif

    <div class="studio-table-container studio-table-container-lg mb-4">
        <table class="table table-striped table-hover align-middle studio-table">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Total expenses</th>
                    <th>Expected income</th>
                    <th>Confirmed income</th>
                    <th>Expected net</th>
                    <th>Confirmed net</th>
                </tr>
            </thead>
            <tbody>
                @foreach($months as $month)
                    <tr>
                        <td>{{$month['month']}}</td>
                        <td>{{$money($month['expenses'])}}</td>
                        <td>{{$money($month['expected_income'])}}</td>
                        <td>{{$money($month['confirmed_income'])}}</td>
                        <td class="{{$month['expected_net'] < 0 ? 'text-red' : 'text-green'}}">{{$money($month['expected_net'])}}</td>
                        <td class="{{is_null($month['confirmed_net']) ? '' : ($month['confirmed_net'] < 0 ? 'text-red' : 'text-green')}}">{{$money($month['confirmed_net'])}}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div>
        <p>@fa(['icon' => 'piggy-bank'])On average, you are making <span class="fw-bold" id="average-income">{{$money($averageIncome)}}</span> and potentially saving <span class="fw-bold" id="average-savings">{{$money($averageSavings)}}</span> each month.</p>
    </div>
</section>

@include('studio.expenses.simulate')
@endsection

@push('scripts')
<script>
document.addEventListener('DOMContentLoaded', function() {
    const filters = document.getElementById('financial-report-filters');

    if (!filters) {
        return;
    }

    filters.querySelectorAll('input[type="month"]').forEach(function(input) {
        input.addEventListener('change', function() {
            filters.submit();
        });
    });
});
</script>
@endpush
