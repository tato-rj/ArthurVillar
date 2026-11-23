<div>
	<button
		type="button"
		class="btn-raw mini-calendar-show"
		data-bs-toggle="offcanvas"
		data-bs-target="#calendar-mini-calendar-offcanvas"
		aria-controls="calendar-mini-calendar-offcanvas"
		aria-label="Show mini calendar"
	>
		@icon('calendar-days', ['mr' => 0])
	</button>

	<div
		class="offcanvas offcanvas-bottom calendar-mini-calendar-offcanvas"
		tabindex="-1"
		id="calendar-mini-calendar-offcanvas"
		aria-label="Mini calendar"
	>
		<div class="offcanvas-body py-4">
			@include('calendar.calendar.sidebar.mini-calendar')
		</div>
	</div>
</div>
