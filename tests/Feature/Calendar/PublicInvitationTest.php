<?php

namespace Tests\Feature\Calendar;

use App\Models\Calendar\Invitation;
use App\Models\Calendar\InvitationOption;
use App\Models\Calendar\InvitationParticipant;
use App\Models\Calendar\InvitationVote;
use Carbon\Carbon;
use Tests\BaseTest;

class PublicInvitationTest extends BaseTest
{
    /** @test */
    public function its_public_url_is_signed_and_expires_in_thirty_days()
    {
        Carbon::setTestNow('2026-07-16 22:00:00');

        $invitation = Invitation::factory()->create([
            'duration_minutes' => 60,
        ]);
        $url = $invitation->publicUrl();
        parse_str(parse_url($url, PHP_URL_QUERY), $query);

        $this->assertSame('calendar.'.config('app.domain'), parse_url($url, PHP_URL_HOST));
        $this->assertSame('/invitations/'.$invitation->public_id, parse_url($url, PHP_URL_PATH));

        $this->assertSame(
            now()->addDays(30)->timestamp,
            (int) $query['expires']
        );

        $this->get(route('calendar.invitations.public', $invitation->public_id))
            ->assertForbidden();

        $this->get($url)
            ->assertOk()
            ->assertSee($invitation->title)
            ->assertSee('Save availability');

        Carbon::setTestNow(now()->addDays(30)->addSecond());

        $this->get($url)->assertForbidden();

        Carbon::setTestNow();
    }

    /** @test */
    public function a_guest_can_save_and_update_their_availability()
    {
        $invitation = Invitation::factory()->create([
            'title' => 'Planning lunch',
            'duration_minutes' => 60,
        ]);
        $yesOption = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 10:00:00',
        ]);
        $maybeOption = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-05 14:00:00',
        ]);
        $noOption = InvitationOption::factory()->for($invitation)->create([
            'starts_at' => '2026-08-06 09:00:00',
        ]);
        $url = $invitation->publicUrl();

        $this->post($url, [
            'name' => 'Guest One',
            'responses' => [
                $yesOption->id => 'yes',
                $maybeOption->id => 'maybe',
                $noOption->id => 'no',
            ],
        ])->assertRedirect($url);

        $participant = InvitationParticipant::where('invitation_id', $invitation->id)->firstOrFail();

        $this->assertSame('Guest One', $participant->name);
        $this->assertDatabaseHas('invitation_votes', [
            'invitation_participant_id' => $participant->id,
            'invitation_option_id' => $yesOption->id,
            'status' => InvitationVote::YES,
        ]);
        $this->assertDatabaseHas('invitation_votes', [
            'invitation_participant_id' => $participant->id,
            'invitation_option_id' => $maybeOption->id,
            'status' => InvitationVote::MAYBE,
        ]);
        $this->assertDatabaseMissing('invitation_votes', [
            'invitation_participant_id' => $participant->id,
            'invitation_option_id' => $noOption->id,
        ]);

        $this->post($url, [
            'name' => 'Guest One Updated',
            'responses' => [
                $yesOption->id => 'no',
                $maybeOption->id => 'yes',
                $noOption->id => 'maybe',
            ],
        ])->assertRedirect($url);

        $this->assertDatabaseCount('invitation_participants', 1);
        $this->assertDatabaseMissing('invitation_votes', [
            'invitation_participant_id' => $participant->id,
            'invitation_option_id' => $yesOption->id,
        ]);
        $this->assertDatabaseHas('invitation_votes', [
            'invitation_participant_id' => $participant->id,
            'invitation_option_id' => $maybeOption->id,
            'status' => InvitationVote::YES,
        ]);
        $this->assertDatabaseHas('invitation_votes', [
            'invitation_participant_id' => $participant->id,
            'invitation_option_id' => $noOption->id,
            'status' => InvitationVote::MAYBE,
        ]);
    }

    /** @test */
    public function the_public_invitation_includes_the_people_who_responded_for_each_time()
    {
        $invitation = Invitation::factory()->create([
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

        $this->get($invitation->publicUrl())
            ->assertOk()
            ->assertSee('Show responses for 10:00 AM')
            ->assertSee('Available Guest')
            ->assertSee('Maybe Guest')
            ->assertSee('10:00 AM to 11:00 AM')
            ->assertSee('data-response="yes"', false)
            ->assertSee('data-response="maybe"', false)
            ->assertSee('1 yes')
            ->assertSee('1 maybe');
    }

    /** @test */
    public function deleting_an_invitation_removes_its_responses()
    {
        $invitation = Invitation::factory()->create();
        $option = InvitationOption::factory()->for($invitation)->create();
        $participant = InvitationParticipant::create([
            'invitation_id' => $invitation->id,
            'name' => 'Guest',
        ]);
        $vote = InvitationVote::create([
            'invitation_participant_id' => $participant->id,
            'invitation_option_id' => $option->id,
            'status' => InvitationVote::YES,
        ]);

        $this->signIn();

        $this->delete(route('calendar.invitations.destroy', $invitation))
            ->assertRedirect(route('calendar.invitations.index'));

        $this->assertDatabaseMissing('invitations', ['id' => $invitation->id]);
        $this->assertDatabaseMissing('invitation_participants', ['id' => $participant->id]);
        $this->assertDatabaseMissing('invitation_votes', ['id' => $vote->id]);
    }
}
