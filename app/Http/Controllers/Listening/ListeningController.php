<?php

namespace App\Http\Controllers\Listening;

use App\Http\Controllers\Controller;
use App\Models\Listening\Recording;
use BaconQrCode\Renderer\Image\ImagickImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Http\Request;

class ListeningController extends Controller
{
    public function home()
    {
        return redirect()->route('listening.recordings.index');
    }

    public function qrcode(Request $request, Recording $recording)
    {
        $filename = str_slug($recording->nameWithComposer).'.png';

        return response()->streamDownload(function () use ($request) {
            $qrcode = new Writer(new ImageRenderer(new RendererStyle(500, 1), new ImagickImageBackEnd('png')));

            echo $qrcode->writeString($request->url);
        }, $filename, ['Content-Type' => 'image/png']);
    }
}
