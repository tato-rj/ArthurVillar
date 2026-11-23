<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Calendar\GoogleCalendarConnection;
use App\Models\Calendar\GoogleCalendarEvent;
use App\Models\Calendar\Settings;
use App\Models\User;
use App\Services\GoogleCalendarSync;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Tests\BaseTest;

class GoogleCalendarSyncTest extends BaseTest
{
    public function setUp(): void
    {
        parent::setUp();

        config([
            'services.google_calendar.client_id' => 'google-client-id',
            'services.google_calendar.client_secret' => 'google-client-secret',
            'services.google_calendar.redirect_uri' => 'https://calendar.example.test/google-calendar/callback',
        ]);
    }

    /** @test */
    public function it_redirects_to_google_with_offline_event_access_and_oauth_state()
    {
        $this->signIn();

        $response = $this->get(route('calendar.google-calendar.connect'));
        $location = $response->headers->get('Location');

        $response->assertRedirect();
        $this->assertStringStartsWith('https://accounts.google.com/o/oauth2/v2/auth?', $location);

        parse_str(parse_url($location, PHP_URL_QUERY), $query);

        $this->assertSame('offline', $query['access_type']);
        $this->assertSame('consent select_account', $query['prompt']);
        $this->assertArrayNotHasKey('login_hint', $query);
        $this->assertSame(
            'openid profile https://www.googleapis.com/auth/calendar.calendars.readonly https://www.googleapis.com/auth/calendar.events.owned',
            $query['scope']
        );
        $this->assertNotEmpty($query['state']);
        $this->assertSame($query['state'], session('google_calendar_oauth_state'));
    }

