	<div class="calendar-calendar-toolbar" aria-label="Calendar controls">
		<div class="calendar-calendar-toolbar-track">
			<div class="calendar-calendar-toolbar-pane calendar-calendar-toolbar-pane-controls">
				<div class="calendar-calendar-view-offcanvas-control">
					<button data-bs-toggle="offcanvas" href="#calendar-offcanvas-views" class="btn btn-raw calendar-calendar-icon-button calendar-calendar-header-control">
						@fa(['icon' => 'ellipsis-vertical', 'mr' => 0, 'fa_size' => 'xl'])
					</button>
				</div>

				@include('calendar.calendar.header.today')
				@include('calendar.calendar.header.controls')
				@include('calendar.calendar.header.views')

				<button type="button" class="btn-raw calendar-calendar-icon-button calendar-calendar-header-control calendar-calendar-toolbar-toggle" data-calendar-mobile-toolbar-settings aria-label="Show calendar tools">
					@fa(['icon' => 'arrow-right-to-bracket', 'mr' => 0])
				</button>
			</div>

			<div class="calendar-calendar-toolbar-pane calendar-calendar-toolbar-pane-settings">
				<button type="button" class="btn-raw calendar-calendar-icon-button calendar-calendar-header-control calendar-calendar-toolbar-toggle calendar-calendar-toolbar-toggle-back" data-calendar-mobile-toolbar-controls aria-label="Show calendar controls">
					@fa(['icon' => 'arrow-right-to-bracket', 'mr' => 0])
				</button>

				<div class="d-flex align-items-center w-100 justify-content-end calendar-calendar-toolbar-tools">
					@include('calendar.calendar.header.search')
					@include('calendar.calendar.header.filters')
					@include('calendar.calendar.header.settings')
					@include('calendar.calendar.header.google')
				</div>
			</div>
		</div>
	</div>
