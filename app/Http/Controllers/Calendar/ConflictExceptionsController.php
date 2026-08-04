<?php

namespace App\Http\Controllers\Calendar;

use App\Http\Controllers\Controller;
use App\Models\Calendar\ConflictException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConflictExceptionsController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        [$eventKey, $conflictingEventKeys] = $this->validatedKeys($request);

        DB::transaction(function () use ($request, $eventKey, $conflictingEventKeys) {
            foreach ($conflictingEventKeys as $conflictingEventKey) {
                [$firstEventKey, $secondEventKey] = ConflictException::normalizedPair(
                    $eventKey,
                    $conflictingEventKey
                );

                ConflictException::query()->updateOrCreate([
                    'user_id' => $request->user()->id,
                    'first_event_key' => $firstEventKey,
                    'second_event_key' => $secondEventKey,
                ]);
            }
        });

        return response()->json([
            'ignored_conflicts' => $this->pairsFor($request),
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        [$eventKey, $conflictingEventKeys] = $this->validatedKeys($request);

        DB::transaction(function () use ($request, $eventKey, $conflictingEventKeys) {
            foreach ($conflictingEventKeys as $conflictingEventKey) {
                [$firstEventKey, $secondEventKey] = ConflictException::normalizedPair(
                    $eventKey,
                    $conflictingEventKey
                );

                ConflictException::query()
                    ->where('user_id', $request->user()->id)
                    ->where('first_event_key', $firstEventKey)
                    ->where('second_event_key', $secondEventKey)
                    ->delete();
            }
        });

        return response()->json([
            'ignored_conflicts' => $this->pairsFor($request),
        ]);
    }

    private function validatedKeys(Request $request): array
    {
        $validated = $request->validate([
            'event_key' => ['required', 'string', 'max:255'],
            'conflicting_event_keys' => ['required', 'array', 'min:1', 'max:50'],
            'conflicting_event_keys.*' => ['required', 'string', 'max:255', 'different:event_key'],
        ]);

        return [
            $validated['event_key'],
            array_values(array_unique($validated['conflicting_event_keys'])),
        ];
    }

    private function pairsFor(Request $request): array
    {
        return ConflictException::query()
            ->where('user_id', $request->user()->id)
            ->orderBy('first_event_key')
            ->orderBy('second_event_key')
            ->get(['first_event_key', 'second_event_key'])
            ->map(fn (ConflictException $exception) => [
                $exception->first_event_key,
                $exception->second_event_key,
            ])
            ->values()
            ->all();
    }
}
