<?php

namespace App\Http\Controllers\Theory;

use App\Http\Controllers\Controller;
use App\Theory\Duels\Duel;
use App\Theory\Duels\DuelService;
use App\Theory\Duels\GameRegistry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;

class DuelController extends Controller
{
    public function __construct(private DuelService $duels) {}

    public function store(Request $request)
    {
        $data = $request->validate(['game' => 'required|string|max:40', 'settings' => 'required|array|max:40']);
        $settings = GameRegistry::snapshot($data['game'], $data['settings']);

        return $this->response($request, $this->duels->create($request, $data['game'], $settings));
    }

    public function join(Request $request)
    {
        $data = $request->validate(['code' => ['required', 'string', 'regex:/^\d{4}$/D']]);

        return $this->response($request, $this->duels->join($request, $data['code']));
    }

    public function show(Request $request, string $duel)
    {
        return $this->response($request, Duel::findOrFail($duel));
    }

    public function update(Request $request, string $duel, string $action)
    {
        $data = match ($action) {
            'connect', 'depart' => $request->validate(['connection_id' => ['required', 'string', 'regex:/^[0-9a-f]{32}$/D']]),
            'heartbeat' => $request->validate(['connection_id' => ['sometimes', 'string', 'regex:/^[0-9a-f]{32}$/D']]),
            'progress' => $request->validate(['sequence' => 'required|integer|min:1|max:100', 'progress' => 'required|integer|min:1|max:12', 'score' => 'required|integer|min:0|max:10000', 'checkpoint' => 'sometimes|array|max:16']),
            'finish' => $request->validate(['score' => 'required|integer|min:0|max:10000', 'accuracy' => 'required|integer|min:0|max:100']),
            'rematch' => $request->validate(['seed' => 'required|string|size:32']),
            default => [],
        };
        if (in_array($action, ['ready', 'progress', 'finish'])) {
            $data += $request->validate(['seed' => 'sometimes|string|size:32']);
        }

        return $this->response($request, $this->duels->mutate($request, $duel, $action, $data));
    }

    public function answer(Request $request, string $duel)
    {
        $data = $request->validate(['correct' => 'required|boolean']);
        $this->duels->answer($request, $duel, (bool) $data['correct']);

        return response()->json(['accepted' => true]);
    }

    public function authorizeChannel(Request $request)
    {
        $data = $request->validate(['socket_id' => ['required', 'string', 'regex:/^\d+\.\d+$/D'], 'channel_name' => 'required|string|max:100']);
        abort_unless(preg_match('/^private-theory\.duel\.([0-9a-f-]{36})$/D', $data['channel_name'], $matches), 403);
        $duel = Duel::findOrFail($matches[1]);
        $this->duels->participant($request, $duel);
        abort_if(in_array($duel->status, [Duel::CANCELLED, Duel::EXPIRED]), 403);

        // Sign only this participant's exact private channel. No Laravel user guard is weakened.
        return Broadcast::connection('reverb')->validAuthenticationResponse($request, true);
    }

    private function response(Request $request, Duel $duel)
    {
        return response()->json($this->duels->state($request, $duel))->header('Cache-Control', 'no-store');
    }
}
