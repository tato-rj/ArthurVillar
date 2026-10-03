# Recording uploads

The listening recording create and edit forms submit MP3 files as multipart POST
requests (the edit form uses Laravel's PATCH method field).

`public/.user.ini` allows files up to 128 MiB and request bodies up to 132 MiB,
leaving room for the other form fields. Deploy this hidden file with the rest of
`public/`. PHP CGI/FastCGI, including PHP-FPM, reads it before parsing uploads.
The default refresh interval is five minutes; restarting PHP-FPM applies it sooner.

If the host disables `.user.ini` or enforces PHP admin values, set
`upload_max_filesize = 128M` and `post_max_size = 132M` in the hosting control panel
or the site's PHP configuration instead. Apache with mod_php also needs these
settings in its PHP configuration.

For Nginx, the site's `client_max_body_size` must be at least `132m`; reload Nginx
after changing it. Any upstream proxy must permit the same request size.

Verify the settings in the web PHP runtime, since CLI PHP can use a different
configuration. Then replace an existing recording with an MP3 larger than 2 MiB
and confirm the new audio plays. A failed upload leaves the original recording
unchanged. PHP upload errors now distinguish size limits from interrupted uploads.

PHP documentation: [per-directory INI files](https://www.php.net/manual/en/configuration.file.per-user.php)
and [upload errors](https://www.php.net/manual/en/features.file-upload.errors.php).
