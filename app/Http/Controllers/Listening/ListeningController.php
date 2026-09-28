<?php

namespace App\Http\Controllers\Listening;

use App\Http\Controllers\Controller;
use App\Models\Listening\Recording;
use App\Token\Token;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Support\Str;

class ListeningController extends Controller
{
    public function home()
    {
        return redirect()->route('listening.recordings.index');
    }

    public function qrcode(string $token)
    {
        $recording = Recording::with('composer')->findOrFail(Token::read($token)['recording_id'] ?? null);
        $filename = Str::slug($recording->nameWithComposer).'.svg';
        $url = route('listening.show', ['token' => $token]);

        return response()->streamDownload(function () use ($url) {
            $qrcode = new Writer(new ImageRenderer(new RendererStyle(500, 4), new SvgImageBackEnd()));

            echo $qrcode->writeString($url);
        }, $filename, ['Content-Type' => 'image/svg+xml']);
    }
}
