<div class="calendar-calendar-create-menu" data-calendar-create-menu>
	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-student>
		@icon('user-plus', ['mr' => 2])
		Add a student
	</button>

	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-lesson>
		@icon('calendar-1', ['mr' => 2])
		Create a lesson
	</button>

	<button type="button" class="calendar-calendar-create-menu-option" data-calendar-create-event>
		@icon('pin', ['mr' => 2])
		Create an event
	</button>
</div>

<button type="button" class="btn-raw single-lesson-plan-create" data-calendar-create-toggle aria-label="Create lesson">
	@icon('plus', ['mr' => 0])
</button>

@include('calendar.lessons.lessonPlans.create')
@include('calendar.events.create')
@include('calendar.students.create')
