		<div class="studio-calendar-filter dropdown">
			<button type="button" class="btn-raw studio-calendar-filter-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" aria-label="Filter calendar">
				@fa(['icon' => 'filter', 'mr' => 0, 'fa_color' => 'black'])
			</button>
			<div class="dropdown-menu dropdown-menu-end studio-calendar-filter-menu p-3">
				<div class="small fw-bold opacity-4 mb-2">LOCATIONS</div>
				<div data-calendar-location-filters></div>

				<div class="small fw-bold opacity-4 mt-3 mb-2">EVENT TYPE</div>
				<div data-calendar-event-type-filters>
					<div class="form-check studio-calendar-filter-option">
						<input class="form-check-input" type="checkbox" id="calendar-event-type-recurring" value="recurring" data-calendar-event-type-filter checked>
						<label class="form-check-label" for="calendar-event-type-recurring">Recurring lessons</label>
					</div>
					<div class="form-check studio-calendar-filter-option">
						<input class="form-check-input" type="checkbox" id="calendar-event-type-single" value="single" data-calendar-event-type-filter checked>
						<label class="form-check-label" for="calendar-event-type-single">Single lessons</label>
					</div>
					<div class="form-check studio-calendar-filter-option">
						<input class="form-check-input" type="checkbox" id="calendar-event-type-general" value="general" data-calendar-event-type-filter checked>
						<label class="form-check-label" for="calendar-event-type-general">General events</label>
					</div>
				</div>
			</div>
		</div>
