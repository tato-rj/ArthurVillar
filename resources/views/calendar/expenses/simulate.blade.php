@modal(['title' => 'Simulate income', 'id' => 'simulate-income-modal'])
<form method="GET" action="{{route('calendar.expenses.report')}}">
    <input type="hidden" name="starts_from" value="{{$startsFrom->format('Y-m')}}">
    <input type="hidden" name="starts_to" value="{{$startsTo->format('Y-m')}}">

    <p>Increate the income from this location by...</p>
    <div class="d-grid gap-3 mb-4">
        @foreach($locations as $location)
            <label class="d-flex align-items-center justify-content-between gap-3 mb-0">
                <span class="fw-bold">{{$location->name}} {{payment()->usd($location->fee_amount)}}</span>
                <span class="input-group" style="max-width: 150px;">
                    <input
                        type="number"
                        name="simulation[{{$location->id}}]"
                        value="{{$simulation[$location->id] ?? ''}}"
                        min="0"
                        step="10"
                        class="form-control border-right-0"
                        placeholder="0"
                        style="  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;"
                    >
                    <span class="input-group-text border-black">%</span>
                </span>
            </label>
        @endforeach
    </div>

    <div class="text-center">
        @btn(['label' => 'Apply simulation', 'theme' => 'primary', 'submit' => true])
    </div>
</form>
@endmodal