    /** @test */
    public function it_responds_to_an_imported_google_invitation_for_the_connected_account()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'Arthur',
            'access_token' => 'access-token',
            'refresh_token' => 'refresh-token',
            'token_expires_at' => now()->addHour(),
        ]);
        $event = $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('remote/event'),
            [
                'attendees' => [
                    ['email' => 'arthur@example.com', 'self' => true, 'responseStatus' => 'needsAction'],
                    ['email' => 'host@example.com', 'organizer' => true, 'responseStatus' => 'accepted'],
                ],
            ]
        ));

        Http::fake([
            'https://www.googleapis.com/calendar/v3/calendars/*/events/*' => Http::response([
                'id' => 'remote/event',
                'updated' => '2026-08-28T15:00:00Z',
            ]),
        ]);

        $this->patchJson(route('calendar.google-calendar.events.respond', $event), [
            'response_status' => 'accepted',
        ])->assertOk()
            ->assertJsonPath('event.response_status', 'accepted');

        $this->assertSame('accepted', $event->fresh()->response_status);
        $this->assertSame('accepted', collect($event->fresh()->attendees)->firstWhere('self', true)['responseStatus']);

        Http::assertSent(function ($request) {
            return $request->method() === 'PATCH'
                && str_contains($request->url(), '/calendars/arthur%40example.com/events/remote%2Fevent')
                && $request['attendeesOmitted'] === true
                && count($request['attendees']) === 1
                && $request['attendees'][0]['email'] === 'arthur@example.com'
                && $request['attendees'][0]['responseStatus'] === 'accepted';
        });
    }

    /** @test */
    public function a_scheduler_user_cannot_respond_to_arthurs_google_invitation()
    {
        $owner = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $owner->id,
            'calendar_id' => 'owner@example.com',
            'calendar_name' => 'Owner',
            'access_token' => 'access-token',
        ]);
        $event = $connection->events()->create($this->storedMeetingAttributes('private-event'));

        $this->actingAs(User::factory()->create());

        $this->patchJson(route('calendar.google-calendar.events.respond', $event), [
            'response_status' => 'declined',
        ])->assertForbidden();

        Http::assertNothingSent();
    }

    /** @test */
    public function connecting_a_second_google_account_keeps_the_first_connection()
    {
        $user = $this->signIn();
        $firstConnection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'first@example.com',
            'calendar_name' => 'First account',
            'access_token' => 'first-access-token',
            'refresh_token' => 'first-refresh-token',
        ]);
        $state = 'valid-oauth-state';

        Http::fake([
            'https://oauth2.googleapis.com/token' => Http::response([
                'access_token' => 'second-access-token',
                'refresh_token' => 'second-refresh-token',
                'expires_in' => 3600,
            ]),
            'https://www.googleapis.com/calendar/v3/calendars/primary' => Http::response([
                'id' => 'second@example.com',
                'summary' => 'Second account',
                'timeZone' => 'America/New_York',
            ]),
            'https://openidconnect.googleapis.com/v1/userinfo' => Http::response([
                'email' => 'second@example.com',
                'picture' => 'https://lh3.googleusercontent.com/a/second-account',
            ]),
        ]);

        $this->withSession(['google_calendar_oauth_state' => $state])
            ->get(route('calendar.google-calendar.callback', [
                'state' => $state,
                'code' => 'second-authorization-code',
            ]))
            ->assertRedirect(route('calendar.home'))
            ->assertSessionHas('success');

        $this->assertDatabaseCount('google_calendar_connections', 2);
        $this->assertSame('first-access-token', $firstConnection->fresh()->access_token);
        $this->assertSame(
            'second-refresh-token',
            GoogleCalendarConnection::where('calendar_id', 'second@example.com')->firstOrFail()->refresh_token
        );
        $this->assertSame(
            'https://lh3.googleusercontent.com/a/second-account',
            GoogleCalendarConnection::where('calendar_id', 'second@example.com')->firstOrFail()->profile_picture_url
        );
    }

    /** @test */
    public function settings_do_not_repeat_the_email_when_it_is_also_the_calendar_name()
    {
        $user = $this->signIn();
        GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'arthur@example.com',
            'profile_picture_url' => 'https://lh3.googleusercontent.com/a/arthur',
            'access_token' => 'access-token',
        ]);

        $response = $this->get(route('calendar.home'))->assertOk();

        $this->assertSame(1, substr_count($response->getContent(), 'arthur@example.com'));
        $response
            ->assertSee('calendar-google-account d-flex align-items-center', false)
            ->assertSee('calendar-google-account-avatar rounded-circle', false)
            ->assertSee('src="https://lh3.googleusercontent.com/a/arthur"', false)
            ->assertSee('referrerpolicy="no-referrer"', false);
    }

    /** @test */
    public function the_oauth_callback_connects_without_waiting_for_the_first_sync()
    {
        Carbon::setTestNow('2026-07-21 12:00:00');
        $user = $this->signIn();
        $state = 'valid-oauth-state';

        Http::fake([
            'https://oauth2.googleapis.com/token' => Http::response([
                'access_token' => 'access-token',
                'refresh_token' => 'refresh-token',
                'expires_in' => 3600,
            ]),
            'https://www.googleapis.com/calendar/v3/calendars/primary' => Http::response([
                'id' => 'arthur@example.com',
                'summary' => 'Arthur',
                'timeZone' => 'America/New_York',
            ]),
            'https://openidconnect.googleapis.com/v1/userinfo' => Http::response([
                'email' => 'arthur@example.com',
                'picture' => 'https://lh3.googleusercontent.com/a/arthur',
            ]),
        ]);

        $this->withSession(['google_calendar_oauth_state' => $state])
            ->get(route('calendar.google-calendar.callback', [
                'state' => $state,
                'code' => 'authorization-code',
            ]))
            ->assertRedirect(route('calendar.home'))
            ->assertSessionHas('success');

        $connection = GoogleCalendarConnection::where('user_id', $user->id)->firstOrFail();

        $this->assertSame('refresh-token', $connection->refresh_token);
        $this->assertNull($connection->sync_token);
        $this->assertNull($connection->last_synced_at);
        $this->assertSame('arthur@example.com', $connection->calendar_id);
        $this->assertSame('https://lh3.googleusercontent.com/a/arthur', $connection->profile_picture_url);
        $this->assertDatabaseCount('google_calendar_events', 0);

        Http::assertNotSent(fn ($request) => str_contains($request->url(), '/events'));

        Carbon::setTestNow();
    }

    /** @test */
    public function the_first_sync_imports_invitations_and_excludes_personal_appointments()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'Arthur',
            'access_token' => 'access-token',
            'refresh_token' => 'refresh-token',
            'token_expires_at' => now()->addHour(),
        ]);

        Http::fake([
            'https://www.googleapis.com/calendar/v3/calendars/*/events*' => Http::response([
                'items' => [
                    $this->googleMeeting('invited-meeting', 'needsAction'),
                    $this->googleMeeting('tentative-meeting', 'tentative'),
                    array_replace_recursive($this->googleMeeting('old-invited-meeting', 'accepted'), [
                        'start' => ['dateTime' => '2026-06-30T15:00:00-04:00'],
                        'end' => ['dateTime' => '2026-06-30T16:00:00-04:00'],
                    ]),
                    array_replace($this->googleMeeting('solo-appointment', 'accepted'), [
                        'organizer' => ['email' => 'arthur@example.com', 'self' => true],
                        'attendees' => [],
                    ]),
                    $this->googleMeeting('declined-meeting', 'declined'),
                ],
                'nextSyncToken' => 'sync-token-1',
            ]),
        ]);

        app(GoogleCalendarSync::class)->sync($connection);

        $this->assertSame('sync-token-1', $connection->fresh()->sync_token);
        $this->assertDatabaseHas('google_calendar_events', [
            'google_calendar_connection_id' => $connection->id,
            'google_event_id' => 'invited-meeting',
            'response_status' => 'needsAction',
        ]);
        $this->assertDatabaseHas('google_calendar_events', [
            'google_calendar_connection_id' => $connection->id,
            'google_event_id' => 'tentative-meeting',
            'response_status' => 'needsAction',
        ]);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'solo-appointment']);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'declined-meeting']);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'old-invited-meeting']);

        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/events')
                && $request['timeMin'] === '2026-07-01T04:00:00+00:00';
        });
    }

    /** @test */
    public function a_full_sync_recovers_hosted_meetings_and_preserves_existing_calendar_event_ids()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'access_token' => 'access-token',
            'token_expires_at' => now()->addHour(),
        ]);
        $invitation = $connection->events()->create($this->storedMeetingAttributes('invitation'));
        $removed = $connection->events()->create($this->storedMeetingAttributes('removed'));
        $organizer = ['email' => $connection->calendar_id, 'self' => true];
        $hostAttendee = $organizer + ['organizer' => true, 'responseStatus' => 'accepted'];
        $guest = ['email' => 'guest@example.com', 'responseStatus' => 'accepted'];
        $meeting = array_replace($this->googleMeeting('hosted', 'accepted'), [
            'organizer' => $organizer,
            'attendees' => [$hostAttendee, $guest],
            'start' => ['dateTime' => '2026-11-23T14:00:00-05:00'],
            'end' => ['dateTime' => '2026-11-23T14:45:00-05:00'],
        ]);
        Http::fakeSequence()
            ->push(['items' => [$this->googleMeeting('invitation', 'accepted')], 'nextPageToken' => 'page-2'])
            ->push(['items' => [
                $meeting,
                array_replace($meeting, ['id' => 'host-omitted', 'attendees' => [$guest]]),
                array_replace($meeting, ['id' => 'solo', 'attendees' => [$hostAttendee]]),
            ], 'nextSyncToken' => 'incremental-token'])
            ->push(['items' => [
                array_replace($meeting, ['attendees' => [$hostAttendee]]),
            ], 'nextSyncToken' => 'next-token']);

        $this->post(route('calendar.google-calendar.sync', $connection))->assertSessionHas('success');

        $this->assertSame('accepted', $invitation->fresh()->response_status);
        $this->assertModelMissing($removed);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'solo']);
        $hosted = $connection->events()->where('google_event_id', 'hosted')->firstOrFail();
        $hostOmitted = $connection->events()->where('google_event_id', 'host-omitted')->firstOrFail();
        $events = app(Scheduler::class)->generalEvents([
            'start' => '2026-11-23', 'end' => '2026-11-23',
        ], $user->id);
        foreach ([$hosted, $hostOmitted] as $event) {
            $payload = $events->firstWhere('id', 'google-'.$event->id);
            $this->assertNotNull($payload);
            $this->assertSame('2026-11-23', $payload['scheduled_date']);
            $this->assertSame('14:00', $payload['starts_at']);
            $this->assertSame('14:45', $payload['ends_at']);
            $this->assertSame('accepted', $payload['response_status']);
            $this->assertNull($payload['response_url']);
        }
        $this->patchJson(route('calendar.google-calendar.events.respond', $hosted), [
            'response_status' => 'declined',
        ])->assertUnprocessable();
        Http::assertSentCount(2);

        app(GoogleCalendarSync::class)->sync($connection->fresh());

        $this->assertModelMissing($hosted);
        $this->assertModelExists($hostOmitted);
        $this->assertSame('next-token', $connection->fresh()->sync_token);
    }

    /** @test */
    public function sync_imports_google_events_beyond_the_mysql_timestamp_limit()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'Arthur',
            'access_token' => 'access-token',
            'token_expires_at' => now()->addHour(),
        ]);
        $meeting = $this->googleMeeting('future-recurring-meeting', 'accepted');
        $meeting['start']['dateTime'] = '2038-01-19T15:00:00Z';
        $meeting['end']['dateTime'] = '2038-01-19T16:00:00Z';

        Http::fake([
            'https://www.googleapis.com/calendar/v3/calendars/*/events*' => Http::response([
                'items' => [$meeting],
                'nextSyncToken' => 'sync-token-after-2038',
            ]),
        ]);

        app(GoogleCalendarSync::class)->sync($connection);

        $event = GoogleCalendarEvent::where('google_event_id', 'future-recurring-meeting')->firstOrFail();

        $this->assertSame('2038-01-19 15:00:00', $event->starts_at->utc()->format('Y-m-d H:i:s'));
        $this->assertSame('2038-01-19 16:00:00', $event->ends_at->utc()->format('Y-m-d H:i:s'));
    }

    /** @test */
    public function sync_limits_recurring_occurrences_to_the_configured_month_horizon()
    {
        Carbon::setTestNow('2026-07-21 12:00:00');
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'Arthur',
            'access_token' => 'access-token',
            'token_expires_at' => now()->addHour(),
            'sync_token' => 'existing-sync-token',
        ]);
        $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('stored-far-recurring-event'),
            [
                'recurring_event_id' => 'stored-recurring-series',
                'starts_at' => '2026-10-01 19:00:00',
                'ends_at' => '2026-10-01 20:00:00',
            ]
        ));
        $nearRecurring = array_replace_recursive($this->googleMeeting('near-recurring-event', 'accepted'), [
            'recurringEventId' => 'recurring-series',
            'start' => ['dateTime' => '2026-09-01T15:00:00-04:00'],
            'end' => ['dateTime' => '2026-09-01T16:00:00-04:00'],
        ]);
        $farRecurring = array_replace_recursive($this->googleMeeting('far-recurring-event', 'accepted'), [
            'recurringEventId' => 'recurring-series',
            'start' => ['dateTime' => '2026-10-01T15:00:00-04:00'],
            'end' => ['dateTime' => '2026-10-01T16:00:00-04:00'],
        ]);
        $farSingle = array_replace_recursive($this->googleMeeting('far-single-event', 'accepted'), [
            'start' => ['dateTime' => '2026-10-01T17:00:00-04:00'],
            'end' => ['dateTime' => '2026-10-01T18:00:00-04:00'],
        ]);

        Http::fake([
            'https://www.googleapis.com/calendar/v3/calendars/*/events*' => Http::response([
                'items' => [$nearRecurring, $farRecurring, $farSingle],
                'nextSyncToken' => 'next-sync-token',
            ]),
        ]);

        app(GoogleCalendarSync::class)->sync($connection);

        $this->assertDatabaseHas('google_calendar_events', ['google_event_id' => 'near-recurring-event']);
        $this->assertDatabaseHas('google_calendar_events', ['google_event_id' => 'far-single-event']);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'far-recurring-event']);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'stored-far-recurring-event']);

        Settings::setValue('google_calendar.recurring_sync_months', 4, Settings::TYPE_INTEGER);
        app(GoogleCalendarSync::class)->sync($connection->fresh());

        $this->assertDatabaseHas('google_calendar_events', ['google_event_id' => 'far-recurring-event']);

        Carbon::setTestNow();
    }

    /** @test */
    public function incremental_sync_uses_the_saved_token_and_removes_canceled_google_events()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'Arthur',
            'access_token' => 'access-token',
            'refresh_token' => 'refresh-token',
            'token_expires_at' => now()->addHour(),
            'sync_token' => 'sync-token-1',
        ]);
        $connection->events()->create($this->storedMeetingAttributes('remote-event'));
        $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('old-remote-event'),
            [
                'starts_at' => '2026-06-30 19:00:00',
                'ends_at' => '2026-06-30 20:00:00',
            ]
        ));

        Http::fake([
            'https://www.googleapis.com/calendar/v3/calendars/*/events*' => Http::response([
                'items' => [[
                    'id' => 'remote-event',
                    'status' => 'cancelled',
                ]],
                'nextSyncToken' => 'sync-token-2',
            ]),
        ]);

        app(GoogleCalendarSync::class)->sync($connection);

        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'remote-event']);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'old-remote-event']);
        $this->assertSame('sync-token-2', $connection->fresh()->sync_token);

        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/calendar/v3/calendars/arthur%40example.com/events')
                && $request['syncToken'] === 'sync-token-1';
        });
    }

    /** @test */
    public function manual_sync_updates_only_the_selected_google_account()
    {
        $user = $this->signIn();
        $selectedConnection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'selected@example.com',
            'calendar_name' => 'Selected account',
            'access_token' => 'selected-access-token',
            'token_expires_at' => now()->addHour(),
            'sync_token' => 'selected-sync-token',
        ]);
        $otherConnection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'other@example.com',
            'calendar_name' => 'Other account',
            'access_token' => 'other-access-token',
            'token_expires_at' => now()->addHour(),
            'sync_token' => 'other-sync-token',
        ]);

        Http::fake([
            'https://www.googleapis.com/calendar/v3/calendars/*/events*' => Http::response([
                'items' => [],
                'nextSyncToken' => 'selected-sync-token-2',
            ]),
        ]);

        $this->post(route('calendar.google-calendar.sync', $selectedConnection))
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertSame('selected-sync-token-2', $selectedConnection->fresh()->sync_token);
        $this->assertSame('other-sync-token', $otherConnection->fresh()->sync_token);
    }

    /** @test */
    public function imported_meetings_are_included_in_the_calendar_as_read_only_google_events()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'Arthur',
            'access_token' => 'access-token',
            'refresh_token' => 'refresh-token',
            'token_expires_at' => now()->addHour(),
        ]);
        $event = $connection->events()->create($this->storedMeetingAttributes('remote-event'));
        $allDayEvent = $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('all-day-event'),
            [
                'title' => 'All-day meeting',
                'all_day' => true,
                'starts_at' => null,
                'ends_at' => null,
                'start_date' => '2026-08-12',
                'end_date' => '2026-08-13',
            ]
        ));
        $declinedEvent = $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('declined-event'),
            ['response_status' => 'declined']
        ));
        $tentativeEvent = $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('tentative-event'),
            ['response_status' => 'tentative']
        ));
        $oldEvent = $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('old-remote-event'),
            [
                'starts_at' => '2026-06-30 19:00:00',
                'ends_at' => '2026-06-30 20:00:00',
            ]
        ));

        $calendarEvents = app(Scheduler::class)->generalEvents([
            'range_start' => '2026-06-01',
            'range_end' => '2026-08-31',
            'start' => '2026-06-01',
            'end' => '2026-08-31',
        ], $user->id);
        $googleEvent = $calendarEvents->firstWhere('id', 'google-'.$event->id);
        $googleAllDayEvent = $calendarEvents->firstWhere('id', 'google-'.$allDayEvent->id);
        $googleUnansweredEvent = $calendarEvents->firstWhere('id', 'google-'.$tentativeEvent->id);

        $this->assertNotNull($googleEvent);
        $this->assertSame('arthur@example.com', $googleEvent['event_type']);
        $this->assertSame('google', $googleEvent['event_type_icon']);
        $this->assertSame('https://calendar.google.com/event?eid=remote', $googleEvent['external_url']);
        $this->assertSame('needsAction', $googleEvent['response_status']);
        $this->assertSame(
            route('calendar.google-calendar.events.respond', $event),
            $googleEvent['response_url']
        );
        $this->assertTrue($googleEvent['read_only']);
        $this->assertSame('', $googleEvent['edit_url']);
        $this->assertNotNull($googleAllDayEvent);
        $this->assertTrue($googleAllDayEvent['all_day']);
        $this->assertSame('2026-08-12', $googleAllDayEvent['scheduled_date']);
        $this->assertSame('00:00', $googleAllDayEvent['starts_at']);
        $this->assertSame('23:45', $googleAllDayEvent['ends_at']);
        $this->assertSame('needsAction', $tentativeEvent->fresh()->response_status);
        $this->assertNotNull($googleUnansweredEvent);
        $this->assertSame('needsAction', $googleUnansweredEvent['response_status']);
        $this->assertNull($calendarEvents->firstWhere('id', 'google-'.$declinedEvent->id));
        $this->assertNull($calendarEvents->firstWhere('id', 'google-'.$oldEvent->id));
    }

    /** @test */
    public function it_shows_the_google_events_page_with_visibility_controls()
    {
        $this->signIn();

        $this->get(route('calendar.events.google'))
            ->assertOk()
            ->assertSee('Google Events')
            ->assertSee('google-events-table', false)
            ->assertSee('tables\\/google-events', false)
            ->assertSeeInOrder(['<th>Response</th>', '<th>Actions</th>'], false)
            ->assertSee('data-restore-google-event', false)
            ->assertSee("status === 'Accepted' ? 'text-green' : 'text-muted'", false)
            ->assertDontSee('aria-label="Event source"', false)
            ->assertDontSee('New event')
            ->assertDontSee('create-event-modal', false);
    }

    public function test_a_hidden_series_stays_listed_and_can_be_restored_from_a_newly_synced_occurrence()
    {
        $user = $this->signIn();
        $this->travelTo(Carbon::parse('2026-08-01'));
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id, 'calendar_id' => 'studio@example.com',
            'access_token' => 'test-token', 'token_expires_at' => now()->addHour(),
        ]);
        $other = GoogleCalendarConnection::create([
            'user_id' => $user->id, 'calendar_id' => 'other@example.com', 'access_token' => 'other-token',
        ]);
        $series = ['recurring_event_id' => 'studio-series'];
        $first = $connection->events()->create($this->storedMeetingAttributes('first') + $series);
        $second = $connection->events()->create($this->storedMeetingAttributes('second') + $series);
        $single = $connection->events()->create($this->storedMeetingAttributes('single'));
        $otherEvent = $other->events()->create($this->storedMeetingAttributes('first') + $series);

        $feed = fn () => collect($this->getJson(route('calendar.home', [
            'lesson_plans' => 1, 'range_start' => '2026-08-01', 'range_end' => '2026-08-31',
        ]))->assertOk()->json('generalEvents'))->keyBy('id');
        $table = fn () => collect($this->getJson(route('calendar.tables.google-events', $this->googleEventTableParameters()))
            ->assertOk()->json('data'))->keyBy('id');
        $url = $feed()['google-'.$first->id]['visibility_url'];
        $this->putJson($url, ['hidden' => true])->assertOk()->assertJsonPath('hidden', true);
        $this->putJson($url, ['hidden' => true])->assertOk();
        $this->assertDatabaseCount('hidden_google_calendar_events', 1);
        $this->assertEqualsCanonicalizing(['google-'.$single->id, 'google-'.$otherEvent->id], $feed()->keys()->all());
        $rows = $table();
        $this->assertCount(4, $rows);
        $this->assertNotEmpty($rows[$first->id]['restore_url']);
        $this->assertNotEmpty($rows[$second->id]['restore_url']);
        $this->assertEmpty($rows[$single->id]['restore_url']);
        $this->assertEmpty($rows[$otherEvent->id]['restore_url']);

        Http::fake(['https://www.googleapis.com/calendar/v3/calendars/*/events*' => Http::response([
            'items' => [
                $this->googleMeeting('second', 'accepted') + ['recurringEventId' => 'studio-series'],
                $this->googleMeeting('new', 'accepted') + ['recurringEventId' => 'studio-series'],
                $this->googleMeeting('single', 'accepted'),
            ],
            'nextSyncToken' => 'next',
        ])]);
        app(GoogleCalendarSync::class)->sync($connection);
        $new = $connection->events()->where('google_event_id', 'new')->firstOrFail();
        $this->assertEqualsCanonicalizing(['google-'.$single->id, 'google-'.$otherEvent->id], $feed()->keys()->all());
        $this->putJson($table()[$new->id]['restore_url'], ['hidden' => false])->assertOk()->assertJsonPath('hidden', false);
        $this->assertCount(4, $feed());
        $this->assertEmpty($table()[$second->id]['restore_url']);
        Http::assertSentCount(1);
    }

    public function test_single_event_visibility_is_local_to_its_owner_and_event_id()
    {
        $owner = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $owner->id, 'calendar_id' => 'studio@example.com', 'access_token' => 'test-token',
        ]);
        $single = $connection->events()->create($this->storedMeetingAttributes('private'));
        $sameTitle = $connection->events()->create($this->storedMeetingAttributes('another'));
        $url = route('calendar.google-calendar.events.visibility', $single);
        $range = ['start' => '2026-08-01', 'end' => '2026-08-31'];
        $visibleIds = fn () => app(Scheduler::class)->generalEvents($range, $owner->id)->pluck('id')->all();

        $this->putJson($url, [])->assertUnprocessable();
        $this->putJson($url, ['hidden' => true])->assertOk();
        $this->assertSame(['google-'.$sameTitle->id], $visibleIds());
        $this->assertSame('needsAction', $single->fresh()->response_status);
        $other = User::factory()->create();
        $foreignConnection = GoogleCalendarConnection::create([
            'user_id' => $other->id, 'calendar_id' => 'private@example.com', 'access_token' => 'other-token',
        ]);
        $foreign = $foreignConnection->events()->create($this->storedMeetingAttributes('private'));
        foreach ([true, false] as $hidden) {
            $this->putJson(route('calendar.google-calendar.events.visibility', $foreign), ['hidden' => $hidden])->assertNotFound();
        }
        $this->putJson($url, ['hidden' => false])->assertOk();
        $this->putJson($url, ['hidden' => false])->assertOk();
        $this->assertEqualsCanonicalizing(['google-'.$single->id, 'google-'.$sameTitle->id], $visibleIds());
        Http::assertNothingSent();
    }

    /** @test */
    public function google_events_table_combines_the_signed_in_users_google_calendars_only()
    {
        $user = $this->signIn();
        $firstConnection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'first@example.com',
            'calendar_name' => 'First calendar',
            'access_token' => 'first-access-token',
        ]);
        $secondConnection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'second@example.com',
            'calendar_name' => 'Second calendar',
            'access_token' => 'second-access-token',
        ]);
        $otherUser = User::factory()->create();
        $otherConnection = GoogleCalendarConnection::create([
            'user_id' => $otherUser->id,
            'calendar_id' => 'other@example.com',
            'calendar_name' => 'Other calendar',
            'access_token' => 'other-access-token',
        ]);

        $firstEvent = $firstConnection->events()->create($this->storedMeetingAttributes('first-event'));
        $secondEvent = $secondConnection->events()->create(array_replace(
            $this->storedMeetingAttributes('second-event'),
            ['title' => 'Second imported meeting']
        ));
        $otherConnection->events()->create(array_replace(
            $this->storedMeetingAttributes('other-event'),
            ['title' => 'Another user meeting']
        ));
        $firstConnection->events()->create(array_replace(
            $this->storedMeetingAttributes('old-first-event'),
            [
                'title' => 'Old imported meeting',
                'starts_at' => '2026-06-30 19:00:00',
                'ends_at' => '2026-06-30 20:00:00',
            ]
        ));
        $firstConnection->events()->create(array_replace(
            $this->storedMeetingAttributes('far-recurring-event'),
            [
                'title' => 'Far recurring meeting',
                'recurring_event_id' => 'far-recurring-series',
                'starts_at' => '2056-10-01 19:00:00',
                'ends_at' => '2056-10-01 20:00:00',
            ]
        ));

        $this->actingAs($user);
        $tableParameters = $this->googleEventTableParameters();
        $rows = collect($this->getJson(route('calendar.tables.google-events', $tableParameters))->assertOk()->json('data'));

        $this->assertCount(2, $rows);
        $this->assertEqualsCanonicalizing([$firstEvent->id, $secondEvent->id], $rows->pluck('id')->all());
        $this->assertEqualsCanonicalizing(['First calendar', 'Second calendar'], $rows->pluck('calendar')->all());
        $this->assertSame('2026-08-15', $rows->firstWhere('id', $firstEvent->id)['scheduled_date']);
        $this->assertSame('15:00', $rows->firstWhere('id', $firstEvent->id)['starts_at']);
        $this->assertSame('https://calendar.google.com/event?eid=remote', $rows->firstWhere('id', $firstEvent->id)['external_url']);
        $this->assertNull($rows->firstWhere('name', 'Another user meeting'));
    }

    /** @test */
    public function google_events_table_can_search_imported_event_names()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'arthur@example.com',
            'calendar_name' => 'Arthur',
            'access_token' => 'access-token',
        ]);
        $connection->events()->create($this->storedMeetingAttributes('first-event'));
        $matchingEvent = $connection->events()->create(array_replace(
            $this->storedMeetingAttributes('second-event'),
            ['title' => 'Second imported meeting']
        ));

        $tableParameters = $this->googleEventTableParameters();
        $tableParameters['search']['value'] = 'Second imported meeting';
        $searchedRows = collect($this->getJson(route('calendar.tables.google-events', $tableParameters))->assertOk()->json('data'));

        $this->assertSame([$matchingEvent->id], $searchedRows->pluck('id')->all());
    }

    /** @test */
    public function disconnecting_removes_the_connection_and_imported_events()
    {
        $user = $this->signIn();
        $connection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'primary',
            'access_token' => 'access-token',
        ]);
        $connection->events()->create($this->storedMeetingAttributes('remote-event'));
        $otherConnection = GoogleCalendarConnection::create([
            'user_id' => $user->id,
            'calendar_id' => 'other@example.com',
            'access_token' => 'other-access-token',
        ]);

        $this->delete(route('calendar.google-calendar.disconnect', $connection))
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('google_calendar_connections', ['id' => $connection->id]);
        $this->assertDatabaseHas('google_calendar_connections', ['id' => $otherConnection->id]);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'remote-event']);
    }

    private function googleMeeting(string $id, string $responseStatus): array
    {
        return [
            'id' => $id,
            'status' => 'confirmed',
            'summary' => 'Studio planning meeting',
            'description' => 'Bring the fall schedule.',
            'location' => 'Online',
            'htmlLink' => 'https://calendar.google.com/event?eid=remote',
            'hangoutLink' => 'https://meet.google.com/abc-defg-hij',
            'organizer' => ['email' => 'host@example.com', 'displayName' => 'Host'],
            'attendees' => [
                ['email' => 'arthur@example.com', 'self' => true, 'responseStatus' => $responseStatus],
                ['email' => 'host@example.com', 'organizer' => true, 'responseStatus' => 'accepted'],
            ],
            'start' => ['dateTime' => '2026-08-15T15:00:00-04:00'],
            'end' => ['dateTime' => '2026-08-15T16:00:00-04:00'],
            'updated' => '2026-07-21T15:00:00Z',
        ];
    }

    private function googleEventTableParameters(): array
    {
        $column = fn (string $data, string $name, bool $searchable = true, bool $orderable = true) => [
            'data' => $data,
            'name' => $name,
            'searchable' => $searchable ? 'true' : 'false',
            'orderable' => $orderable ? 'true' : 'false',
            'search' => ['value' => '', 'regex' => 'false'],
        ];

        return [
            'draw' => 1,
            'start' => 0,
            'length' => 10,
            'columns' => [
                $column('scheduled_date', 'scheduled_date', false),
                $column('name', 'name'),
                $column('starts_at', 'starts_at', false),
                $column('ends_at', 'ends_at', false),
                $column('calendar', 'calendar'),
                $column('organizer', 'organizer'),
                $column('response_status', 'response_status'),
                $column('restore_url', 'actions', false, false),
            ],
            'order' => [
                ['column' => 0, 'dir' => 'asc'],
                ['column' => 2, 'dir' => 'asc'],
            ],
            'search' => ['value' => '', 'regex' => 'false'],
        ];
    }

    private function storedMeetingAttributes(string $googleEventId): array
    {
        return [
            'google_event_id' => $googleEventId,
            'title' => 'Studio planning meeting',
            'description' => 'Bring the fall schedule.',
            'location' => 'Online',
            'html_link' => 'https://calendar.google.com/event?eid=remote',
            'meeting_url' => 'https://meet.google.com/abc-defg-hij',
            'response_status' => 'needsAction',
            'all_day' => false,
            'starts_at' => '2026-08-15 19:00:00',
            'ends_at' => '2026-08-15 20:00:00',
            'organizer_name' => 'Host',
            'organizer_email' => 'host@example.com',
            'attendees' => [],
        ];
    }
}
