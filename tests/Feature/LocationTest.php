<?php

namespace Tests\Feature;

use Tests\BaseTest;
use Carbon\Carbon;
use App\Models\{Lesson, LessonPlan, Location, Student};

class LocationTest extends BaseTest
{
    /** @test */
    public function it_serves_locations_to_the_studio_table()
    {
        Location::factory()->create([
            'name' => 'BKCM',
            'fee_amount' => 6000,
            'tax_withheld_percentage' => 30,
            'is_active' => true,
        ]);

        $this->signIn();

        $this
            ->getJson(route('studio.tables.locations'))
            ->assertOk()
            ->assertJsonFragment([
                'name' => 'BKCM',
                'fee_amount' => 6000,
            ]);
    }

    /** @test */
    public function it_includes_current_lesson_plan_info_for_location_rows()
    {
        Carbon::setTestNow('2026-07-08 12:00:00');

        $location = Location::factory()->create([
            'name' => 'BKCM',
            'tax_withheld_percentage' => 20,
        ]);
        $otherLocation = Location::factory()->create();
        $maria = Student::factory()->create([
            'first_name' => 'Maria',
            'last_name' => 'Silva',
        ]);
        $john = Student::factory()->create([
            'first_name' => 'John',
            'last_name' => 'Stone',
        ]);

        LessonPlan::factory()->student($maria)->create([
            'location_id' => $location->id,
            'weekday' => 3,
            'start_time' => '15:00',
            'duration_minutes' => 60,
            'fee_amount' => 6000,
            'recurrence_interval' => 1,
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-08-01',
            'status' => 'active',
        ]);
        LessonPlan::factory()->student($john)->create([
            'location_id' => $location->id,
            'weekday' => 5,
            'start_time' => '16:00',
            'duration_minutes' => 30,
            'fee_amount' => 3000,
            'recurrence_interval' => 2,
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-08-01',
            'status' => 'active',
        ]);
        LessonPlan::factory()->create([
            'location_id' => $location->id,
            'starts_on' => null,
            'ends_on' => null,
            'fee_amount' => 10000,
            'status' => 'active',
        ]);
        LessonPlan::factory()->create([
            'location_id' => $otherLocation->id,
            'starts_on' => '2026-07-01',
            'ends_on' => '2026-08-01',
            'fee_amount' => 10000,
            'status' => 'active',
        ]);

        $this->signIn();

        $row = collect($this->getJson(route('studio.tables.locations'))->assertOk()->json('data'))
            ->firstWhere('id', $location->id);

        $this->assertSame(2, $row['info']['students_count']);
        $this->assertSame(2, $row['info']['lesson_plans_count']);
        $this->assertEquals(45, $row['info']['average_lesson_length']);
        $this->assertEquals(4500, $row['info']['average_lesson_fee']);
        $this->assertSame(7500, $row['info']['weekly_gross_income']);
        $this->assertSame(6000, $row['info']['weekly_net_income']);
        $this->assertSame(1500, $row['info']['weekly_tax_withheld']);
        $this->assertSame(['Maria Silva', 'John Stone'], collect($row['info']['students'])->pluck('name')->all());

        Carbon::setTestNow();
    }

    /** @test */
    public function it_stores_a_default_fee_amount_for_a_location()
    {
        $this->signIn();

        $this
            ->post(route('studio.locations.store'), [
                'name' => 'Home',
                'fee_amount' => '75',
                'tax_withheld_percentage' => 0,
                'is_active' => 1,
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('locations', [
            'name' => 'Home',
            'fee_amount' => 7500,
        ]);
    }

    /** @test */
    public function it_discounts_confirmed_lesson_payments_by_location_tax_withheld_percentage()
    {
        $location = Location::factory()->create([
            'tax_withheld_percentage' => 25,
        ]);
        $lessonPlan = LessonPlan::factory()->create([
            'location_id' => $location->id,
            'fee_amount' => 10000,
            'payment_method' => 'Venmo',
        ]);
        $lesson = Lesson::factory()->lessonPlan($lessonPlan)->create();

        $this->signIn();

        $this->postJson(route('studio.lessons.payment.store', $lesson))->assertOk();

        $this->assertDatabaseHas('lessons', [
            'id' => $lesson->id,
            'fee_amount' => 7500,
            'payment_method' => 'Venmo',
        ]);
    }
}
