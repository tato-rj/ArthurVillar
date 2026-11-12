<div id="lesson-primary-controls" class="mt-3">
	<button id="confirm-payment" data-url type="button" class="btn btn-primary w-100">
		@fa(['icon' => 'money-bill-wave'])Confirm payment
	</button>

	<div id="lesson-attendance">
		<button id="lesson-taught" data-url="{{route('calendar.lessons.store')}}" type="button" class="btn btn-primary w-100">
			@fa(['icon' => 'calendar-check'])Lesson taught
		</button>
		<small id="lesson-confirm-hold-hint" class="d-block text-center text-muted mt-2" hidden>Hold for 2 seconds to confirm lesson and payment</small>
	</div>
</div>
