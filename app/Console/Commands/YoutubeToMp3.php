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
    protected $description = 'Convert a youtube link to mp3';

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

        $arguments = [
            env('YT_PATH', 'yt-dlp'),
            '--ffmpeg-location', env('FFMPEG_PATH'),
            '--extractor-args', 'youtube:player_client=web_safari,web',
            '--no-playlist',
            '-x',
            '--audio-format', 'mp3',
            '-o', $directory . '/' . $basename . '.%(ext)s',
        ];

        if ($this->supportsJsRuntimes()) {
            array_splice($arguments, 3, 0, [
                '--js-runtimes',
                'deno:' . env('DENO_PATH', 'deno'),
            ]);
        }

        if ($start && $end) {
            $section = '*'.$start.'-'.$end;
            $arguments[] = '--download-sections';
            $arguments[] = $section;
        }

        $arguments[] = $this->url();

        $process = new Process($arguments, null, $this->processEnvironment());

        $process->setWorkingDirectory($directory);

        $process->setTimeout(600);

        try {
            $process->mustRun();
            $this->applyFade($filepath);

            return $this->info($this->argument('folder') . '/' . $filename);
        } catch (ProcessFailedException $exception) {
            $message = trim($process->getErrorOutput() ?: $process->getOutput() ?: $exception->getMessage());
            $this->error($message);
            
            return 1;
        }
    }

    public function basename()
    {
        return \Str::uuid()->toString();
    }

    public function directory()
    {
        $directory = \Storage::disk('public')->path($this->argument('folder'));

        \File::makeDirectory($directory, 0755, true, true);

        return $directory;
    }

    public function processEnvironment()
    {
        $paths = array_filter([
            dirname(env('YT_PATH', '')),
            dirname(env('FFMPEG_PATH', '')),
            dirname(env('DENO_PATH', '')),
            '/opt/homebrew/bin',
            '/usr/bin',
            '/usr/local/bin',
            getenv('PATH'),
        ]);

        return ['PATH' => implode(PATH_SEPARATOR, array_unique($paths))];
    }

    public function supportsJsRuntimes()
    {
        $process = new Process([
            env('YT_PATH', 'yt-dlp'),
            '--help',
        ], null, $this->processEnvironment());

        $process->setTimeout(30);
        $process->run();

        return $process->isSuccessful() && strpos($process->getOutput(), '--js-runtimes') !== false;
    }

    public function applyFade($filepath)
    {
        $duration = $this->duration($filepath);

        if ($duration <= 0) {
            return;
        }

        $fadeInDuration = min(1, $duration);
        $fadeOutDuration = min(2, $duration);
        $fadeOutStart = max(0, $duration - $fadeOutDuration);
        $fadedPath = $filepath . '.faded.mp3';

        $process = new Process([
            env('FFMPEG_PATH', 'ffmpeg'),
            '-y',
            '-i', $filepath,
            '-af', sprintf(
                'afade=t=in:st=0:d=%s,afade=t=out:st=%s:d=%s',
                $fadeInDuration,
                $fadeOutStart,
                $fadeOutDuration
            ),
            $fadedPath,
        ], null, $this->processEnvironment());

        $process->setTimeout(600);
        $process->mustRun();

        \File::move($fadedPath, $filepath);
    }

    public function duration($filepath)
    {
        $ffprobePath = dirname(env('FFMPEG_PATH', 'ffmpeg')) . '/ffprobe';

        $process = new Process([
            $ffprobePath,
            '-v', 'error',
            '-show_entries', 'format=duration',
            '-of', 'default=noprint_wrappers=1:nokey=1',
            $filepath,
        ], null, $this->processEnvironment());

        $process->setTimeout(60);
        $process->mustRun();

        return (float) trim($process->getOutput());
    }

    public function url()
    {
        $url = $this->argument('url');

        if (strpos($url, '/shorts/') !== false) {
            // Extract the video ID from the Shorts URL
            preg_match('/\/shorts\/([^?]+)/', $url, $matches);

            if (isset($matches[1])) {
                $videoId = $matches[1];

                // Create the standard watch URL
                $watchUrl = "https://youtube.com/watch?v={$videoId}";

                return $watchUrl;
            } else {
                abort('Not a valid youtube link');
            }
        }
        
        return $url;
    }
}
