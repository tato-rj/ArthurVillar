	<div class="studio-calendar-toolbar" aria-label="Calendar controls">
		<div class="studio-calendar-view-offcanvas-control">
			<button data-bs-toggle="offcanvas" href="#calendar-offcanvas-views" class="btn btn-raw px-2">
				@fa(['icon' => 'ellipsis-vertical', 'mr' => 0, 'fa_size' => 'xl'])
			</button>	
		</div>

		@include('studio.calendar.header.today')
		@include('studio.calendar.header.controls')
		@include('studio.calendar.header.views')
		<div class="d-flex align-items-center w-100 justify-content-end">
			@include('studio.calendar.header.search')
			@include('studio.calendar.header.filters')
			@include('studio.calendar.header.settings')
		</div>
	</div>
