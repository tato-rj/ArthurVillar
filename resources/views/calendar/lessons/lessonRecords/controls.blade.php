<div id="lesson-controls" class="mt-3">
	<button id="early-payment" data-url="{{route('calendar.lessons.early-payments.store')}}" type="button" class="btn btn-outline-green w-100 mb-2">
		@icon('banknote')Early payment
	</button>

	<div id="lesson-schedule-controls" class="d-flex">
		<button id="cancel-lesson-button" type="button" class="btn-raw py-2 w-100 mr-1"><span data-cancel-label>Cancel</span><span data-manage-label>Manage lesson dates</span></button>
		<button id="reschedule-lesson-button" type="button" class="btn-raw py-2 text-red w-100 ml-1">Reschedule</button>
	</div>
</div>
