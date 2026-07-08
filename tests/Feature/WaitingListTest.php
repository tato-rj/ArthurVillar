<?php

namespace Tests\Feature;

use Tests\BaseTest;
use App\Models\{Student, WaitingList};

class WaitingListTest extends BaseTest
{
    /** @test */
    public function it_converts_a_waiting_list_entry_into_a_student()
    {
        $waitingList = WaitingList::factory()->create([
            'first_name' => 'Nora',
            'last_name' => 'Stone',
            'parent_name' => 'Morgan Stone',
            'email' => 'morgan@example.com',
            'phone' => '555-123-4567',
            'is_adult' => false,
            'notes' => 'Prefers Saturdays.',
        ]);

        $this->signIn();

        $this
            ->post(route('studio.waiting-list.convert', $waitingList))
            ->assertRedirect(route('studio.students.index'))
            ->assertSessionHas('success', 'Nora was successfully converted into a student');

        $this->assertDatabaseMissing('waiting_lists', [
            'id' => $waitingList->id,
        ]);

        $this->assertDatabaseHas('students', [
            'first_name' => 'Nora',
            'last_name' => 'Stone',
            'parent_name' => 'Morgan Stone',
            'email' => 'morgan@example.com',
            'phone' => '555-123-4567',
            'is_adult' => false,
            'notes' => 'Prefers Saturdays.',
        ]);
    }

    /** @test */
    public function creating_a_student_from_the_waiting_list_removes_the_waiting_list_entry()
    {
        $waitingList = WaitingList::factory()->create([
            'first_name' => 'Lia',
            'last_name' => 'Mason',
            'parent_name' => 'Dana Mason',
            'email' => 'dana@example.com',
            'phone' => '555-222-3333',
            'is_adult' => true,
            'notes' => 'Available after 5pm.',
        ]);

        $this->signIn();

        $this->from(route('studio.waiting-list.index'))
            ->post(route('studio.students.store'), [
                'waiting_list_id' => $waitingList->id,
                'first_name' => 'Lia',
                'last_name' => 'Mason',
                'gender' => 'female',
                'parent_name' => 'Dana Mason',
                'email' => 'dana@example.com',
                'phone' => '555-222-3333',
                'is_adult' => true,
                'notes' => 'Available after 5pm.',
            ])
            ->assertRedirect(route('studio.waiting-list.index'))
            ->assertSessionHas('success', 'The student was successfully added');

        $this->assertDatabaseMissing('waiting_lists', [
            'id' => $waitingList->id,
        ]);

        $this->assertDatabaseHas('students', [
            'first_name' => 'Lia',
            'last_name' => 'Mason',
            'gender' => 'female',
            'parent_name' => 'Dana Mason',
            'email' => 'dana@example.com',
            'phone' => '555-222-3333',
            'is_adult' => true,
            'notes' => 'Available after 5pm.',
        ]);
    }

    /** @test */
    public function it_serves_waiting_list_entries_to_the_studio_table()
    {
        WaitingList::factory()->create([
            'first_name' => 'Lia',
            'last_name' => 'Mason',
            'notes' => 'Needs evening lessons.',
        ]);

        $this->signIn();

        $this
            ->getJson(route('studio.tables.waiting-list'))
            ->assertOk()
            ->assertJsonFragment([
                'first_name' => 'Lia',
                'last_name' => 'Mason',
                'notes' => 'Needs evening lessons.',
            ]);
    }
}
