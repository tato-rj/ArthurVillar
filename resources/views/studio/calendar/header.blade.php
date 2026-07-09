	<div class="studio-calendar-toolbar" aria-label="Calendar controls">
		<div class="studio-calendar-view-offcanvas-control">
			<button data-bs-toggle="offcanvas" href="#calendar-offcanvas-views" class="btn btn-raw px-2">
				@fa(['icon' => 'ellipsis-vertical', 'mr' => 0, 'fa_size' => 'xl'])
			</button>	
		</div>


		<div class="studio-calendar-toolbar-today" style="flex: 0 0 auto;">
			<button type="button" class="btn btn-white studio-calendar-today" data-calendar-today>
				Today
			</button>
		</div>

		<div class="flex-grow-1 d-flex align-items-center studio-calendar-toolbar-controls">
			<div class="studio-calendar-nav mr-2" aria-label="Calendar navigation">
				<button type="button" class="studio-calendar-icon-button" data-calendar-prev aria-label="Previous">
					<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
				</button>
				<button type="button" class="studio-calendar-icon-button" data-calendar-next aria-label="Next">
					<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
				</button>
			</div>

			<h4 class="studio-calendar-label" data-calendar-label></h4>
		</div>

		<div class="studio-calendar-toolbar-views" style="flex: 0 0 auto;">
			<label class="studio-calendar-view">
				<span class="sr-only">Calendar view</span>
				<select data-calendar-view>
					<option value="schedule">Schedule</option>
					<option value="day">Day</option>
					<option value="3-days">3 Days</option>
					<option value="week" selected>Week</option>
					<option value="month">Month</option>
				</select>
				<i class="fa-solid fa-caret-down" aria-hidden="true"></i>
			</label>
		</div>

		<div class="studio-calendar-toolbar-search studio-calendar-search rounded">
			<button type="button" class="btn-raw px-2" data-calendar-search-toggle aria-label="Search">
				@fa(['icon' => 'magnifying-glass', 'mr' => 0, 'fa_size' => 'lg', 'fa_color' => 'black'])
			</button>
			<input type="search" name="search" placeholder="Search for people">
			<button type="button" class="btn-raw px-2 studio-calendar-search-clear" data-calendar-search-clear aria-label="Clear search">
				@fa(['icon' => 'xmark', 'mr' => 0])
			</button>
		</div>

		<div class="studio-calendar-filter dropdown">
			<button type="button" class="btn-raw px-2 studio-calendar-filter-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" aria-label="Filter calendar">
				@fa(['icon' => 'filter', 'mr' => 0, 'fa_size' => 'lg', 'fa_color' => 'black'])
			</button>
			<div class="dropdown-menu dropdown-menu-end studio-calendar-filter-menu p-3">
				<div class="small fw-bold opacity-4 mb-2">LOCATIONS</div>
				<div data-calendar-location-filters></div>
			</div>
		</div>
	</div>
