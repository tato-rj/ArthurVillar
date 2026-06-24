<?php

namespace App\Http\Controllers\Listening;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{Recording, Period, Composer, Playlist};
use App\Tools\Cropper\ImageUpload;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class ListeningController extends Controller
{
    public function qrcode(Request $request, Recording $recording)
    {
        $filename = str_slug($recording->nameWithComposer).'.png';

        return response()->streamDownload(function () use ($request) {
            $qrcode = QrCode::size(500)->format('png')->margin(1)->errorCorrection('M');

            echo $qrcode->generate($request->url);
        }, $filename, ['Content-Type' => 'image/png']);
    }
}
