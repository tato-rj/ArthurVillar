		<div class="calendar-calendar-filter dropdown">
			<button type="button" class="btn-raw calendar-calendar-filter-toggle px-2" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" aria-label="Filter calendar">
				@fa(['icon' => 'filter', 'mr' => 0, 'fa_color' => 'black'])
			</button>
			<div class="dropdown-menu dropdown-menu-end calendar-calendar-filter-menu p-3">
				<div class="d-flex align-items-center justify-content-between mb-2">
					<div class="small fw-bold opacity-4">LOCATIONS</div>
					<button type="button" class="btn-raw btn-sm py-0 px-2" data-calendar-filter-reset disabled>@fa(['icon' => 'rotate-right', 'mr' => 0])</button>
				</div>
				<div data-calendar-location-filters></div>

				<div class="small fw-bold opacity-4 mt-3 mb-2">SHOW</div>
				<div data-calendar-event-type-filters>
					<div class="form-check calendar-calendar-filter-option">
						<input class="form-check-input" type="checkbox" id="calendar-event-type-recurring" value="recurring" data-calendar-event-type-filter checked>
						<label class="form-check-label" for="calendar-event-type-recurring">Recurring lessons</label>
					</div>
					<div class="form-check calendar-calendar-filter-option">
						<input class="form-check-input" type="checkbox" id="calendar-event-type-single" value="single" data-calendar-event-type-filter checked>
						<label class="form-check-label" for="calendar-event-type-single">Single lessons</label>
					</div>
					<div class="form-check calendar-calendar-filter-option">
						<input class="form-check-input" type="checkbox" id="calendar-event-type-general" value="general" data-calendar-event-type-filter checked>
						<label class="form-check-label" for="calendar-event-type-general">General events</label>
					</div>
					<div class="form-check calendar-calendar-filter-option">
						<input class="form-check-input" type="checkbox" id="calendar-event-type-canceled" value="canceled" data-calendar-event-type-filter>
						<label class="form-check-label" for="calendar-event-type-canceled">Cancelations</label>
					</div>
				</div>
			</div>
		</div>
