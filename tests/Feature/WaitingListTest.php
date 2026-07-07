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
