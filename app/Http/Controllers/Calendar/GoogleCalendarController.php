<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\GoogleCalendarConnection;
use App\Services\GoogleCalendarClient;
use App\Services\GoogleCalendarSync;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Throwable;

class GoogleCalendarController extends Controller
{
    private const STATE_SESSION_KEY = 'google_calendar_oauth_state';

    public function connect(Request $request, GoogleCalendarClient $client)
    {
        $state = Str::random(64);
        $request->session()->put(self::STATE_SESSION_KEY, $state);

        return redirect()->away($client->authorizationUrl($state));
    }

    public function callback(
        Request $request,
        GoogleCalendarClient $client
    ) {
        $expectedState = $request->session()->pull(self::STATE_SESSION_KEY);

        abort_unless(
            $expectedState && is_string($request->input('state'))
                && hash_equals($expectedState, $request->input('state')),
            419,
            'The Google authorization request expired. Please try connecting again.'
        );

        if ($request->filled('error')) {
            return redirect()->route('calendar.home')
                ->with('error', 'Google Calendar authorization was canceled.');
        }

        $request->validate(['code' => ['required', 'string']]);

        try {
            $tokens = $client->exchangeAuthorizationCode($request->input('code'));
            $calendar = $client->primaryCalendar($tokens['access_token']);
            $profile = [];

            try {
                $profile = $client->userProfile($tokens['access_token']);
            } catch (Throwable $exception) {
                report($exception);
            }

            $calendarId = $calendar['id'] ?? 'primary';
            $existing = GoogleCalendarConnection::query()
                ->where('user_id', $request->user()->id)
                ->where('calendar_id', $calendarId)
                ->first();

            GoogleCalendarConnection::query()->updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'calendar_id' => $calendarId,
                ],
                [
                    'calendar_name' => $calendar['summary'] ?? $request->user()->email,
                    'calendar_timezone' => $calendar['timeZone'] ?? null,
                    'profile_picture_url' => $this->safeProfilePictureUrl($profile['picture'] ?? null)
                        ?: $existing?->profile_picture_url,
                    'access_token' => $tokens['access_token'],
                    'refresh_token' => $tokens['refresh_token'] ?? $existing?->refresh_token,
                    'token_expires_at' => now()->addSeconds((int) ($tokens['expires_in'] ?? 3600)),
                    'sync_token' => null,
                    'last_error' => null,
                ]
            );
        } catch (Throwable $exception) {
            report($exception);

            return redirect()->route('calendar.home')
                ->with('error', 'Google Calendar setup failed: '.$exception->getMessage());
        }

        return redirect()->route('calendar.home')
            ->with('success', 'Google Calendar connected. The first sync will run automatically within five minutes.');
    }

    private function safeProfilePictureUrl(?string $url): ?string
    {
        if (! $url || ! filter_var($url, FILTER_VALIDATE_URL)) {
            return null;
        }

        return parse_url($url, PHP_URL_SCHEME) === 'https' ? $url : null;
    }

    public function sync(
        Request $request,
        GoogleCalendarConnection $connection,
        GoogleCalendarSync $sync
    )
    {
        abort_unless($connection->user_id === $request->user()->id, 404);

        try {
            $changes = $sync->sync($connection);
        } catch (Throwable $exception) {
            report($exception);

            return back()->with('error', 'Google Calendar sync failed: '.$exception->getMessage());
        }

        return back()->with(
            'success',
            "{$connection->calendar_name} synchronized ({$changes} changes received)."
        );
    }

    public function disconnect(Request $request, GoogleCalendarConnection $connection)
    {
        abort_unless($connection->user_id === $request->user()->id, 404);

        $calendarName = $connection->calendar_name ?: 'Google Calendar';
        $connection->delete();

        return back()->with('success', "{$calendarName} disconnected and its imported events removed.");
    }
}
