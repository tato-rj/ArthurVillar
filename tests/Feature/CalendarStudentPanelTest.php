<?php

namespace Tests\Feature;

use Tests\BaseTest;
use App\Models\Calendar\{Student, LessonPlan};

class CalendarStudentPanelTest extends BaseTest
{
    public function test_mobile_student_picker_receives_search_options()
    {
        $this->signIn();
        $student = Student::factory()->create();
        $archived = Student::factory()->create(['archived_at' => now()]);

        $response = $this->get(route('calendar.home'))->assertOk();
        $document = new \DOMDocument();
        @$document->loadHTML($response->getContent());
        $xpath = new \DOMXPath($document);
        $options = $xpath->query('//*[@id="calendar-student-offcanvas"]//*[@data-student-combobox-option]');
        $ids = [];
        foreach ($options as $option) {
            $ids[] = $option->getAttribute('data-student-id');
            if ($option->getAttribute('data-student-id') === (string) $student->id) {
                $this->assertSame($student->full_name, $option->getAttribute('data-student-name'));
                $this->assertSame(route('calendar.students.lesson-plans', $student), $option->getAttribute('data-plans-url'));
            }
        }
        $this->assertContains((string) $student->id, $ids);
        $this->assertNotContains((string) $archived->id, $ids);
    }

    public function test_student_panel_orders_current_first_and_includes_inactive_history()
    {
        $this->signIn();
        $student = Student::factory()->create();
        $current = LessonPlan::factory()->student($student)->create([
            'starts_on' => today()->subMonth(), 'ends_on' => today()->addMonth(),
        ]);
        $future = LessonPlan::factory()->student($student)->create([
            'starts_on' => today()->addMonths(2), 'ends_on' => today()->addMonths(3),
        ]);
        $past = LessonPlan::factory()->student($student)->create([
            'starts_on' => today()->subMonths(3), 'ends_on' => today()->subMonths(2),
            'canceled_at' => now(),
        ]);
        $other = LessonPlan::factory()->create();

        $this->get(route('calendar.students.lesson-plans', $student))
            ->assertOk()
            ->assertSee('CURRENT LESSON PLAN')
            ->assertSeeInOrder([
                route('calendar.lesson-plans.edit', $current),
                route('calendar.lesson-plans.edit', $future),
                route('calendar.lesson-plans.edit', $past),
            ], false)
            ->assertDontSee(route('calendar.lesson-plans.edit', $other), false);
    }

    public function test_student_panel_shows_empty_state()
    {
        $this->signIn();
        $student = Student::factory()->create();
        $this->get(route('calendar.students.lesson-plans', $student))
            ->assertOk()->assertSee('No lesson plans registered.');
    }
}
