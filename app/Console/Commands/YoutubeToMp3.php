<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class YoutubeToMp3 extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'youtube:mp3';

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
        $process = new Process([
            'youtube-dl -x --audio-format mp3', 
            'https://youtu.be/5TbQftYOKms\?si\=_c342y1P3jKSi74u'
        ]);

        $process->run();

        $this->info('Downloaded');
    }
}
