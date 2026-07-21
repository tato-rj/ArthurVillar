<?php

namespace App\Services;

use App\Models\Calendar\GoogleCalendarConnection;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class GoogleCalendarClient
{
    private const AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
    private const TOKEN_URL = 'https://oauth2.googleapis.com/token';
    private const API_URL = 'https://www.googleapis.com/calendar/v3';
    private const USER_INFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';
    private const SCOPE = 'openid profile https://www.googleapis.com/auth/calendar.readonly';

    public function isConfigured(): bool
    {
        return filled(config('services.google_calendar.client_id'))
            && filled(config('services.google_calendar.client_secret'));
    }

    public function authorizationUrl(string $state): string
    {
        $this->ensureConfigured();

        return self::AUTHORIZATION_URL.'?'.http_build_query(array_filter([
            'client_id' => config('services.google_calendar.client_id'),
            'redirect_uri' => $this->redirectUri(),
            'response_type' => 'code',
            'scope' => self::SCOPE,
            'access_type' => 'offline',
            'include_granted_scopes' => 'true',
            'prompt' => 'consent select_account',
            'state' => $state,
        ]), '', '&', PHP_QUERY_RFC3986);
    }

    public function exchangeAuthorizationCode(string $code): array
    {
        $this->ensureConfigured();

        return Http::asForm()
            ->post(self::TOKEN_URL, [
                'client_id' => config('services.google_calendar.client_id'),
                'client_secret' => config('services.google_calendar.client_secret'),
                'code' => $code,
                'grant_type' => 'authorization_code',
                'redirect_uri' => $this->redirectUri(),
            ])
            ->throw()
            ->json();
    }

    public function primaryCalendar(string $accessToken): array
    {
        return $this->request($accessToken)
            ->get(self::API_URL.'/calendars/primary')
            ->throw()
            ->json();
    }

    public function userProfile(string $accessToken): array
    {
        return $this->request($accessToken)
            ->get(self::USER_INFO_URL)
            ->throw()
            ->json();
    }

    public function listEvents(GoogleCalendarConnection $connection, array $parameters): array
    {
        return $this->request($this->accessToken($connection))
            ->get(
                self::API_URL.'/calendars/'.rawurlencode($connection->calendar_id).'/events',
                $parameters
            )
            ->throw()
            ->json();
    }

    public function accessToken(GoogleCalendarConnection $connection): string
    {
        if ($connection->token_expires_at && $connection->token_expires_at->gt(now()->addMinute())) {
            return $connection->access_token;
        }

        if (! $connection->refresh_token) {
            throw new RuntimeException('Google did not provide a refresh token. Disconnect and authorize the calendar again.');
        }

        $tokens = Http::asForm()
            ->post(self::TOKEN_URL, [
                'client_id' => config('services.google_calendar.client_id'),
                'client_secret' => config('services.google_calendar.client_secret'),
                'grant_type' => 'refresh_token',
                'refresh_token' => $connection->refresh_token,
            ])
            ->throw()
            ->json();

        $connection->update([
            'access_token' => $tokens['access_token'],
            'token_expires_at' => now()->addSeconds((int) ($tokens['expires_in'] ?? 3600)),
        ]);

        return $connection->fresh()->access_token;
    }

    public function redirectUri(): string
    {
        return config('services.google_calendar.redirect_uri')
            ?: route('calendar.google-calendar.callback');
    }

    private function request(string $accessToken): PendingRequest
    {
        return Http::acceptJson()
            ->withToken($accessToken)
            ->timeout(30)
            ->retry(2, 250);
    }

    private function ensureConfigured(): void
    {
        if (! $this->isConfigured()) {
            throw new RuntimeException('Google Calendar OAuth credentials are not configured.');
        }
    }
}
