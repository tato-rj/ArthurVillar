	<div class="calendar-calendar-toolbar" aria-label="Calendar controls">
		<div class="calendar-calendar-view-offcanvas-control">
			<button data-bs-toggle="offcanvas" href="#calendar-offcanvas-views" class="btn btn-raw px-2">
				@fa(['icon' => 'ellipsis-vertical', 'mr' => 0, 'fa_size' => 'xl'])
			</button>	
		</div>

		@include('calendar.calendar.header.today')
		@include('calendar.calendar.header.controls')
		@include('calendar.calendar.header.views')
		<div class="d-flex align-items-center w-100 justify-content-end">
			@include('calendar.calendar.header.search')
			@include('calendar.calendar.header.filters')
			@include('calendar.calendar.header.settings')
			@include('calendar.calendar.header.google')
		</div>
	</div>
