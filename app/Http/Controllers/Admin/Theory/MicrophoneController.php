<?php

namespace App\Http\Controllers\Admin\Theory;

use App\Games\MicrophoneSettings;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MicrophoneController extends Controller
{
    public function index()
    {
        return view('admin.theory.mic.index', [
            'microphoneSettings' => MicrophoneSettings::current(),
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->validate([
            'sensitivity' => ['required', 'integer', 'between:0,100'],
            'settleMs' => ['required', 'integer', 'between:300,2500'],
        ]);

        MicrophoneSettings::save($settings);

        return response()->json(['settings' => MicrophoneSettings::current()]);
    }
}
