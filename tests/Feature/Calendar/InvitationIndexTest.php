<?php

namespace Tests\Feature\Calendar;

use App\Models\Calendar\Invitation;
use App\Models\Calendar\InvitationOption;
use App\Models\Calendar\InvitationParticipant;
use App\Models\Calendar\InvitationVote;
use Tests\BaseTest;

class InvitationIndexTest extends BaseTest
{
    /** @test */
    public function it_displays_the_invitation_index_with_a_link_to_create_an_invitation()
    {
        $this->signIn();

        $this->get(route('calendar.invitations.index'))
            ->assertOk()
            ->assertSee('Invitations')
            ->assertSee(route('calendar.invitations.create'), false)
            ->assertSee('New invitation')
            ->assertSee('Copy public link')
            ->assertSee('View responses')
            ->assertSee('No responses yet')
            ->assertSee('Delete invitation');
    }

    /** @test */
    public function it_returns_invitations_for_the_calendar_table()
    {
        $invitation = Invitation::factory()->create([
            'title' => 'Planning session',
            'duration_minutes' => 45,
        ]);

        InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-01 14:00:00',
        ]);
        InvitationParticipant::create([
            'invitation_id' => $invitation->id,
            'name' => 'First guest',
        ]);
        InvitationParticipant::create([
            'invitation_id' => $invitation->id,
            'name' => 'Second guest',
        ]);

        $this->signIn();

        $response = $this->getJson(route('calendar.tables.invitations', [
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'search' => ['value' => '', 'regex' => 'false'],
            'order' => [['column' => 0, 'dir' => 'desc']],
            'columns' => collect([
                'created_at',
                'title',
                'duration_minutes',
                'options_count',
                'participants_count',
                'actions',
            ])->map(function ($name) {
                return [
                    'data' => $name === 'actions' ? 'id' : $name,
                    'name' => $name,
                    'searchable' => in_array($name, ['options_count', 'participants_count', 'actions']) ? 'false' : 'true',
                    'orderable' => $name === 'actions' ? 'false' : 'true',
                    'search' => ['value' => '', 'regex' => 'false'],
                ];
            })->all(),
        ]))->assertOk();

        $this->assertSame('Planning session', $response->json('data.0.title'));
        $this->assertSame(45, $response->json('data.0.duration_minutes'));
        $this->assertSame(1, $response->json('data.0.options_count'));
        $this->assertSame(2, $response->json('data.0.participants_count'));
        $this->assertStringContainsString('/invitations/'.$invitation->public_id.'/respond', $response->json('data.0.public_url'));
        $this->assertStringContainsString('signature=', $response->json('data.0.public_url'));
    }

    /** @test */
    public function invitations_without_responses_return_a_zero_participant_count()
    {
        $invitation = Invitation::factory()->create();
        $this->signIn();

        $row = collect($this->getJson(route('calendar.tables.invitations'))->assertOk()->json('data'))
            ->firstWhere('id', $invitation->id);

        $this->assertSame(0, $row['participants_count']);
    }

    /** @test */
    public function it_displays_the_responses_for_an_invitation()
    {
        $invitation = Invitation::factory()->create([
            'title' => 'Team planning',
            'duration_minutes' => 60,
        ]);
        $option = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 10:00:00',
        ]);
        $yesParticipant = InvitationParticipant::create([
            'invitation_id' => $invitation->id,
            'name' => 'Available Guest',
        ]);
        $maybeParticipant = InvitationParticipant::create([
            'invitation_id' => $invitation->id,
            'name' => 'Maybe Guest',
        ]);

        InvitationVote::create([
            'invitation_participant_id' => $yesParticipant->id,
            'invitation_option_id' => $option->id,
            'status' => InvitationVote::YES,
        ]);
        InvitationVote::create([
            'invitation_participant_id' => $maybeParticipant->id,
            'invitation_option_id' => $option->id,
            'status' => InvitationVote::MAYBE,
        ]);

        $this->signIn();

        $this->get(route('calendar.invitations.results', $invitation))
            ->assertOk()
            ->assertSee('invitation-results-modal')
            ->assertSee('Team planning')
            ->assertSee('2')
            ->assertSee('people responded')
            ->assertSee('Available Guest')
            ->assertSee('Maybe Guest')
            ->assertSee('10:00 AM to 11:00 AM');
    }

    /** @test */
    public function it_marks_the_winner_and_second_best_invitation_options()
    {
        $invitation = Invitation::factory()->create();
        $winner = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 10:00:00',
        ]);
        $secondBest = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 11:00:00',
        ]);
        $other = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 12:00:00',
        ]);

        $participants = collect(range(1, 5))->map(function ($number) use ($invitation) {
            return InvitationParticipant::create([
                'invitation_id' => $invitation->id,
                'name' => "Guest {$number}",
            ]);
        });

        foreach ([0, 1, 2] as $index) {
            InvitationVote::create([
                'invitation_participant_id' => $participants[$index]->id,
                'invitation_option_id' => $winner->id,
                'status' => InvitationVote::YES,
            ]);
        }

        foreach ([0, 1] as $index) {
            InvitationVote::create([
                'invitation_participant_id' => $participants[$index]->id,
                'invitation_option_id' => $secondBest->id,
                'status' => InvitationVote::YES,
            ]);
        }

        foreach ([2, 3, 4] as $index) {
            InvitationVote::create([
                'invitation_participant_id' => $participants[$index]->id,
                'invitation_option_id' => $secondBest->id,
                'status' => InvitationVote::MAYBE,
            ]);
        }

        InvitationVote::create([
            'invitation_participant_id' => $participants[0]->id,
            'invitation_option_id' => $other->id,
            'status' => InvitationVote::YES,
        ]);

        $this->signIn();

        $response = $this->get(route('calendar.invitations.results', $invitation))->assertOk();

        $this->assertStringContainsString(
            'data-option-id="'.$winner->id.'" data-status="winner"',
            $response->getContent()
        );
        $this->assertStringContainsString(
            'data-option-id="'.$secondBest->id.'" data-status="second-best"',
            $response->getContent()
        );
        $this->assertStringNotContainsString(
            'data-option-id="'.$other->id.'" data-status=',
            $response->getContent()
        );
    }

    /** @test */
    public function it_marks_exactly_tied_options_as_winners_without_a_second_best()
    {
        $invitation = Invitation::factory()->create();
        $firstWinner = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 10:00:00',
        ]);
        $secondWinner = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 11:00:00',
        ]);
        $other = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 12:00:00',
        ]);

        $participants = collect(range(1, 3))->map(function ($number) use ($invitation) {
            return InvitationParticipant::create([
                'invitation_id' => $invitation->id,
                'name' => "Tied Guest {$number}",
            ]);
        });

        foreach ([$firstWinner, $secondWinner] as $winner) {
            foreach ([0, 1] as $index) {
                InvitationVote::create([
                    'invitation_participant_id' => $participants[$index]->id,
                    'invitation_option_id' => $winner->id,
                    'status' => InvitationVote::YES,
                ]);
            }

            InvitationVote::create([
                'invitation_participant_id' => $participants[2]->id,
                'invitation_option_id' => $winner->id,
                'status' => InvitationVote::MAYBE,
            ]);
        }

        InvitationVote::create([
            'invitation_participant_id' => $participants[0]->id,
            'invitation_option_id' => $other->id,
            'status' => InvitationVote::YES,
        ]);

        $this->signIn();

        $content = $this->get(route('calendar.invitations.results', $invitation))
            ->assertOk()
            ->getContent();

        $this->assertStringContainsString(
            'data-option-id="'.$firstWinner->id.'" data-status="winner"',
            $content
        );
        $this->assertStringContainsString(
            'data-option-id="'.$secondWinner->id.'" data-status="winner"',
            $content
        );
        $this->assertStringNotContainsString('data-status="second-best"', $content);
    }

    /** @test */
    public function invitation_options_are_removed_with_their_invitation()
    {
        $invitation = Invitation::factory()->create();
        $option = InvitationOption::factory()->for($invitation)->create();

        $invitation->delete();

        $this->assertDatabaseMissing('invitation_options', ['id' => $option->id]);
    }

    /** @test */
    public function it_creates_an_invitation_with_proposed_times()
    {
        $this->signIn();

        $this->post(route('calendar.invitations.store'), [
            'title' => 'Coffee in August',
            'description' => 'Choose any time that works.',
            'duration_minutes' => 30,
            'options' => [
                '2026-08-05T10:00',
                '2026-08-06T14:30',
            ],
        ])->assertRedirect(route('calendar.invitations.index'));

        $invitation = Invitation::where('title', 'Coffee in August')->firstOrFail();

        $this->assertSame(30, $invitation->duration_minutes);
        $this->assertSame([
            '2026-08-05 10:00:00',
            '2026-08-06 14:30:00',
        ], $invitation->options()
            ->orderBy('starts_at')
            ->get()
            ->map(fn (InvitationOption $option) => $option->starts_at->format('Y-m-d H:i:s'))
            ->all());
    }

    /** @test */
    public function it_displays_a_separate_create_page()
    {
        $this->signIn();

        $this->get(route('calendar.invitations.create'))
            ->assertOk()
            ->assertSee('New Invitation')
            ->assertSee(route('calendar.invitations.store'), false)
            ->assertSee('Create invitation');

        $this->assertSame('/invitations', route('calendar.invitations.create', [], false));
    }

    /** @test */
    public function it_updates_an_invitation_and_synchronizes_proposed_times()
    {
        $invitation = Invitation::factory()->create([
            'title' => 'Original title',
            'duration_minutes' => 30,
        ]);
        $keptOption = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 10:00:00',
        ]);
        $removedOption = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-06 14:30:00',
        ]);

        $this->signIn();

        $this->patch(route('calendar.invitations.update', $invitation), [
            'title' => 'Updated title',
            'description' => 'Updated details',
            'duration_minutes' => 60,
            'options' => [
                '2026-08-05T10:00',
                '2026-08-07T09:15',
            ],
        ])->assertRedirect(route('calendar.invitations.index'));

        $this->assertDatabaseHas('invitations', [
            'id' => $invitation->id,
            'title' => 'Updated title',
            'description' => 'Updated details',
            'duration_minutes' => 60,
        ]);
        $this->assertDatabaseHas('invitation_options', ['id' => $keptOption->id]);
        $this->assertDatabaseMissing('invitation_options', ['id' => $removedOption->id]);
        $this->assertDatabaseHas('invitation_options', [
            'invitation_id' => $invitation->id,
            'starts_at' => '2026-08-07 09:15:00',
        ]);
    }

    /** @test */
    public function it_populates_the_editor_for_an_existing_invitation()
    {
        $invitation = Invitation::factory()->create([
            'title' => 'Lunch meeting',
            'description' => 'Pick a convenient afternoon.',
            'duration_minutes' => 45,
        ]);
        InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-10 13:30:00',
        ]);

        $this->signIn();

        $this->get(route('calendar.invitations.edit', $invitation))
            ->assertOk()
            ->assertSee('Edit Invitation')
            ->assertSee('Lunch meeting')
            ->assertSee('Pick a convenient afternoon.')
            ->assertSee('2026-08-10T13:30')
            ->assertSee("const scheduleStart = '08:00';", false)
            ->assertSee("const scheduleEnd = '22:00';", false)
            ->assertSee('validRange: [scheduleStart, scheduleEnd]', false);

        $this->assertSame(
            '/invitations/'.$invitation->getRouteKey(),
            route('calendar.invitations.edit', $invitation, false)
        );
    }

    /** @test */
    public function proposed_times_must_be_present_and_unique()
    {
        $this->signIn();

        $this->from(route('calendar.invitations.create'))
            ->post(route('calendar.invitations.store'), [
                'title' => 'Duplicate times',
                'duration_minutes' => 30,
                'options' => [
                    '2026-08-05T10:00',
                    '2026-08-05T10:00',
                ],
            ])
            ->assertRedirect(route('calendar.invitations.create'))
            ->assertSessionHasErrors('options.1');

        $this->assertDatabaseCount('invitations', 0);
    }
}
