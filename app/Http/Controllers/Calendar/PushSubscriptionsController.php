<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PushSubscriptionsController extends Controller
{
    public function store(Request $request)
    {
        $subscription = $request->validate([
            'endpoint' => ['required', 'url', 'max:500'],
            'keys.p256dh' => ['required', 'string'],
            'keys.auth' => ['required', 'string'],
            'content_encoding' => ['nullable', 'string', 'max:50'],
        ]);

        $request->user()->updatePushSubscription(
            $subscription['endpoint'],
            $subscription['keys']['p256dh'],
            $subscription['keys']['auth'],
            $subscription['content_encoding'] ?? null
        );

        return response()->json(['message' => 'Notifications are enabled on this device.']);
    }

    public function destroy(Request $request)
    {
        $attributes = $request->validate([
            'endpoint' => ['required', 'url', 'max:500'],
        ]);

        $request->user()->deletePushSubscription($attributes['endpoint']);

        return response()->json(['message' => 'Notifications are disabled on this device.']);
    }
}
