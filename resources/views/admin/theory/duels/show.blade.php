@modal(['title' => 'Duel details', 'id' => 'duel-info-modal', 'size' => 'xl'])
    <div class="d-flex flex-wrap justify-content-between gap-2 mb-3">
        <div>
            <h5 class="mb-1">{{ $game }}</h5>
            <span class="text-muted">Room {{ $duel->code }} · {{ $status }}</span>
        </div>
        <strong>{{ $outcome }}</strong>
    </div>
    @if($archived)
        <p class="small text-muted">Saved match before a rematch started in this room.</p>
    @endif
    <p class="small text-muted">Times shown in {{ $timezone }}. Players are anonymous and identified as Host and Guest.</p>
    <dl class="row mb-4">
        @foreach([
            'Room created' => $formatTime($duel->created_at),
            'Started' => $formatTime($duel->starts_at),
            'Ended' => $formatTime($duel->finished_at),
            'Elapsed time' => $duration($duel->finished_at),
            'Room expires' => $formatTime($duel->expires_at),
            'Last updated' => $formatTime($duel->updated_at),
            'Left by' => $duel->left_by ? ucfirst($duel->left_by) : '—',
        ] as $label => $value)
            <dt class="col-sm-3">{{ $label }}</dt>
            <dd class="col-sm-9">{{ $value }}</dd>
        @endforeach
    </dl>
    <h6>Players and results</h6>
    <p class="small text-muted">The highest final score wins; accuracy breaks a tie. Unfinished players show their last saved score and progress.</p>
    <div class="table-responsive mb-4">
        <table class="table table-sm align-middle">
            <thead><tr><th>Player</th><th>Score</th><th>Accuracy</th><th>Rounds</th><th>Finished</th><th>Time</th></tr></thead>
            <tbody>
                @foreach(['host' => 'Host', 'guest' => 'Guest'] as $role => $name)
                    @php($player = $duel->players->firstWhere('role', $role))
                    <tr>
                        <td class="fw-bold">{{ $name }}</td>
                        @if($player)
                            <td>{{ $player->score }}</td>
                            <td>{{ isset($player->result['accuracy']) ? $player->result['accuracy'].'%' : '—' }}</td>
                            <td>{{ $player->progress }} / {{ $duel->settings['numOfChallenges'] ?? '—' }}</td>
                            <td>{{ $formatTime($player->finished_at) }}</td>
                            <td>{{ $duration($player->finished_at) }}</td>
                        @else
                            <td colspan="5" class="text-muted">Not joined</td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <h6>Game settings</h6>
    <dl class="row mb-4">
        @forelse($duel->settings ?? [] as $key => $value)
            <dt class="col-sm-4">{{ $key === 'numOfChallenges' ? 'Number of rounds' : Str::headline($key) }}</dt>
            <dd class="col-sm-8" style="overflow-wrap: anywhere">{{ is_bool($value) ? ($value ? 'Yes' : 'No') : (is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : $value) }}</dd>
        @empty
            <dd class="col-12 text-muted">No settings saved.</dd>
        @endforelse
    </dl>
    @foreach(['host' => 'Host', 'guest' => 'Guest'] as $role => $name)
        @php($player = $duel->players->firstWhere('role', $role))
        @if($player)
            <details class="border rounded p-3 mb-3">
                <summary class="fw-bold">{{ $name }} saved activity</summary>
                <dl class="row mt-3 mb-0">
                    @foreach([
                        'Joined' => $formatTime($player->created_at),
                        'Ready' => $formatTime($player->ready_at),
                        'Last seen' => $formatTime($player->last_seen_at),
                        'Departed' => $formatTime($player->departed_at),
                        'Rematch requested' => $formatTime($player->rematch_at),
                        'Last updated' => $formatTime($player->updated_at),
                        'Sequence' => $player->sequence,
                    ] as $label => $value)
                        <dt class="col-sm-4">{{ $label }}</dt><dd class="col-sm-8">{{ $value }}</dd>
                    @endforeach
                </dl>
                <h6 class="mt-3">Saved result</h6>
                <pre class="small bg-light p-3 rounded" style="white-space: pre-wrap; overflow-wrap: anywhere">{{ json_encode($player->result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) }}</pre>
                <h6>Last game checkpoint</h6>
                <pre class="small bg-light p-3 rounded mb-0" style="white-space: pre-wrap; overflow-wrap: anywhere">{{ json_encode($player->checkpoint, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) }}</pre>
            </details>
        @endif
    @endforeach
    <details class="border rounded p-3">
        <summary class="fw-bold">Room identifiers</summary>
        <dl class="row mt-3 mb-0">
            <dt class="col-sm-3">Room ID</dt><dd class="col-sm-9" style="overflow-wrap: anywhere">{{ $duel->id }}</dd>
            <dt class="col-sm-3">Random seed</dt><dd class="col-sm-9" style="overflow-wrap: anywhere">{{ $duel->seed }}</dd>
            <dt class="col-sm-3">Revision</dt><dd class="col-sm-9">{{ $duel->revision }}</dd>
        </dl>
    </details>
@endmodal
