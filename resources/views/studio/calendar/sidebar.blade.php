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

	<div id="studio-calendar-payments" class="mt-3">
		<div class="text-center">
			<div class="pb-4 mb-4 border-bottom">
				<div class="opacity-4">
					<h3 class="m-0" data-calendar-expected-payment>$0</h3>
					<label class="small fw-bold">EXPECTED</label>
				</div>
			</div>
			<div class="px-4">
				<div class="">
					<h3 class="m-0" data-calendar-confirmed-payment>$0</h3>
					<label class="small text-green fw-bold">CONFIRMED</label>
				</div>
			</div>
		</div>
	</div>
</aside>
