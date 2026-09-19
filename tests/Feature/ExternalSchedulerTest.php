<?php

namespace Tests\Feature;

use App\Models\External\Scheduler;
use App\Models\External\SchedulerOption;
use App\Models\External\SchedulerVote;
use App\Models\User;
use Carbon\Carbon;
use Tests\BaseTest;

class ExternalSchedulerTest extends BaseTest
{
    /** @test */
    public function guests_can_register_only_from_the_scheduler_domain()
    {
        $schedulerRegisterUrl = 'http://scheduler.'.config('app.domain').'/register';

        $this->get($schedulerRegisterUrl)
            ->assertOk()
            ->assertSee('Register')
            ->assertSee('action="'.$schedulerRegisterUrl.'"', false)
            ->assertSee('Already have an account?');

        $this->post($schedulerRegisterUrl, [
            'name' => 'Scheduler User',
            'email' => 'scheduler@example.com',
            'password' => 'Scheduler-password-123',
            'password_confirmation' => 'Scheduler-password-123',
        ])->assertRedirect(route('scheduler.home'));

        $user = User::where('email', 'scheduler@example.com')->firstOrFail();

        $this->assertAuthenticatedAs($user);

        auth()->logout();

        $mainRegisterUrl = rtrim(config('app.url'), '/').'/register';

        $this->get($mainRegisterUrl)->assertNotFound();
        $this->post($mainRegisterUrl, [
            'name' => 'Main Site User',
            'email' => 'main@example.com',
            'password' => 'Main-password-123',
            'password_confirmation' => 'Main-password-123',
        ])->assertNotFound();

        $this->assertDatabaseMissing('users', ['email' => 'main@example.com']);
    }

    /** @test */
    public function the_scheduler_login_page_links_to_registration()
    {
        $schedulerLoginUrl = 'http://scheduler.'.config('app.domain').'/login';

        $this->get($schedulerLoginUrl)
            ->assertOk()
            ->assertSee('Create an account')
            ->assertSee('http://scheduler.'.config('app.domain').'/register', false);

        $this->get(rtrim(config('app.url'), '/').'/login')
            ->assertOk()
            ->assertDontSee('Create an account');
    }

    /** @test */
    public function the_scheduler_domain_requires_an_account_to_manage_schedulers()
    {
        $this->get(route('scheduler.home'))
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function an_authenticated_user_can_create_and_manage_a_scheduler()
    {
        $user = $this->signIn();

        $this->get(route('scheduler.schedulers.index'))
            ->assertOk()
            ->assertSee('Invitations')
            ->assertSee(route('scheduler.schedulers.create'), false)
            ->assertSee('css/external/scheduler.css');

        $this->post(route('scheduler.schedulers.store'), [
            'title' => 'Dinner plans',
            'description' => 'Choose every time that works.',
            'duration_minutes' => 90,
            'options' => [
                '2026-10-01T18:00',
                '2026-10-02T19:30',
            ],
        ])->assertRedirect(route('scheduler.schedulers.index'));

        $scheduler = Scheduler::where('title', 'Dinner plans')->firstOrFail();

        $this->assertTrue($scheduler->user->is($user));
        $this->assertSame(90, $scheduler->duration_minutes);
        $this->assertSame([
            '2026-10-01 18:00:00',
            '2026-10-02 19:30:00',
        ], $scheduler->options()
            ->orderBy('starts_at')
            ->get()
            ->map(fn (SchedulerOption $option) => $option->starts_at->format('Y-m-d H:i:s'))
            ->all());

        $this->get(route('scheduler.schedulers.edit', $scheduler))
            ->assertOk()
            ->assertSee('Dinner plans')
            ->assertSee('2026-10-01T18:00')
            ->assertSee(route('scheduler.schedulers.update', $scheduler), false);

        $this->patch(route('scheduler.schedulers.update', $scheduler), [
            'title' => 'Updated dinner plans',
            'description' => 'Updated details',
            'duration_minutes' => 60,
            'options' => [
                '2026-10-01T18:00',
                '2026-10-03T20:00',
            ],
        ])->assertRedirect(route('scheduler.schedulers.index'));

        $this->assertDatabaseHas('schedulers', [
            'id' => $scheduler->id,
            'user_id' => $user->id,
            'title' => 'Updated dinner plans',
            'duration_minutes' => 60,
        ]);
        $this->assertDatabaseMissing('scheduler_options', [
            'scheduler_id' => $scheduler->id,
            'starts_at' => '2026-10-02 19:30:00',
        ]);
        $this->assertDatabaseHas('scheduler_options', [
            'scheduler_id' => $scheduler->id,
            'starts_at' => '2026-10-03 20:00:00',
        ]);
    }

    /** @test */
    public function the_scheduler_table_and_management_routes_are_scoped_to_the_owner()
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $owned = $this->scheduler($owner, ['title' => 'Mine']);
        $other = $this->scheduler($otherUser, ['title' => 'Not mine']);

        $this->actingAs($owner);

        $rows = $this->getJson(route('scheduler.schedulers.table'))
            ->assertOk()
            ->json('data');

        $this->assertSame([$owned->id], collect($rows)->pluck('id')->all());

        $this->get(route('scheduler.schedulers.edit', $other))->assertNotFound();
        $this->get(route('scheduler.schedulers.results', $other))->assertNotFound();
        $this->patch(route('scheduler.schedulers.update', $other), [])->assertNotFound();
        $this->delete(route('scheduler.schedulers.destroy', $other))->assertNotFound();
        $this->assertDatabaseHas('schedulers', ['id' => $other->id]);
    }

