<div class="calendar-calendar-create-menu" data-calendar-create-menu>
	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-lesson>
		@fa(['icon' => 'calendar-day', 'mr' => 2])
		Lesson
	</button>

	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-event>
		@fa(['icon' => 'thumbtack', 'mr' => 2])
		General Event
	</button>
</div>

<button type="button" class="btn-raw single-lesson-plan-create" data-calendar-create-toggle aria-label="Create lesson">
	@fa(['icon' => 'plus', 'mr' => 0])
</button>

@include('calendar.lessonPlans.create')
@include('calendar.events.create')
