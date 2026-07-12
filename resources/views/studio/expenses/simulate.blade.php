@modal(['title' => 'Simulate income', 'id' => 'simulate-income-modal'])
<form method="GET" action="{{route('studio.expenses.report')}}">
    <input type="hidden" name="starts_from" value="{{$startsFrom->format('Y-m')}}">
    <input type="hidden" name="starts_to" value="{{$startsTo->format('Y-m')}}">

    <div class="d-grid gap-3">
        @foreach($locations as $location)
            <label class="d-flex align-items-center justify-content-between gap-3 mb-0">
                <span class="fw-bold">{{$location->name}}</span>
                <span class="input-group" style="max-width: 150px;">
                    <input
                        type="number"
                        name="simulation[{{$location->id}}]"
                        value="{{$simulation[$location->id] ?? ''}}"
                        min="0"
                        step="0.01"
                        class="form-control"
                        placeholder="0"
                    >
                    <span class="input-group-text">%</span>
                </span>
            </label>
        @endforeach
    </div>

    <div class="d-flex justify-content-end gap-2 mt-4">
        <a
            href="{{route('studio.expenses.report', ['starts_from' => $startsFrom->format('Y-m'), 'starts_to' => $startsTo->format('Y-m')])}}"
            class="btn btn-secondary rounded"
        >
            Clear
        </a>
        @btn(['label' => 'Apply simulation', 'theme' => 'primary', 'submit' => true])
    </div>
</form>
@endmodal
