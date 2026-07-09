<div class="studio-calendar-main">
	<div class="studio-calendar-toolbar" aria-label="Calendar controls">

		<div class="btn-group">
			<button type="button" class="studio-calendar-icon-button" data-calendar-prev aria-label="Previous">
				<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
			</button>
			<button type="button" class="btn btn-white btn-wide studio-calendar-today" data-calendar-today>
				Today
			</button>
			<button type="button" class="studio-calendar-icon-button" data-calendar-next aria-label="Next">
				<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
			</button>
		</div>

{{-- 		<div class="studio-calendar-toolbar-today" style="flex: 0 0 auto;">
			<button type="button" class="btn btn-white btn-wide studio-calendar-today" data-calendar-today>
				Today
			</button>
		</div> --}}

{{-- 		<div class="flex-grow-1 d-flex align-items-center studio-calendar-toolbar-controls">
			<div class="studio-calendar-nav mr-2" aria-label="Calendar navigation">
				<button type="button" class="studio-calendar-icon-button" data-calendar-prev aria-label="Previous">
					<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
				</button>
				<button type="button" class="studio-calendar-icon-button" data-calendar-next aria-label="Next">
					<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
				</button>
			</div>

			<h4 class="studio-calendar-label" data-calendar-label></h4>
		</div> --}}

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
	</div>

	<div id="calendar"></div>
</div>
