# Listening MP3 conversion on the server

## Recurring YouTube bot checks

`Sign in to confirm you're not a bot` is the fatal error. Expired or rotated
YouTube cookies are a common cause. The Python deprecation and missing JavaScript
runtime messages are separate warnings; updating Python alone will not clear a bot check.

1. Open a fresh private/incognito browser window and sign into YouTube.
2. In that same tab, open `https://www.youtube.com/robots.txt`.
3. Export only the YouTube cookies in Netscape cookies.txt format, then close the
   private window. Do not reopen that session. Follow the official
   [YouTube cookie export instructions](https://github.com/yt-dlp/yt-dlp/wiki/Extractors#exporting-youtube-cookies).
4. Replace the server cookie file configured by `YT_COOKIES_PATH`. Keep it outside
   the public directory and Git, and readable by the PHP-FPM user. For example,
   a file owned by `root:www-data` with mode `0640` works when PHP runs as `www-data`.
   The parent directories must also allow that user to traverse them.
5. If you changed `.env`, rebuild the cache from the deployed project directory:

   ```bash
   php artisan config:cache
   ```

Replacing the contents of the same cookie file does not require rebuilding the
configuration cache. The application uses a private temporary copy for each
conversion, so yt-dlp cannot rewrite the source cookie file.

Retry the failed URL using the same operating-system user as PHP-FPM:

```bash
sudo -u www-data php artisan youtube:mp3 'https://www.youtube.com/watch?v=lBCWzz8ZbZA' recordings/audio
```

A successful run prints the saved MP3 path. Failures return a nonzero exit code
and retain the downloader diagnostics in `storage/logs` (or the configured log
channel). If fresh cookies still fail, the server IP or YouTube session may be
blocked. Cookies do not guarantee that YouTube will accept the request. Consult
the official [YouTube extractor guidance](https://github.com/yt-dlp/yt-dlp/wiki/Extractors).

## Runtime configuration

Use absolute executable paths on the server, especially for PHP-FPM:

```dotenv
YT_PATH=/opt/yt-dlp/bin/yt-dlp
FFMPEG_PATH=/usr/bin/ffmpeg
DENO_PATH=/usr/local/bin/deno
YT_COOKIES_PATH=/var/tmp/youtube-cookies.txt
```

Use your actual installed paths. An empty `YT_COOKIES_PATH` explicitly disables
cookies; an unreadable configured file fails with a configuration error.

For a pip installation, install yt-dlp and its challenge solver dependencies in
a virtual environment using Python 3.11 or newer. For example, if `python3.11`
is installed:

```bash
sudo python3.11 -m venv /opt/yt-dlp
sudo /opt/yt-dlp/bin/python -m pip install --upgrade 'yt-dlp[default]'
```

Updating a different yt-dlp installation will not update the executable in
`YT_PATH`. Verify that exact installation:

```bash
/opt/yt-dlp/bin/python --version
/opt/yt-dlp/bin/yt-dlp --version
/usr/local/bin/deno --version
```

Deno must be version 2.3 or newer. See the official
[JavaScript runtime setup guide](https://github.com/yt-dlp/yt-dlp/wiki/EJS).
The application explicitly passes Deno to yt-dlp and enables `ejs:npm` as a
fallback for missing solver scripts. PHP-FPM must be able to write to
`storage/app/youtube-cache` for the runtime caches. Run `php artisan config:cache`
after changing any executable paths.
