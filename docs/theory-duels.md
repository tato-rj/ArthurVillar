# Theory Duels

## Runtime and packages

The application now requires **PHP 8.3+** and **Laravel 12**. The old Laravel 9 application structure and Laravel Mix build remain in place. Use a current Composer 2 release, Node **22.12+** (or 20.19+, as required by Echo), and the extensions required by `composer check-platform-reqs` (including PDO MySQL for production and Imagick for QR PNG downloads).

Installed with Laravel's `php artisan install:broadcasting --reverb --no-interaction`. Its PHP installation succeeded; its automatic Node installation failed because the terminal had no TTY. Echo and pusher-js were then installed once with npm. The generated Vite Echo file was replaced by the site's Mix-compatible, server-configured transport.

New packages: `laravel/reverb ^1.0` (1.12.0), `laravel-echo ^2.5.0` (2.5.0), `pusher-js ^8.6.0` (8.6.0). Compatible framework dependencies: Laravel `^12.0` (12.69.2), Sanctum `^4.0`, breadcrumbs `^10.0`, webpush `^10.0`, DataTables `^12.0`, Symfony Process `^7.2`, Collision `^8.6`, PHPUnit `^11.5`, Ignition `^2.0`. The obsolete Simple QrCode wrapper conflicted with Fortify's QR dependency; PNG downloads now use `bacon/bacon-qr-code ^3.0` directly. See lock files for exact resolved versions.

## Architecture

- `app/Theory/Duels`: lifecycle, participant authentication, game registry, snapshots, cleanup.
- `Theory/DuelController`: same-origin session/CSRF-protected JSON mutations and a dedicated private-channel signing endpoint.
- `DuelUpdated`: small versioned snapshots broadcast immediately **after commit**, using `ShouldBroadcastNow`. No queue worker is needed for Duel events; `QUEUE_CONNECTION=sync` remains unchanged.
- `DuelAnswerSubmitted`: ephemeral correct/incorrect feedback on the same private channel. Shared engine adapters report confirmed checks (answer taps in Beat Hero and food choices in Note Python); only the opponent name heartbeats with a temporary green/red color. Feedback never changes progress or score and is not replayed after reconnect. A five-second grace period accepts a final answer notification arriving after finish.
- Tables: `theory_duels` (UUID, settings, seed, lifecycle timestamps, revision, historical code and unique nullable join code); `theory_duel_players` (one unique host/guest per Duel, SHA-256 credential hash, ready/progress/score/result/checkpoint).
- Secret: 32 cryptographically random bytes retained in the server session. The browser uses its encrypted HttpOnly session cookie. No login and no player secrets in URLs, JS storage, JSON responses, or broadcasts. Keep `SESSION_DRIVER=file` on a single server, or use shared database/Redis sessions and locks on multiple servers. Do not change to the cookie session driver; room creation/join use Laravel session blocking.
- Exact private channel `private-theory.duel.<uuid>` is signed only after validating that session's participant secret. Standard authenticated broadcasting remains separate.
- Codes expire after 15 minutes. The unique `join_code` is released on joining/cancellation/expiration; historical codes are never authorization. Join/cancel/ready/progress/finish use room locks; guest claiming also uses a conditional atomic update. Request retries are idempotent.
- `resources/js/music/duel`: lobby, Echo transport, authoritative countdown, reconnect, mutation retry queue, status/results UI, seeded RNG and four engine adapters. The 11 game entry points call `bootGame`; ordinary single-player still constructs and starts immediately.
- Duel results reuse the regular results score card, animated music characters, and buttons in a full-screen comparison. Final points determine the winner; accuracy breaks tied scores, and equal scores/accuracy produce a draw. Finish time is displayed but does not break ties. Both browsers derive the same outcome from saved server results. The first finisher sees a waiting screen until both results arrive; refreshing restores the comparison. Winner confetti respects reduced-motion preferences and does not repeat on duplicate state updates.
- The waiting results screen plays the final-results cue once when the opponent finishes, respecting the sound setting. Both completed players can choose **Play again**. Once both accept, the same room, credentials, settings, and WebSocket subscription start a fresh countdown and seeded run in place. Scores, checkpoints, and game history reset. The seed identifies gameplay requests so delayed updates and rematch retries cannot affect a later run. Completed pages stay subscribed for rematches, including after refresh.
- Server timestamps plus measured HTTP round-trip midpoint compensate browser clock differences. Laravel must confirm `playing` before gameplay unlocks.
- Progress advances one round and sequence number at a time, never backwards or past the configured total. Scores are bounded per round and final bonuses bounded to 4×. Gameplay answer checking remains in the existing browser engines: this is **not cheat-proof server verification of answers**. It blocks impossible jumps and impersonation, but a modified client can still falsify plausible round completions. No competitive rankings are added.
- Reverb reconnects automatically and subscription success refetches authoritative state. Shared browser presence in both the lobby and gameplay sends authenticated HTTP heartbeats every 15 seconds, independently of Reverb. Page exit sends a CSRF-protected beacon, shows the opponent as disconnected, and becomes Leave Duel after a 30-second return grace period (normally detected within 30–45 seconds by the surviving heartbeat). Refresh or back-forward restoration registers a new connection marker, clears departure, and ignores late signals from the previous page. Without an exit signal, two minutes without a heartbeat counts as leaving. The scheduled cleanup also closes rooms if both browsers disappear. Browser/mobile background throttling or prolonged network loss can reach this timeout; browser shutdown notification itself is best effort. Persistent state remains server-side.
- Every active Duel page, including the host lobby and ready screen, checks real browser interaction. After 30 idle seconds it shows **Still playing?** with a 10-second countdown and an explicit **Yes, I’m still playing** button. Mouse/touch/keyboard/scroll interaction resets the idle clock before the warning; opponent events and heartbeats do not. The warning is not dismissed by incidental movement. Expiry sends a CSRF-protected leave beacon and immediately returns that player to all games. The same atomic leave endpoint ends the match and notifies the opponent. Countdown uses elapsed time, so switching tabs does not pause it. Finished Duels disable this check.
- Either player can use **Leave Duel** beneath the game controls, on the ready/countdown screen, or while waiting for the other's result. It ends the unfinished Duel atomically, returns that player to the game list, and immediately tells the opponent who left. The first departure is stored in `theory_duels.left_by`; retries do not change it. Finished results are retained when leaving a completed match.

