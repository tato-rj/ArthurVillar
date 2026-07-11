<div class="studio-calendar-create-menu" data-calendar-create-menu>
	<button type="button" class="studio-calendar-create-menu-option" data-calendar-create-single>
		@fa(['icon' => 'calendar-day', 'mr' => 2])
		Single Lesson
	</button>

	<button type="button" class="studio-calendar-create-menu-option" data-calendar-create-recurring>
		@fa(['icon' => 'repeat', 'mr' => 2])
		Recurring Lesson
	</button>
</div>

<button type="button" class="btn-raw single-lesson-plan-create" data-calendar-create-toggle aria-label="Create lesson">
	@fa(['icon' => 'plus', 'mr' => 0])
</button>

@include('studio.singleLessonPlans.create')
@include('studio.lessonPlans.calendar-create')
