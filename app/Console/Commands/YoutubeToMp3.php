<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

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

        $ytDlpPath = env('YT_PATH', '/usr/local/bin/yt-dlp');
        $ffmpegPath = env('FFMPEG_PATH', '/usr/bin/ffmpeg');
        $denoPath = env('DENO_PATH', '/usr/bin/deno');
        $cookiesPath = env(
            'YT_COOKIES_PATH',
            '/var/tmp/youtube-cookies.txt'
        );

        $arguments = [
            $ytDlpPath,

            '--ffmpeg-location',
            $ffmpegPath,

            '--cookies',
            $cookiesPath,

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

        try {
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

        } catch (ProcessFailedException $exception) {

            $message = trim(
                $process->getErrorOutput()
                ?: $process->getOutput()
                ?: $exception->getMessage()
            );

            $this->error($message);

            return 1;
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
        $ytPath = env(
            'YT_PATH',
            '/usr/local/bin/yt-dlp'
        );

        $ffmpegPath = env(
            'FFMPEG_PATH',
            '/usr/bin/ffmpeg'
        );

        $denoPath = env(
            'DENO_PATH',
            '/usr/bin/deno'
        );

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
            'HOME' => '/var/www',
            'XDG_CACHE_HOME' => '/var/www/.cache',
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
                env(
                    'FFMPEG_PATH',
                    '/usr/bin/ffmpeg'
                ),

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
        $ffmpegPath = env(
            'FFMPEG_PATH',
            '/usr/bin/ffmpeg'
        );

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