## Games and existing-mode limits

| Game | Duel |
| --- | --- |
| Intervals Lab | Enabled |
| Chords Lab | Enabled |
| Pitch Detective | Enabled |
| Chord Detective | Enabled |
| Tone Trek | Enabled |
| Note Python | Enabled |
| Keys Lab | Enabled |
| Note Nest | Enabled |
| Note Match | Enabled |
| Memory Wizard | Enabled |
| Beat Hero | Enabled |
| Open Staff | Sandbox; no score, round progress or completion, so no competitive Duel |

Practice mode is endless in the current engines; the new Duel button explains that practice must be turned off. Its single-player behavior is unchanged.

Challenge helpers accept an optional local RNG. Each round resets the seeded stream, separate from cosmetic effects. Staff/grid/card games receive identical material. Note Python receives seeded musical choices, but snake routes, food locations, head-note choices and spelling fallbacks can diverge with movement; identical snake boards throughout a match would require redesigning that game.

Refresh within the departure grace period preserves server identity/settings/ready/countdown/progress/score/results. Completed-round checkpoints retain engine history (including Memory Wizard's growing sequence) privately for the owning player. An unfinished round restarts on refresh; partially entered notes and per-round timers are not checkpointed. Note Python restarts its current snake board at the saved completed-round count. Single-player results/leaderboard submission are replaced by the Duel results only while in Duel mode.

The Tone Trek adapter counts timed-out/skipped rounds as completed Duel rounds: its existing single-player skip advances the round without advancing the progress bar. Note Python crash restarts retain earned Duel rounds and score. Refresh after the last round reuses each engine's existing final accuracy and bonus calculation.

## Environment

Generate real application credentials; never commit the secret. The app key is intentionally public browser connection information. Configuration is rendered into the page; **no Vite/MIX environment variables or rebuild are needed to change the WebSocket endpoint**.

```dotenv
BROADCAST_CONNECTION=reverb
REVERB_APP_ID=theory
REVERB_APP_KEY=<random-public-key>
REVERB_APP_SECRET=<random-secret>
# Reverb listens only on the local interface behind the reverse proxy.
REVERB_SERVER_HOST=127.0.0.1
REVERB_SERVER_PORT=8080
# Laravel sends signed broadcasts to this internal endpoint.
REVERB_HOST=127.0.0.1
REVERB_PORT=8080
REVERB_SCHEME=http
# Browser connections use the HTTPS proxy hostname.
REVERB_PUBLIC_HOST=theory.arthurvillar.com
REVERB_PUBLIC_PORT=443
REVERB_PUBLIC_SCHEME=https
REVERB_ALLOWED_ORIGINS=theory.arthurvillar.com
SESSION_SECURE_COOKIE=true
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
```

Origins are comma-separated hostnames, without schemes. Add only your actual local/staging hostnames. The Reverb installer also added `VITE_REVERB_*` to the untracked local `.env`; they are unused by this Mix application.

## Local development

Select PHP 8.3 for CLI **and your web server**. For this Mac's installed runtime:

```bash
export PATH=/opt/homebrew/opt/php@8.3/bin:/opt/homebrew/bin:$PATH
composer install
npm ci
php artisan migrate
npm run development
```

Terminal 1 (domain routing is important):

```bash
APP_DOMAIN=localhost APP_URL=http://localhost:8007 php artisan serve --host=127.0.0.1 --port=8007
```

Terminal 2 (browser endpoint must be `127.0.0.1:8080`, scheme `http`, in local `.env`):

```bash
REVERB_ALLOWED_ORIGINS=theory.localhost,localhost,127.0.0.1 php artisan reverb:start --host=127.0.0.1 --port=8080
```

Open **http://theory.localhost:8007** in two separate browsers, or one regular and one private browser session. Two normal tabs share an anonymous identity and cannot be opposite players. An existing Valet setup can instead serve `theory.arthurvillar.test`, with that hostname allowed in Reverb.

For an existing Valet site, run `valet isolate php@8.3` in the project directory to select its PHP runtime. Valet may prompt for your macOS administrator password; the automated environment could not perform that privileged change.

This Mac originally had Valet 2.18.10, which supports PHP only through 8.1 and does not offer `isolate`. Its shell now selects the installed PHP 8.3.12 runtime, and current Composer is available in `~/.local/bin`. To finish switching the root-owned web services, open a new Terminal and run:

```bash
composer global require 'laravel/valet:^4.0' --with-all-dependencies
valet use php@8.3 --force
valet install
php -v
```

Enter your macOS administrator password when Valet requests it. A Composer dry run confirmed the Valet upgrade resolves. Old custom Valet drivers must be migrated to the Valet 4 namespace/type signatures; the unmodified, inactive Valet 2 sample driver can be moved out of `Drivers/*.php` before upgrading.

Optional during editing: `npm run watch`. No Duel queue worker is required. Run the scheduler locally with `php artisan schedule:work` if testing expiration cleanup.

## Production requirements

**Ordinary shared hosting that prohibits long-running PHP processes or WebSocket proxying cannot run Reverb.** This requires a VPS/container/hosting service that supports persistent processes, a PHP 8.3 web runtime, and TLS/WebSocket reverse proxy configuration. No external paid WebSocket service is configured.

Supervise `php artisan reverb:start --host=127.0.0.1 --port=8080` with Supervisor/systemd or your host's process manager. Run it as the application user, from the release directory, with automatic restart and log rotation. Increase process file descriptor limits for expected connections; Reverb's default event loop has practical connection limits. On deploying a new release, update the supervised working directory and restart that service.

The HTTPS virtual host must proxy `/app` (WebSocket connection) and `/apps` (signed broadcast API) to Reverb when exposing both on the public domain. Laravel's internal endpoint above only needs localhost access to `/apps`. Example Nginx location inside the existing TLS server:

```nginx
location ~ ^/apps?(/|$) {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 600s;
    proxy_send_timeout 600s;
}
```

Use a valid certificate for `REVERB_PUBLIC_HOST`. HTTPS pages must connect through WSS (`REVERB_PUBLIC_SCHEME=https`), never insecure WS. Public firewall: HTTPS 443 (and optional HTTP 80 redirect); **do not expose internal port 8080**. Reverse proxies/CDNs/load balancers must permit WebSocket upgrades and sufficiently long idle timeouts. If Reverb runs on a different machine, permit its internal port only from the web server and use an appropriate protected/private connection.

Add the normal Laravel scheduler cron, running PHP 8.3, once per minute:

```cron
* * * * * cd /path/to/current-release && php artisan schedule:run >> /dev/null 2>&1
```

Waiting/ready rooms expire after 15 minutes, abandoned active rooms after one day without updates, finished/cancelled/expired records are pruned after seven days. A database/Redis queue worker is only required if you independently change the site's queue connection; then supervise `php artisan queue:work --tries=3` and restart it during deploys.

## Deployment

Back up the production database before the framework upgrade. Verify the web server and every CLI/supervised process use PHP 8.3+.

Build frontend assets on the local Mac and deploy the generated assets with the PHP source. Node/npm are build tools, not production runtime requirements; Reverb runs in PHP. With the existing local dependencies and static assets, run this from the project root:

```bash
npm --ignore-scripts run production
```

This runs the Mix production compiler without the static-copy pre-script, which replaces the generated images/vendor directories and would remove the existing local synced duplicates. Deploy the generated JavaScript/CSS, emitted build files, and `public/mix-manifest.json` together. Preserve the server's `.env`, uploads, and storage files. Do not upload `node_modules`. For a clean build machine, `npm ci` installs the locked frontend dependencies; building on the server is also valid but optional. Do not use `npm ci --omit=dev` on the build machine, because Mix, Echo, and other required build dependencies are in devDependencies.

On the server, install Composer dependencies from the committed lock file and apply the scoped migrations:

Production has tables created manually and older migrations still recorded as pending. Do not run an unrestricted `php artisan migrate --force` on that database. Some older migrations change existing records or drop columns. The commands below select only the additive Duel migrations. Check `php artisan migrate:status` and whether the Duel tables already exist first; if they were created manually, compare their actual schema before running these migrations or recording them as applied. Do not blindly mark all historical migrations as run. Reconcile the historical schema and migration records separately.

```bash
composer install --no-dev --prefer-dist --optimize-autoloader
composer check-platform-reqs --no-dev
php artisan migrate --force \
  --path=database/migrations/2026_09_26_200000_create_theory_duels.php \
  --path=database/migrations/2026_09_26_220000_add_left_by_to_theory_duels.php \
  --path=database/migrations/2026_09_27_000000_add_browser_presence_to_theory_duel_players.php \
  --path=database/migrations/2026_10_01_000000_add_rematch_to_theory_duel_players.php
php artisan optimize:clear
php artisan config:cache
php artisan view:cache
php artisan reverb:restart
# Restart/update the supervised Reverb service for the new release directory.
# If using a queue worker for other features:
php artisan queue:restart
```

Restart PHP-FPM/opcache according to the host. Keep `APP_KEY` unchanged so existing encrypted sessions remain valid.

## Verification

```bash
php artisan test
node --test tests/JavaScript/*.test.cjs
# With the local web server and Reverb running:
node tests/Integration/theory-duel-reverb.cjs
npm run development
```

New feature tests cover all games' restoration/configuration, anonymous credentials and private signing, state transitions, progress/finish idempotency, cleanup, and a real forked simultaneous guest race on separate SQLite connections. The concurrency test needs `pcntl` on macOS/Linux.

The original Laravel 9 checkout already has 12 failing backend tests (calendar public copy/events, external scheduler, lesson-record view, location usage, student UI, and travel routes). A separate original checkout was tested to establish the baseline; the upgrade retains the same failure set. The theory-specific existing tests pass.

### Two-browser/two-device checklist

1. Host configures a game and clicks **Start Multiplayer Duel**.
2. Guest clicks **Join a Duel**, pastes the four-digit code, then joins.
3. Host receives the join immediately; both navigate to the same game.
4. Guest clicks **I’m ready** and sees each player’s readiness while waiting for host.
5. Host clicks **I’m ready**; both see 3, 2, 1 and begin together.
6. Complete a round on A; its progress appears on B. Repeat from B to A.
7. Finish A; B sees “Opponent finished” and can continue.
8. Finish B; both show the two results and A hears the completion cue if sound is enabled. Click **Play again** on A, then B; both start a fresh countdown with the same settings and connection. Repeat a match and verify scores and accuracy reset.
9. Repeat with refresh while waiting, ready, during countdown and after a completed round.
10. Close/reopen one browser; confirm disconnect indication and recovery.
11. Try a wrong/expired/full code, a third browser, and cancellation while waiting.
12. Repeat across the remaining games, including audio/microphone input on a supported device.

Local verification also completed the full Reverb lifecycle using independent HTTP cookie sessions and two actual WebSocket clients; the host received the join notification in 22 ms. Two browser sessions verified join/navigation, waiting for readiness, synchronized countdown, matching opening material and host gameplay.

Browser presence adds `connection_id` and `departed_at` to `theory_duel_players` in migration `2026_09_27_000000_add_browser_presence_to_theory_duel_players`. Use the scoped migration command in the Deployment section when deploying this change, rebuild assets, and refresh both players before testing close/refresh. Timeout defaults are in `config/theory-duels.php`; no additional environment variables or processes are required.
