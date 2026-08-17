<div class="calendar-calendar-create-menu" data-calendar-create-menu>
	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-student>
		@fa(['icon' => 'user-plus', 'mr' => 2])
		Add a student
	</button>

	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-lesson>
		@fa(['icon' => 'calendar-day', 'mr' => 2])
		Create a lesson
	</button>

	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-event>
		@fa(['icon' => 'thumbtack', 'mr' => 2])
		Create an event
	</button>
</div>

<button type="button" class="btn-raw single-lesson-plan-create" data-calendar-create-toggle aria-label="Create lesson">
	@fa(['icon' => 'plus', 'mr' => 0])
</button>

@include('calendar.lessons.lessonPlans.create')
@include('calendar.events.create')
@include('calendar.students.create')
