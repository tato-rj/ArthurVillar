<?php

namespace Tests\Feature;

use Tests\BaseTest;
use App\Models\{Lesson, LessonPlan, Location};

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
