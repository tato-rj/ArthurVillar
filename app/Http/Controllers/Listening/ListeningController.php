<?php

namespace App\Http\Controllers\Listening;

use App\Http\Controllers\Controller;
use App\Models\Listening\Recording;
use App\Token\Token;
use BaconQrCode\Common\ErrorCorrectionLevel;
use BaconQrCode\Encoder\Encoder;
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
        $filename = Str::slug($recording->nameWithComposer).'.png';
        $url = route('listening.show', ['token' => $token]);

        return response()->streamDownload(function () use ($url) {
            $matrix = Encoder::encode($url, ErrorCorrectionLevel::L())->getMatrix();
            $margin = 4;
            $scale = max(4, intdiv(500, $matrix->getWidth() + $margin * 2));
            $size = ($matrix->getWidth() + $margin * 2) * $scale;
            $image = imagecreatetruecolor($size, $size);
            $white = imagecolorallocate($image, 255, 255, 255);
            $black = imagecolorallocate($image, 0, 0, 0);
            imagefill($image, 0, 0, $white);

            for ($y = 0; $y < $matrix->getHeight(); $y++) {
                for ($x = 0; $x < $matrix->getWidth(); $x++) {
                    if ($matrix->get($x, $y) === 1) {
                        $left = ($x + $margin) * $scale;
                        $top = ($y + $margin) * $scale;
                        imagefilledrectangle($image, $left, $top, $left + $scale - 1, $top + $scale - 1, $black);
                    }
                }
            }

            imagepng($image);
            imagedestroy($image);
        }, $filename, ['Content-Type' => 'image/png']);
    }
}
