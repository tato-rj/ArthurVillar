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

        return redirect()->away($client->authorizationUrl($state, $request->user()->email));
    }

    public function callback(
        Request $request,
        GoogleCalendarClient $client,
        GoogleCalendarSync $sync
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
            $existing = GoogleCalendarConnection::query()
                ->where('user_id', $request->user()->id)
                ->first();

            $connection = GoogleCalendarConnection::query()->updateOrCreate(
                ['user_id' => $request->user()->id],
                [
                    'calendar_id' => $calendar['id'] ?? 'primary',
                    'calendar_name' => $calendar['summary'] ?? $request->user()->email,
                    'calendar_timezone' => $calendar['timeZone'] ?? null,
                    'access_token' => $tokens['access_token'],
                    'refresh_token' => $tokens['refresh_token'] ?? $existing?->refresh_token,
                    'token_expires_at' => now()->addSeconds((int) ($tokens['expires_in'] ?? 3600)),
                    'sync_token' => null,
                    'last_error' => null,
                ]
            );

            $sync->sync($connection);
        } catch (Throwable $exception) {
            report($exception);

            return redirect()->route('calendar.home')
                ->with('error', 'Google Calendar setup or first sync failed: '.$exception->getMessage());
        }

        return redirect()->route('calendar.home')
            ->with('success', 'Google Calendar connected and synchronized.');
    }

    public function sync(Request $request, GoogleCalendarSync $sync)
    {
        $connection = GoogleCalendarConnection::query()
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        try {
            $changes = $sync->sync($connection);
        } catch (Throwable $exception) {
            report($exception);

            return back()->with('error', 'Google Calendar sync failed: '.$exception->getMessage());
        }

        return back()->with('success', "Google Calendar synchronized ({$changes} changes received).");
    }

    public function disconnect(Request $request)
    {
        GoogleCalendarConnection::query()
            ->where('user_id', $request->user()->id)
            ->delete();

        return back()->with('success', 'Google Calendar disconnected and imported events removed.');
    }
}