    /** @test */
    public function a_guest_can_save_and_update_availability_from_a_signed_link()
    {
        $scheduler = $this->scheduler(User::factory()->create(), [
            'title' => 'Planning lunch',
            'duration_minutes' => 60,
        ]);
        $yesOption = $scheduler->options()->create(['starts_at' => '2026-10-05 10:00:00']);
        $maybeOption = $scheduler->options()->create(['starts_at' => '2026-10-05 14:00:00']);
        $url = $scheduler->publicUrl();

        $this->get(route('scheduler.schedulers.public', $scheduler->public_id))
            ->assertForbidden();

        $this->get($url)
            ->assertOk()
            ->assertSee('Planning lunch')
            ->assertSee('Save availability')
            ->assertSee('css/external/scheduler.css');

        $this->post($url, [
            'name' => 'Guest One',
            'responses' => [
                $yesOption->id => SchedulerVote::YES,
                $maybeOption->id => SchedulerVote::MAYBE,
            ],
        ])->assertRedirect($url);

        $participant = $scheduler->participants()->firstOrFail();

        $this->assertDatabaseHas('scheduler_votes', [
            'scheduler_participant_id' => $participant->id,
            'scheduler_option_id' => $yesOption->id,
            'status' => SchedulerVote::YES,
        ]);

        $this->assertDatabaseHas('scheduler_votes', [
            'scheduler_participant_id' => $participant->id,
            'scheduler_option_id' => $maybeOption->id,
            'status' => SchedulerVote::MAYBE,
        ]);

        $this->post($url, [
            'name' => 'Guest One Updated',
            'responses' => [
                $yesOption->id => 'no',
                $maybeOption->id => SchedulerVote::YES,
            ],
        ])->assertRedirect($url);

        $this->assertDatabaseCount('scheduler_participants', 1);
        $this->assertDatabaseMissing('scheduler_votes', [
            'scheduler_participant_id' => $participant->id,
            'scheduler_option_id' => $yesOption->id,
        ]);
        $this->assertDatabaseHas('scheduler_votes', [
            'scheduler_participant_id' => $participant->id,
            'scheduler_option_id' => $maybeOption->id,
            'status' => SchedulerVote::YES,
        ]);

        $this->actingAs($scheduler->user);
        $this->get(route('scheduler.schedulers.results', $scheduler))
            ->assertOk()
            ->assertSee('invitation-results-modal')
            ->assertSee('Guest One Updated')
            ->assertSee(route('scheduler.schedulers.participants.destroy', [$scheduler, $participant]), false);

        $this->delete(route('scheduler.schedulers.participants.destroy', [$scheduler, $participant]))
            ->assertRedirect(route('scheduler.schedulers.index'));

        $this->assertDatabaseMissing('scheduler_participants', ['id' => $participant->id]);
        $this->assertDatabaseMissing('scheduler_votes', [
            'scheduler_participant_id' => $participant->id,
        ]);
    }

    /** @test */
    public function public_scheduler_links_use_the_scheduler_domain_and_expire_in_thirty_days()
    {
        Carbon::setTestNow('2026-09-19 12:00:00');
        $scheduler = $this->scheduler(User::factory()->create());
        $url = $scheduler->publicUrl();
        parse_str(parse_url($url, PHP_URL_QUERY), $query);

        $this->assertSame('scheduler.'.config('app.domain'), parse_url($url, PHP_URL_HOST));
        $this->assertSame('/schedulers/'.$scheduler->public_id.'/respond', parse_url($url, PHP_URL_PATH));
        $this->assertSame(now()->addDays(30)->timestamp, (int) $query['expires']);

        Carbon::setTestNow(now()->addDays(30)->addSecond());
        $this->get($url)->assertForbidden();
        Carbon::setTestNow();
    }

    /** @test */
    public function deleting_a_scheduler_removes_its_options_participants_and_votes()
    {
        $user = $this->signIn();
        $scheduler = $this->scheduler($user);
        $option = $scheduler->options()->create(['starts_at' => '2026-10-05 10:00:00']);
        $participant = $scheduler->participants()->create(['name' => 'Guest']);
        $vote = $participant->votes()->create([
            'scheduler_option_id' => $option->id,
            'status' => SchedulerVote::YES,
        ]);

        $this->delete(route('scheduler.schedulers.destroy', $scheduler))
            ->assertRedirect(route('scheduler.schedulers.index'));

        $this->assertDatabaseMissing('schedulers', ['id' => $scheduler->id]);
        $this->assertDatabaseMissing('scheduler_options', ['id' => $option->id]);
        $this->assertDatabaseMissing('scheduler_participants', ['id' => $participant->id]);
        $this->assertDatabaseMissing('scheduler_votes', ['id' => $vote->id]);
    }

    private function scheduler(User $user, array $attributes = []): Scheduler
    {
        return Scheduler::create(array_merge([
            'user_id' => $user->id,
            'title' => 'Availability poll',
            'description' => null,
            'duration_minutes' => 30,
        ], $attributes));
    }
}
