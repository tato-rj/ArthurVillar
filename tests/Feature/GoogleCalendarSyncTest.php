<?php

namespace Tests\Feature;

use App\Calendar\Scheduler;
use App\Models\Calendar\GoogleCalendarConnection;
use App\Models\Calendar\GoogleCalendarEvent;
use App\Services\GoogleCalendarSync;
use Carbon\CarbonImmutable;
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
    public function it_redirects_to_google_with_offline_read_only_access_and_oauth_state()
    {
        $this->signIn();

        $response = $this->get(route('calendar.google-calendar.connect'));
        $location = $response->headers->get('Location');

        $response->assertRedirect();
        $this->assertStringStartsWith('https://accounts.google.com/o/oauth2/v2/auth?', $location);

        parse_str(parse_url($location, PHP_URL_QUERY), $query);

        $this->assertSame('offline', $query['access_type']);
        $this->assertSame('consent', $query['prompt']);
        $this->assertSame('https://www.googleapis.com/auth/calendar.readonly', $query['scope']);
        $this->assertNotEmpty($query['state']);
        $this->assertSame($query['state'], session('google_calendar_oauth_state'));
    }

    /** @test */
    public function the_oauth_callback_connects_without_waiting_for_the_first_sync()
    {
        CarbonImmutable::setTestNow('2026-07-21 12:00:00');
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
        $this->assertDatabaseCount('google_calendar_events', 0);

        Http::assertNotSent(fn ($request) => str_contains($request->url(), '/events'));

        CarbonImmutable::setTestNow();
    }

    /** @test */
    public function the_first_sync_imports_only_meetings_created_by_someone_else()
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
                    array_replace_recursive($this->googleMeeting('my-own-meeting', 'accepted'), [
                        'organizer' => ['email' => 'arthur@example.com', 'self' => true],
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
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'my-own-meeting']);
        $this->assertDatabaseMissing('google_calendar_events', ['google_event_id' => 'declined-meeting']);
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
        $this->assertSame('sync-token-2', $connection->fresh()->sync_token);

        Http::assertSent(function ($request) {
            return str_contains($request->url(), '/calendar/v3/calendars/arthur%40example.com/events')
                && $request['syncToken'] === 'sync-token-1';
        });
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

        $googleEvent = app(Scheduler::class)->generalEvents([
            'range_start' => '2026-08-01',
            'range_end' => '2026-08-31',
            'start' => '2026-08-01',
            'end' => '2026-08-31',
        ], $user->id)->firstWhere('id', 'google-'.$event->id);

        $this->assertNotNull($googleEvent);
        $this->assertSame('Google Calendar', $googleEvent['event_type']);
        $this->assertSame('https://calendar.google.com/event?eid=remote', $googleEvent['external_url']);
        $this->assertSame('needsAction', $googleEvent['response_status']);
        $this->assertTrue($googleEvent['read_only']);
        $this->assertSame('', $googleEvent['edit_url']);
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

        $this->delete(route('calendar.google-calendar.disconnect'))
            ->assertRedirect()
            ->assertSessionHas('success');

        $this->assertDatabaseMissing('google_calendar_connections', ['id' => $connection->id]);
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
