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
        $code = \Artisan::call('youtube:mp3', [
            'url' => 'https://www.youtube.com/watch?v=452nsCCzIJs',//$request->youtubeUrl,
            'folder' => 'recordings',
            'start' => '00:00:09',//$request->start,
            'end' => '00:01:00'//$request->end
        ]);

        $response = \Artisan::output();
        
        if ($code > 0)
            return response($response, 500);
        
        // return response()->json([
        //     'feedback' => 'All set!',
        //     'path' => $response
        // ]);
        return response()->json([
            'feedback' => 'All set!',
            'downloadUrl' => route('admin.youtube.download', ['filepath' => $response])
        ]);

        // $filename = \Str::uuid()->toString() . '.mp3';
        // $filepath = $this->directory() . '/' . $filename;

        // $arguments = [
        //     env('YT_PATH'),
        //     '--ffmpeg-location', env('FFMPEG_PATH'),
        //     '-x',
        //     '--audio-format', 'mp3',
        //     '-o', $filename,
        //     '--cache-dir', storage_path('app/cache'),
        //     '--cookies', base_path('yt_cookies.txt'),
        //     $this->url($request->youtubeUrl),
        // ];

        // if ($request->start && $request->end) {
        //     $section = '*' . $request->start . '-' . $request->end;
        //     $arguments[] = '--download-sections';
        //     $arguments[] = $section;
        // }

        // $process = new Process($arguments);
        // $process->setWorkingDirectory($this->directory());

        // try {
        //     $process->mustRun();
            
        //     return response()->json([
        //         'feedback' => 'All set!',
        //         'downloadUrl' => route('admin.youtube.download', ['filepath' => $filepath])
        //     ]);
        // } catch (ProcessFailedException $exception) {
        //     return response()->json(['error' => $exception->getMessage()]);
        // }
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
