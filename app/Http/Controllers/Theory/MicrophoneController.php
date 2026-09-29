<?php

namespace App\Http\Controllers\Theory;

use App\Games\MicrophoneSettings;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MicrophoneController extends Controller
{
    public function index(Request $request)
    {
        return view('theory.mic.index', [
            'microphoneSettings' => MicrophoneSettings::forUser($request->user()),
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->validate([
            'sensitivity' => ['required', 'integer', 'between:0,100'],
            'settleMs' => ['required', 'integer', 'between:300,2500'],
        ]);

        $request->user()->update(['microphone_settings' => $settings]);

        return response()->json(['settings' => MicrophoneSettings::forUser($request->user())]);
    }
}
