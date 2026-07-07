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

    <div class="studio-break-impact rounded p-3 mb-4" data-break-impact>
        Choose future dates to preview missed lessons.
    </div>

    @submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal
