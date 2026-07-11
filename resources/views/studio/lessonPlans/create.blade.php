@modal(['title' => 'New lesson plan', 'id' => 'create-lessonPlan-modal'])
<form method="POST" action="{{route('studio.lesson-plans.store')}}" data-student-fee-amount="{{$student->feeAmountForInput()}}">
	@csrf
	<input type="hidden" name="student_id" value="{{$student->id}}">

	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'calendar-day'])SCHEDULE</label>

	@select(['placeholder' => 'Location', 'name' => 'location_id', 'grid' => 'col', 'required' => true])
		@foreach($locations as $location)
			@option(['name' => 'location_id', 'label' => $location->name, 'value' => $location->id, 'selected' => old('location_id', $student->location_id) == $location->id, 'data' => ['fee-amount' => $location->feeAmountForInput(), 'is-online' => strtolower($location->name) === 'online' ? 1 : 0]])
		@endforeach
	@endselect
	
	<div class="lesson-plan-meeting-url-field">
		@input(['placeholder' => 'Meeting URL', 'name' => 'meeting_url', 'type' => 'url', 'value' => old('meeting_url')])
	</div>

	<div class="lesson-plan-notes-url-field">
		@input(['placeholder' => 'Notes URL', 'name' => 'notes_url', 'type' => 'url', 'value' => old('notes_url')])
	</div>

	<div class="row"> 
		@select(['placeholder' => 'Weekday', 'name' => 'weekday', 'grid' => 'col', 'required' => true])
			@foreach(weekday() as $day)
				@option(['name' => 'weekday', 'label' => ucfirst($day), 'value' => $loop->iteration, 'selected' => old('weekday') == $loop->iteration])
			@endforeach
		@endselect

		@select(['placeholder' => 'Frequency', 'name' => 'recurrence_interval', 'grid' => 'col', 'required' => true])
			@foreach(['Every week', 'Every other week'] as $frequency)
				@option(['name' => 'recurrence_interval', 'label' => $frequency, 'value' => $loop->iteration, 'selected' => old('recurrence_interval') == $loop->iteration])
			@endforeach
		@endselect
	</div>

	<div class="row"> 
		@input(['placeholder' => 'Starts on', 'name' => 'starts_on', 'type' => 'date', 'value' => old('starts_on'), 'grid' => 'col'])

		@input(['placeholder' => 'Ends on', 'name' => 'ends_on', 'type' => 'date', 'value' => old('ends_on'), 'grid' => 'col'])
	</div>



	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'clock'])TIME</label>

	<div class="row"> 
		@select(['placeholder' => 'Start time', 'name' => 'start_time', 'grid' => 'col', 'required' => true])
			@foreach(timeslots(9, 21, 15) as $time)
				@option(['name' => 'start_time', 'label' => \App\Models\LessonPlan::timeLabel($time), 'value' => $time, 'selected' => old('start_time') == $time])
			@endforeach
		@endselect

		@select(['placeholder' => 'Duration', 'name' => 'duration_minutes', 'grid' => 'col', 'required' => true])
			@foreach([30, 45, 60, 90] as $duration)
				@option(['name' => 'duration_minutes', 'label' => $duration, 'value' => $duration, 'selected' => old('duration_minutes') == $duration])
			@endforeach
		@endselect
	</div>



	<label class="small fw-bold opacity-6 mb-3">@fa(['icon' => 'money-bill-wave'])PAYMENT</label>
	<div class="row"> 
		@input(['placeholder' => 'Fee', 'name' => 'fee_amount', 'value' => old('fee_amount', $student->feeAmountForInput()), 'mask' => 'usd', 'grid' => 'col'])

		@select(['placeholder' => 'Payment method', 'name' => 'payment_method', 'grid' => 'col'])
			@foreach(payment()->methods() as $method)
				@option(['name' => 'payment_method', 'label' => $method, 'value' => $method, 'selected' => old('payment_method', $student->payment_method) == $method])
			@endforeach
		@endselect
	</div>

	@submit(['label' => 'Submit', 'theme' => 'primary'])
</form>
@endmodal

@once
@push('scripts')
<script>
document.addEventListener('change', function(event) {
    const trigger = event.target.closest('select[name="location_id"], select[name="duration_minutes"]');

    if (!trigger) {
        return;
    }

    const form = trigger.closest('form');
    const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
    const durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
    const feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
    const selectedOption = locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
    const studentFee = form ? Number(form.dataset.studentFeeAmount || 0) : 0;
    const hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
    const duration = durationSelect ? Number(durationSelect.value || 0) : 0;

    if (!feeInput) {
        updateLessonPlanMeetingUrlVisibility(form, trigger.matches('select[name="location_id"]'));
        return;
    }

    if (studentFee) {
        feeInput.value = studentFee.toFixed(2).replace(/\\.00$/, '');
        updateLessonPlanMeetingUrlVisibility(form, trigger.matches('select[name="location_id"]'));
        return;
    }

    if (!hourlyFee || !duration) {
        updateLessonPlanMeetingUrlVisibility(form, trigger.matches('select[name="location_id"]'));
        return;
    }

    const proratedFee = hourlyFee * (duration / 60);
    const roundedFee = Math.floor(proratedFee / 5) * 5;

    feeInput.value = roundedFee.toFixed(2).replace(/\\.00$/, '');
    updateLessonPlanMeetingUrlVisibility(form, trigger.matches('select[name="location_id"]'));
});

function updateLessonPlanMeetingUrlVisibility(form, shouldEmpty) {
    const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
    const meetingUrlField = form ? form.querySelector('.lesson-plan-meeting-url-field') : null;
    const notesUrlField = form ? form.querySelector('.lesson-plan-notes-url-field') : null;
    const meetingUrlInput = meetingUrlField ? meetingUrlField.querySelector('input[name="meeting_url"]') : null;
    const notesUrlInput = notesUrlField ? notesUrlField.querySelector('input[name="notes_url"]') : null;
    const selectedOption = locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
    const isOnline = selectedOption && selectedOption.dataset.isOnline === '1';

    if (!meetingUrlField || !meetingUrlInput || !notesUrlField || !notesUrlInput) {
        return;
    }

    meetingUrlField.style.display = isOnline ? '' : 'none';
    notesUrlField.style.display = isOnline ? '' : 'none';
    meetingUrlInput.disabled = !isOnline;
    notesUrlInput.disabled = !isOnline;

    if (!isOnline || shouldEmpty) {
        meetingUrlInput.value = '';
        notesUrlInput.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form').forEach(function(form) {
        if (form.querySelector('select[name="location_id"]') && form.querySelector('input[name="meeting_url"]')) {
            updateLessonPlanMeetingUrlVisibility(form, false);
        }
    });
});
</script>
@endpush
@endonce
