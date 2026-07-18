<?php

namespace Tests\Unit;

use Tests\BaseTest;
use App\Models\Calendar\{Student, LessonPlan, Lesson};

class LessonTest extends BaseTest
{
    public function setUp() : void
    {
        parent::setUp();

        $this->lesson = Lesson::factory()->create();
    }

    /** @test */
    public function a_lesson_belongs_to_a_student()
    {
        $this->assertInstanceOf(Student::class, $this->lesson->student);
    }

    /** @test */
    public function a_lesson_belongs_to_a_lesson_plan()
    {
        $this->assertInstanceOf(LessonPlan::class, $this->lesson->lessonPlan);
    }

    /** @test */
    public function it_queries_lessons_that_start_inside_a_date_range()
    {
        $visible = Lesson::factory()->create([
            'starts_at' => '2026-07-08 14:00:00',
            'ends_at' => '2026-07-08 14:30:00',
        ]);

        $hidden = Lesson::factory()->create([
            'starts_at' => '2026-07-15 14:00:00',
            'ends_at' => '2026-07-15 14:30:00',
        ]);

        $lessons = Lesson::startingBetween('2026-07-08', '2026-07-08')->pluck('id');

        $this->assertTrue($lessons->contains($visible->id));
        $this->assertFalse($lessons->contains($hidden->id));
    }
}
