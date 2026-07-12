<?php

namespace Tests\Feature;

use App\Models\Student;
use Tests\BaseTest;

class StudentsTableTest extends BaseTest
{
    /** @test */
    public function it_requires_a_valid_gender_when_creating_a_student()
    {
        $this->signIn();

        $this->from(route('studio.students.index'))
            ->post(route('studio.students.store'), [
                'first_name' => 'Nora',
                'last_name' => 'Stone',
                'email' => 'nora@example.com',
            ])
            ->assertRedirect(route('studio.students.index'))
            ->assertSessionHasErrors('gender');

        $this->from(route('studio.students.index'))
            ->post(route('studio.students.store'), [
                'first_name' => 'Nora',
                'last_name' => 'Stone',
                'gender' => 'female',
                'email' => 'nora@example.com',
            ])
            ->assertRedirect(route('studio.students.index'));

        $this->assertDatabaseHas('students', [
            'first_name' => 'Nora',
            'last_name' => 'Stone',
            'gender' => 'female',
        ]);
    }

    /** @test */
    public function it_can_search_students_by_adult_status_without_showing_an_adult_column()
    {
        Student::factory()->create([
            'first_name' => 'Adult',
            'last_name' => 'Student',
            'gender' => 'female',
            'is_adult' => true,
        ]);
        Student::factory()->create([
            'first_name' => 'Young',
            'last_name' => 'Student',
            'gender' => 'male',
            'is_adult' => false,
        ]);

        $this->signIn();

        $this->getJson(route('studio.tables.students', [
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => [
                'value' => 'adult',
                'regex' => 'false',
            ],
            'columns' => $this->studentTableColumns(),
        ]))
            ->assertOk()
            ->assertJsonFragment(['first_name' => 'Adult'])
            ->assertJsonMissing(['first_name' => 'Young']);
    }

    /** @test */
    public function it_uses_a_stable_tie_breaker_when_many_sorted_rows_share_the_same_value()
    {
        $students = collect(range(1, 6))->map(function ($number) {
            return Student::factory()->create([
                'first_name' => "Student {$number}",
                'last_name' => 'Same',
                'gender' => 'female',
            ]);
        });

        $this->signIn();

        $rows = $this->json('GET', route('studio.tables.students'), $this->studentTableRequest([
            'start' => 0,
            'length' => 6,
            'order' => [
                ['column' => 2, 'dir' => 'asc'],
            ],
        ]))->assertOk()->json('data');

        $this->assertSame($students->pluck('id')->all(), collect($rows)->pluck('id')->all());
    }

    private function studentTableColumns(): array
    {
        return collect([
            'first_name',
            'last_name',
            'gender',
            'age',
            'location',
            'is_adult',
            'actions',
        ])->map(function ($name) {
            return [
                'data' => $name === 'actions' ? 'id' : $name,
                'name' => $name,
                'searchable' => $name === 'actions' ? 'false' : 'true',
                'orderable' => $name === 'actions' ? 'false' : 'true',
                'search' => [
                    'value' => '',
                    'regex' => 'false',
                ],
            ];
        })->all();
    }

    private function studentTableRequest(array $overrides = []): array
    {
        return array_replace_recursive([
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => [
                'value' => '',
                'regex' => 'false',
            ],
            'columns' => $this->studentTableColumns(),
        ], $overrides);
    }
}
