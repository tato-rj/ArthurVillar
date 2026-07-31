<div id="lesson-primary-controls" class="mt-3">
	<button id="confirm-payment" data-url type="button" class="btn btn-primary w-100">
		@fa(['icon' => 'money-bill-wave'])Confirm payment
	</button>

	<div id="lesson-attendance">
		<button id="lesson-taught" data-url="{{route('calendar.lessons.store')}}" type="button" class="btn btn-primary w-100 mb-2">
			@fa(['icon' => 'calendar-check'])Lesson taught
		</button>
	</div>
</div>
