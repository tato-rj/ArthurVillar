@modal(['title' => $title, 'id' => $id])
<form id="{{$formId}}" class="studio-break-form" method="POST" action="{{$action}}">
    @csrf

    @if($method !== 'POST')
    @method($method)
    @endif

    @input(['label' => 'Title', 'name' => 'title', 'required' => true])

    <div class="form-group text-left">
        @label(['label' => 'Reason'])
        <textarea class="form-control rounded" name="reason" rows="4"></textarea>
        @feedback(['input' => 'reason'])
    </div>

    <div class="row">
        @input(['label' => 'Starts on', 'name' => 'starts_on', 'type' => 'date', 'required' => true, 'grid' => 'col', 'min' => now()->toDateString()])
        @input(['label' => 'Ends on', 'name' => 'ends_on', 'type' => 'date', 'required' => true, 'grid' => 'col', 'min' => now()->toDateString()])
    </div>

    <div class="form-group text-left">
        @label(['label' => 'Locations'])
        <div>
            @foreach($locations as $location)
            <div class="form-check">
                <input
                    class="form-check-input"
                    name="location_ids[]"
                    type="checkbox"
                    value="{{$location->id}}"
                    id="{{$formId}}-location-{{$location->id}}"
                    {{is_array(old('location_ids')) && in_array($location->id, old('location_ids')) ? 'checked' : ''}}>
                <label class="form-check-label" for="{{$formId}}-location-{{$location->id}}">{{$location->name}}</label>
            </div>
            @endforeach
        </div>
        <div class="form-text">Leave every location unchecked to apply this break to all locations.</div>
        @feedback(['input' => 'location_ids'])
    </div>

    <div class="studio-break-impact rounded p-3 mb-4" data-break-impact>
        Choose future dates to preview missed lessons.
    </div>

    @submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
