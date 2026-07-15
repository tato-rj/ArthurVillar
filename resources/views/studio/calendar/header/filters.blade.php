		<div class="studio-calendar-filter dropdown">
			<button type="button" class="btn-raw studio-calendar-filter-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" aria-label="Filter calendar">
				@fa(['icon' => 'filter', 'mr' => 0, 'fa_size' => 'lg', 'fa_color' => 'black'])
			</button>
			<div class="dropdown-menu dropdown-menu-end studio-calendar-filter-menu p-3">
				<div class="small fw-bold opacity-4 mb-2">LOCATIONS</div>
				<div data-calendar-location-filters></div>

				<div class="small fw-bold opacity-4 mt-3 mb-2">EVENT TYPE</div>
				<div data-calendar-event-type-filters>
					<label class="studio-calendar-filter-option" for="calendar-event-type-recurring">
						<input type="checkbox" id="calendar-event-type-recurring" value="recurring" data-calendar-event-type-filter checked>
						<span>Recurring lessons</span>
					</label>
					<label class="studio-calendar-filter-option" for="calendar-event-type-single">
						<input type="checkbox" id="calendar-event-type-single" value="single" data-calendar-event-type-filter checked>
						<span>Single lessons</span>
					</label>
					<label class="studio-calendar-filter-option" for="calendar-event-type-general">
						<input type="checkbox" id="calendar-event-type-general" value="general" data-calendar-event-type-filter checked>
						<span>General events</span>
					</label>
				</div>
			</div>
		</div>
