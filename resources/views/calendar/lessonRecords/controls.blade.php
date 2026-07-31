<div id="lesson-controls" class="mt-3">
	<button id="early-payment" data-url="{{route('calendar.lessons.early-payments.store')}}" type="button" class="btn btn-outline-green w-100 mb-2">
		@fa(['icon' => 'money-bill-wave'])Early payment
	</button>

	<div class="d-flex">
		<button id="cancel-lesson-button" type="button" class="btn btn-outline-dark w-100 mr-1">Cancel</button>
		<button id="reschedule-lesson-button" type="button" class="btn btn-outline-red w-100 ml-1">Reschedule</button>
	</div>
</div>
