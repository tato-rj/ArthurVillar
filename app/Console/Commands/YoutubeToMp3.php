<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\ExecutableFinder;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ExceptionInterface;

class YoutubeToMp3 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'youtube:mp3 {url} {folder} {start?} {end?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Convert a YouTube link to MP3';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $basename = $this->basename();
        $filename = $basename . '.mp3';
        $directory = $this->directory();
        $filepath = $directory . '/' . $filename;

        $start = $this->argument('start');
        $end = $this->argument('end');

        $ytDlpPath = config('youtube.yt_dlp_path');
        $ffmpegPath = config('youtube.ffmpeg_path');
        $denoPath = config('youtube.deno_path');
        $cookiesPath = config('youtube.cookies_path');
        $temporaryCookies = null;

        try {
            // PHP-FPM may have a different PATH from an interactive SSH shell.
            $denoPath = str_contains($denoPath, DIRECTORY_SEPARATOR)
                ? (is_file($denoPath) && is_executable($denoPath) ? $denoPath : null)
                : (new ExecutableFinder)->find($denoPath, null, explode(PATH_SEPARATOR, $this->processEnvironment()['PATH']));
            if (!$denoPath) {
                throw new \RuntimeException('YouTube conversion requires Deno 2.3 or newer. Install Deno, set DENO_PATH to its executable, and rebuild the Laravel configuration cache.');
            }

            $runtime = new Process([$denoPath, '--version'], null, $this->processEnvironment());
            $runtime->setTimeout(15);
            $runtime->mustRun();
            if (!preg_match('/deno (\d+\.\d+\.\d+)/', $runtime->getOutput(), $version)
                || version_compare($version[1], '2.3.0', '<')) {
                throw new \RuntimeException('YouTube conversion requires Deno 2.3 or newer. Update the executable configured in DENO_PATH.');
            }

            if ($cookiesPath) {
                if (!is_file($cookiesPath) || !is_readable($cookiesPath)) {
                    throw new \RuntimeException('The server cannot read the YouTube cookies file. Check YT_COOKIES_PATH and its permissions, then rebuild the Laravel configuration cache.');
                }

                // yt-dlp writes its cookie jar on exit. Keep the source private and
                // unchanged, and avoid concurrent downloads sharing a writable jar.
                $temporaryCookies = tempnam(sys_get_temp_dir(), 'youtube-cookies-');
                if ($temporaryCookies === false || !copy($cookiesPath, $temporaryCookies)) {
                    throw new \RuntimeException('The server could not prepare the YouTube cookies file. Check the server temporary directory permissions.');
                }
            }

            $arguments = [
                $ytDlpPath,

                '--ffmpeg-location',
                $ffmpegPath,

                '--js-runtimes',
                'deno:' . $denoPath,

                '--remote-components',
                'ejs:npm',

                '--no-playlist',

                '-f',
                'bestaudio/best',

                '-x',

                '--audio-format',
                'mp3',

                '-o',
                $directory . '/' . $basename . '.%(ext)s',
            ];

            if ($temporaryCookies) {
                $arguments[] = '--cookies';
                $arguments[] = $temporaryCookies;
            }

            /*
             * If start and end times are supplied, download only
             * the requested section of the YouTube video.
             */
            if ($start && $end) {
                $arguments[] = '--download-sections';
                $arguments[] = '*' . $start . '-' . $end;
            }

            /*
             * Add the YouTube URL as the final argument.
             */
            $arguments[] = $this->url();

            /*
             * Run yt-dlp.
             */
            $process = new Process(
                $arguments,
                $directory,
                $this->processEnvironment()
            );

            $process->setTimeout(600);

            $process->mustRun();

            /*
             * Apply the fade-in/fade-out after yt-dlp has
             * successfully created the MP3.
             */
            $this->applyFade($filepath);

            $this->info(
                $this->argument('folder') . '/' . $filename
            );

            return 0;

        } catch (ExceptionInterface|\RuntimeException $exception) {
            // This may be the downloader, ffprobe or fade process that failed.
            $failedProcess = method_exists($exception, 'getProcess') ? $exception->getProcess() : null;
            $message = trim($failedProcess
                ? ($failedProcess->getErrorOutput() ?: $failedProcess->getOutput() ?: $exception->getMessage())
                : $exception->getMessage());

            Log::warning('YouTube MP3 conversion failed', ['details' => $message]);

            if (str_contains($message, 'Sign in to confirm you’re not a bot')
                || str_contains($message, "Sign in to confirm you're not a bot")) {
                $message = 'YouTube blocked this download with a bot check. Refresh the server’s YouTube cookies and verify YT_COOKIES_PATH. The server IP may still be blocked; see docs/youtube-mp3.md for troubleshooting.';
            }

            $this->error($message);

            return 1;
        } finally {
            if ($temporaryCookies && is_file($temporaryCookies)) {
                unlink($temporaryCookies);
            }
        }
    }

    /**
     * Generate a unique filename.
     */
    public function basename()
    {
        return \Str::uuid()->toString();
    }

    /**
     * Get/create the destination directory.
     */
    public function directory()
    {
        $directory = \Storage::disk('public')
            ->path($this->argument('folder'));

        \File::makeDirectory(
            $directory,
            0755,
            true,
            true
        );

        return $directory;
    }

    /**
     * Environment used by yt-dlp, ffmpeg and Deno.
     */
    public function processEnvironment()
    {
        $ytPath = config('youtube.yt_dlp_path');
        $ffmpegPath = config('youtube.ffmpeg_path');
        $denoPath = config('youtube.deno_path');

        $paths = array_filter([
            dirname($ytPath),
            dirname($ffmpegPath),
            dirname($denoPath),
            '/usr/local/bin',
            '/usr/bin',
            '/bin',
            getenv('PATH'),
        ]);

        return [
            'PATH' => implode(
                PATH_SEPARATOR,
                array_unique($paths)
            ),

            /*
             * Give yt-dlp a writable cache location when
             * Laravel is running as www-data.
             */
            'XDG_CACHE_HOME' => storage_path('app/youtube-cache'),
            'DENO_DIR' => storage_path('app/youtube-cache/deno'),
        ];
    }

    /**
     * Apply a short fade-in and fade-out to the MP3.
     */
    public function applyFade($filepath)
    {
        if (!file_exists($filepath)) {
            return;
        }

        $duration = $this->duration($filepath);

        if ($duration <= 0) {
            return;
        }

        $fadeInDuration = min(1, $duration);
        $fadeOutDuration = min(2, $duration);

        $fadeOutStart = max(
            0,
            $duration - $fadeOutDuration
        );

        $fadedPath = $filepath . '.faded.mp3';

        $process = new Process(
            [
                config('youtube.ffmpeg_path'),

                '-y',

                '-i',
                $filepath,

                '-af',
                sprintf(
                    'afade=t=in:st=0:d=%s,afade=t=out:st=%s:d=%s',
                    $fadeInDuration,
                    $fadeOutStart,
                    $fadeOutDuration
                ),

                $fadedPath,
            ],
            null,
            $this->processEnvironment()
        );

        $process->setTimeout(600);

        $process->mustRun();

        \File::move(
            $fadedPath,
            $filepath
        );
    }

    /**
     * Get MP3 duration using ffprobe.
     */
    public function duration($filepath)
    {
        $ffmpegPath = config('youtube.ffmpeg_path');

        $ffprobePath =
            dirname($ffmpegPath) . '/ffprobe';

        $process = new Process(
            [
                $ffprobePath,

                '-v',
                'error',

                '-show_entries',
                'format=duration',

                '-of',
                'default=noprint_wrappers=1:nokey=1',

                $filepath,
            ],
            null,
            $this->processEnvironment()
        );

        $process->setTimeout(60);

        $process->mustRun();

        return (float) trim(
            $process->getOutput()
        );
    }

    /**
     * Normalize YouTube Shorts URLs.
     */
    public function url()
    {
        $url = $this->argument('url');

        if (strpos($url, '/shorts/') !== false) {

            preg_match(
                '/\/shorts\/([^?]+)/',
                $url,
                $matches
            );

            if (isset($matches[1])) {

                $videoId = $matches[1];

                return "https://youtube.com/watch?v={$videoId}";
            }

            abort(400, 'Not a valid YouTube link');
        }

        return $url;
    }
}
