<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Tests\BaseTest;
use App\Models\{Student, LessonPlan, Lesson};

class CalendarTest extends BaseTest
{
    public function setUp() : void
    {
        parent::setUp();

        $this->student = Student::factory()->create();
    }

    /** @test */
    public function students_with_a_lesson_plan_show_on_the_calendar()
    {
        $date = today()->startOfWeek(Carbon::SUNDAY)->addDays(2);

        LessonPlan::factory()->student($this->student)->create([
            'weekday' => LessonPlan::fromCarbonWeekday($date->dayOfWeek),
            'starts_on' => $date->toDateString(),
        ]);

        $this->signIn();
        
        $this->get(route('studio.home', [
            'view' => 'week',
            'date' => $date->toDateString(),
        ]))->assertOk()->assertSee($this->student->first_name);
    }

    /** @test */
    public function it_only_loads_lesson_plans_that_occur_in_the_visible_calendar_range()
    {
        $visibleStudent = Student::factory()->create(['first_name' => 'Visible']);
        $hiddenStudent = Student::factory()->create(['first_name' => 'Hidden']);

        LessonPlan::factory()->student($visibleStudent)->create([
            'weekday' => 4,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        LessonPlan::factory()->student($hiddenStudent)->create([
            'weekday' => 4,
            'starts_on' => '2026-07-15',
            'recurrence_interval' => 1,
        ]);

        $this->signIn();

        $this->get(route('studio.home', [
            'view' => 'week',
            'date' => '2026-07-08',
        ]))
            ->assertOk()
            ->assertSee('Visible')
            ->assertDontSee('Hidden');
    }

    /** @test */
    public function it_marks_confirmed_lesson_occurrences_with_their_status()
    {
        $lessonPlan = LessonPlan::factory()->student($this->student)->create([
            'weekday' => 4,
            'start_time' => '14:15',
            'duration_minutes' => 30,
            'fee_amount' => 4500,
            'starts_on' => '2026-07-01',
            'recurrence_interval' => 1,
        ]);

        $lesson = Lesson::factory()->lessonPlan($lessonPlan)->create([
            'starts_at' => '2026-07-08 14:15:00',
            'ends_at' => '2026-07-08 14:45:00',
            'paid_at' => null,
        ]);

        $this->signIn();

        $this->getJson(route('studio.home', [
            'view' => 'week',
            'date' => '2026-07-08',
            'lesson_plans' => 1,
        ]))
            ->assertOk()
            ->assertJsonPath('plannedLessons.0.occurrences.0.date', '2026-07-08')
            ->assertJsonPath('plannedLessons.0.occurrences.0.start', '14:15')
            ->assertJsonPath('plannedLessons.0.occurrences.0.lesson_id', $lesson->id)
            ->assertJsonPath('plannedLessons.0.occurrences.0.lesson_status', 'unpaid')
            ->assertJsonPath('plannedLessons.0.occurrences.0.fee_amount', 4500)
            ->assertJsonPath('plannedLessons.0.occurrences.0.lesson_payment_url', $lesson->paymentUrl);
    }

    /** @test */
    public function it_loads_a_bounded_range_for_the_schedule_view()
    {
        $this->signIn();

        $this->getJson(route('studio.home', [
            'view' => 'schedule',
            'date' => '2026-07-05',
            'lesson_plans' => 1,
        ]))
            ->assertOk()
            ->assertJsonPath('calendarRange.view', 'schedule')
            ->assertJsonPath('calendarRange.date', '2026-07-05')
            ->assertJsonPath('calendarRange.start', '2026-06-01')
            ->assertJsonPath('calendarRange.end', '2026-11-30');
    }
}
