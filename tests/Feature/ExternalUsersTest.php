<?php

namespace Tests\Feature;

use App\Models\External\Scheduler;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tests\BaseTest;

class ExternalUsersTest extends BaseTest
{
    /** @test */
    public function the_users_domain_has_login_but_not_registration()
    {
        $usersUrl = 'http://users.'.config('app.domain');

        $this->get($usersUrl.'/login')
            ->assertOk()
            ->assertSee('Login')
            ->assertDontSee('Create an account');

        $this->get($usersUrl.'/register')->assertNotFound();
        $this->post($usersUrl.'/register', [
            'name' => 'Unauthorized Registration',
            'email' => 'unauthorized@example.com',
            'password' => 'Registration-password-123',
            'password_confirmation' => 'Registration-password-123',
        ])->assertNotFound();

        $this->assertDatabaseMissing('users', [
            'email' => 'unauthorized@example.com',
        ]);
    }

    /** @test */
    public function scheduler_users_can_only_log_in_on_the_scheduler_domain()
    {
        $user = User::factory()->create([
            'email' => 'scheduler-user@example.com',
            'password' => Hash::make('Scheduler-password-123'),
        ]);
        $credentials = [
            'email' => $user->email,
            'password' => 'Scheduler-password-123',
        ];

        $this->post('http://users.'.config('app.domain').'/login', $credentials)
            ->assertSessionHasErrors('email');
        $this->assertGuest();

        $this->post(rtrim(config('app.url'), '/').'/login', $credentials)
            ->assertSessionHasErrors('email');
        $this->assertGuest();

        $this->post('http://scheduler.'.config('app.domain').'/login', $credentials)
            ->assertRedirect(route('scheduler.home'));
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function arthur_can_log_in_on_the_users_domain_and_scheduler_users_cannot_access_it()
    {
        $usersUrl = 'http://users.'.config('app.domain');
        $schedulerUser = User::factory()->create();

        $this->actingAs($schedulerUser)
            ->get($usersUrl)
            ->assertForbidden();

        $this->get(route('calendar.home'))
            ->assertForbidden();

        auth()->logout();

        $arthur = User::factory()->create([
            'email' => User::ARTHUR_EMAIL,
            'password' => Hash::make('Arthur-password-123'),
        ]);

        $this->post($usersUrl.'/login', [
            'email' => $arthur->email,
            'password' => 'Arthur-password-123',
        ])->assertRedirect(route('users.home'));

        $this->assertAuthenticatedAs($arthur);
    }

    /** @test */
    public function guests_are_redirected_to_the_users_domain_login_page()
    {
        $usersUrl = 'http://users.'.config('app.domain');

        $this->get($usersUrl)
            ->assertRedirect($usersUrl.'/login');
    }

    /** @test */
    public function arthur_can_view_edit_and_delete_scheduler_accounts()
    {
        $arthur = User::factory()->create([
            'email' => User::ARTHUR_EMAIL,
        ]);
        $user = User::factory()->create([
            'name' => 'Scheduler Person',
            'email' => 'person@example.com',
        ]);
        $scheduler = Scheduler::create([
            'user_id' => $user->id,
            'title' => 'Weekend plans',
            'description' => null,
            'duration_minutes' => 60,
        ]);
        $option = $scheduler->options()->create([
            'starts_at' => '2026-10-10 10:00:00',
        ]);

        $this->actingAs($arthur);

        $this->get(route('users.home'))
            ->assertOk()
            ->assertSee('Scheduler Person')
            ->assertSee('person@example.com')
            ->assertDontSee(User::ARTHUR_EMAIL);

        $this->get(route('users.accounts.show', $user))
            ->assertOk()
            ->assertSee('Scheduler Person')
            ->assertSee('Weekend plans');

        $this->get(route('users.accounts.edit', $user))
            ->assertOk()
            ->assertSee('Edit account')
            ->assertSee('person@example.com');

        $this->patch(route('users.accounts.update', $user), [
            'name' => 'Updated Person',
            'email' => 'updated@example.com',
            'password' => 'Updated-password-123',
            'password_confirmation' => 'Updated-password-123',
        ])->assertRedirect(route('users.accounts.show', $user));

        $user->refresh();
        $this->assertSame('Updated Person', $user->name);
        $this->assertSame('updated@example.com', $user->email);
        $this->assertTrue(Hash::check('Updated-password-123', $user->password));

        $this->delete(route('users.accounts.destroy', $user))
            ->assertRedirect(route('users.home'));

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
        $this->assertDatabaseMissing('schedulers', ['id' => $scheduler->id]);
        $this->assertDatabaseMissing('scheduler_options', ['id' => $option->id]);
    }

    /** @test */
    public function the_arthur_account_cannot_be_managed_from_the_users_area()
    {
        $arthur = User::factory()->create([
            'email' => User::ARTHUR_EMAIL,
        ]);

        $this->actingAs($arthur);

        $this->get(route('users.accounts.show', $arthur))->assertForbidden();
        $this->get(route('users.accounts.edit', $arthur))->assertForbidden();
        $this->patch(route('users.accounts.update', $arthur), [
            'name' => 'Changed',
            'email' => 'changed@example.com',
        ])->assertForbidden();
        $this->delete(route('users.accounts.destroy', $arthur))->assertForbidden();

        $this->assertDatabaseHas('users', [
            'id' => $arthur->id,
            'email' => User::ARTHUR_EMAIL,
        ]);
    }
}
