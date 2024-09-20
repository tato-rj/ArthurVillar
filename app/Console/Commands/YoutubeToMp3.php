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
    protected $signature = 'youtube:mp3 {url} {folder} {start} {end}';

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
        $filename = $this->filename();
        $start = $this->argument('start');
        $end = $this->argument('end');

        $arguments = [
            env('YT_PATH'),
            '--ffmpeg-location', '/opt/homebrew/opt/ffmpeg@5/bin/ffmpeg',
            '-x',
            '--audio-format', 'mp3',
            '-o', $filename,
            $this->url(),
        ];

        if ($start && $end) {
            $section = '*'.$start.'-'.$end;
            $arguments[] = '--download-sections';
            $arguments[] = $section;
        }

        $process = new Process($arguments);

        $process->setWorkingDirectory($this->directory());

        try {
            $process->mustRun();

            return $this->info($this->argument('folder') . '/' . $filename);
        } catch (ProcessFailedException $exception) {
            $this->error($exception->getMessage());
            
            return 1;
        }
    }

    public function filename()
    {
        return \Str::uuid()->toString() . '.mp3';
    }

    public function directory()
    {
        $directory = \Storage::disk('public')->path($this->argument('folder'));

        \File::makeDirectory($directory, 0755, true, true);

        return $directory;
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
