# Admin subdomain

The admin area uses `admin.APP_DOMAIN` and is restricted to Arthur's account by
both `auth` and `arthur` middleware. Fortify continues to serve `/login` and
`/logout` on the current host; public registration remains exclusive to Scheduler.

User management lives at `/users` and `/users/accounts/{user}`. Theory management
lives at `/theory/mic`, `/theory/audio`, `/theory/leaderboard`, `/theory/tournaments`,
and `/theory/stats`. Games, anonymous Duels, leaderboard reads and score submission
remain on Theory. Admin leaderboard filtering and deletion use admin-host routes.
Tournaments and Stats remain placeholders. Audio Control retains its existing
preview-only behavior: sliders change playback on that page and do not save global
game volumes.

## Server configuration

Point the admin virtual host at the same Laravel application's `public/` directory
as Theory, with the appropriate HTTPS certificate. Both hosts then use the same
`config/database.php` connection and `DB_*` environment values, so microphone
settings, leaderboard entries and users are shared automatically. There is no
browser connection to a database and no additional cross-origin API configuration.

If admin is deployed as a separate checkout, configure its `DB_*` values to use the
same database as Theory (with credentials permitted to read and write those tables).
The same source code must also be deployed to Theory to remove the old management
routes there.

Logging in separately on admin works with the existing host-only session cookie.
Sharing a login across hosts is optional; it requires the same `APP_KEY`,
`SESSION_COOKIE`, session driver and session storage, plus `SESSION_DOMAIN` set to
the parent domain (for example `.arthurvillar.com`). File sessions only share across
checkouts if they use the same session directory. Use secure cookies in production.
Do not generate a new application key for the existing deployment.

After deployment, rebuild the route and configuration caches:

```bash
php artisan config:cache
php artisan route:cache
```
