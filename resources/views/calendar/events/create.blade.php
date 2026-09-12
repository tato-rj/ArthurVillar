@modal(['title' => 'New event', 'id' => 'create-event-modal'])
<form method="POST" action="{{route('calendar.events.store')}}">
    @csrf

    <div class="text-center mb-3">
        <button type="button" class="btn btn-outline-secondary btn-sm" data-google-conference-import-open>
            @fa(['icon' => 'calendar-plus']) Use Google Calendar conference info
        </button>
    </div>

    @include('calendar.events.partials.form')
    @submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal

@modal(['title' => 'Use Google Calendar conference info', 'id' => 'google-conference-import-modal'])
<div data-google-conference-import>
    <label for="google-conference-info" class="form-label">Conference info</label>
    <div class="form-control">
        <textarea
            id="google-conference-info"
            class="border-0 w-100 h-100"
            rows="9"
            placeholder="Paste the conference info copied from Google Calendar"
            data-google-conference-import-text></textarea>
    </div>

    <div class="text-red mt-2" role="alert" data-google-conference-import-error hidden></div>

    <div class="text-center mt-3">
        <button type="button" class="btn btn-primary" data-google-conference-import-apply>
            Use conference info
        </button>
    </div>
</div>
@endmodal
