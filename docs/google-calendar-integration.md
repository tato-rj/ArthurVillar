# Google Calendar integration

This integration imports meetings from a user's primary Google Calendar when:

- the signed-in user appears in the Google event's attendee list;
- another person is the organizer; and
- the user's response is not `declined`.

Imported events are read-only in Studio Calendar. RSVP changes, edits, and cancellations remain in Google Calendar. The application performs an incremental sync every five minutes and also exposes a **Sync now** button in Calendar Settings.

## Google Cloud setup

1. Open the [Google Cloud Console](https://console.cloud.google.com/) and select or create a project.
2. Open **APIs & Services → Library**, find **Google Calendar API**, and enable it.
3. Open **Google Auth Platform** and configure the OAuth consent screen.
   - Choose **Internal** if this is a Google Workspace project used only by accounts in that organization.
   - Otherwise choose **External** and add the Google account that will connect as a test user while setting it up.
4. Add this scope to the app:

   ```text
   https://www.googleapis.com/auth/calendar.readonly
   ```

5. Open **Clients**, create an **OAuth client ID**, and choose **Web application**.
6. Add this exact authorized redirect URI:

   ```text
   https://calendar.arthurvillar.com/google-calendar/callback
   ```

7. Copy the client ID and client secret into the production `.env` file:

   ```dotenv
   GOOGLE_CALENDAR_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CALENDAR_CLIENT_SECRET=your-client-secret
   GOOGLE_CALENDAR_REDIRECT_URI=https://calendar.arthurvillar.com/google-calendar/callback
   ```

Do not commit the client secret. OAuth clients left in **External / Testing** status issue refresh tokens that normally expire after seven days for Calendar scopes. For a lasting personal connection, use an Internal Workspace app where applicable or move the external app to Published status and complete any Google verification that your configuration requires.

## Server deployment

Deploy the code, then run:

```bash
php artisan migrate --force
php artisan config:cache
```

The Laravel scheduler must already run once per minute. A typical cron entry is:

```cron
* * * * * cd /path/to/ArthurVillar && php artisan schedule:run >> /dev/null 2>&1
```

The application schedules `calendar:sync-google` every five minutes. You can also invoke it directly:

```bash
php artisan calendar:sync-google
```

## Connect the account

1. Sign in at `calendar.arthurvillar.com`.
2. Open **Settings → Google Calendar**.
3. Select **Connect Google Calendar**.
4. Choose the Google account whose primary calendar should be imported and approve read-only access.

The first import runs immediately. Later changes use Google's incremental sync token. If Google invalidates a sync token, the application automatically rebuilds its imported event cache. Disconnecting removes the encrypted OAuth tokens and every imported Google event from the local database.
