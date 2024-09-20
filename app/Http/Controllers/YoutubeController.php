<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class YoutubeController extends Controller
{
    public function create()
    {
        return view('youtube.create');
    }

    public function download(Request $request)
    {
        return response()->download($request->filepath)->deleteFileAfterSend(true);
    }

    public function convert(Request $request)
    {
        $filename = \Str::uuid()->toString() . '.mp3';
        $filepath = $this->directory() . '/' . $filename;

        $arguments = [
            env('YT_PATH'),
            '--ffmpeg-location', env('FFMPEG_PATH'),
            '-x',
            '--audio-format', 'mp3',
            '-o', $filename,
            $this->url($request->youtubeUrl),
        ];

        if ($request->start && $request->end) {
            $section = '*' . $request->start . '-' . $request->end;
            $arguments[] = '--download-sections';
            $arguments[] = $section;
        }

        $process = new Process($arguments);
        $process->setWorkingDirectory($this->directory());

        try {
            $process->mustRun();
            
            return response()->json([
                'feedback' => 'All set!',
                'downloadUrl' => route('admin.youtube.download', ['filepath' => $filepath])
            ]);
            // Return the file for download
            // return response()->download($filepath)->deleteFileAfterSend(true);
        } catch (ProcessFailedException $exception) {
            return response()->json(['error' => $exception->getMessage()]);
        }
    }


    public function directory()
    {
        $directory = \Storage::disk('public')->path('recordings');

        \File::makeDirectory($directory, 0755, true, true);

        return $directory;
    }

    public function url($url)
    {
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
