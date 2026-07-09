<aside class="studio-calendar-sidebar" aria-label="Calendar sidebar">
	<div class="studio-mini-calendar" data-mini-calendar>
		<div class="studio-mini-calendar-header">
			<button type="button" class="studio-mini-calendar-nav" data-mini-prev aria-label="Previous month">
				<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
			</button>
			<h2 data-mini-label></h2>
			<button type="button" class="studio-mini-calendar-nav" data-mini-next aria-label="Next month">
				<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
			</button>
		</div>

		<div class="studio-mini-calendar-weekdays" aria-hidden="true">
			<span>S</span>
			<span>M</span>
			<span>T</span>
			<span>W</span>
			<span>T</span>
			<span>F</span>
			<span>S</span>
		</div>

		<div class="studio-mini-calendar-grid" data-mini-grid></div>
	</div>

{{-- 	<label class="studio-calendar-search rounded">
		@fa(['icon' => 'user-group', 'mr' => 0])
		<span class="sr-only">Search for people</span>
		<input type="search" name="search" placeholder="Search for people">
	</label> --}}

	<div data-calendar-insights-sidebar-target></div>

	<div id="studio-calendar-insights" class="">
		<div class="mb-3">
			<h5 class="m-0" data-calendar-lessons-count>0</h5>
			<label class="small">LESSONS</label>
		</div>
		<div class="mb-3">
			<h5 class="m-0" data-calendar-hours-count>0h</h5>
			<label class="small">HOURS</label>
		</div>
		<div class="mb-3">
			<div class="d-flex align-items-center">
				<h5 class="m-0" data-calendar-confirmed-payment>$0</h5>
				<span class="small fw-bold mx-2 opacity-4">/</span>
				<p class="m-0 opacity-4" data-calendar-expected-payment>$0</p>
			</div>
			<label class="small">INCOME</label>
		</div>
	</div>
</aside>
