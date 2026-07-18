<div id="lesson-controls" class="mt-3">
	<button id="confirm-payment" data-url class="btn btn-primary w-100">
		@fa(['icon' => 'money-bill-wave'])Confirm payment
	</button>

	<button id="early-payment" data-url="{{route('calendar.lessons.early-payments.store')}}" type="button" class="btn btn-outline-green w-100 mb-2">
		@fa(['icon' => 'money-bill-wave'])Early payment
	</button>

	<div id="lesson-attendance" class="">
		<button id="lesson-taught" data-url="{{route('calendar.lessons.store')}}" class="btn btn-primary w-100 mb-2">@fa(['icon' => 'calendar-check'])Lesson taught
		</button>
		
		<div class="d-flex">
			<button id="cancel-lesson-button" class="btn btn-outline-dark w-100 mr-1">Cancel</button>
			<button id="reschedule-lesson-button" class="btn btn-outline-red w-100 ml-1">Reschedule</button>
		</div>
	</div>
</div>
