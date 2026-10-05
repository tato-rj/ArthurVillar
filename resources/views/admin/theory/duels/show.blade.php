@modal(['title' => 'Duel details', 'id' => 'duel-info-modal', 'size' => 'xl', 'class' => 'duel-details', 'data' => ['game-theme' => $gameTheme]])
    <div class="duel-game-heading">
        <span class="duel-game-icon" aria-hidden="true">@fa(['icon' => $gameIcon, 'mr' => 0])</span>
        <div>
            <h5>{{ $game }}</h5>
            <p>{{ $day->format('l, M j, Y') }} <span class="text-muted">· {{ $day->format('T') }}</span></p>
        </div>
        <div class="duel-room-label">
            <span class="duel-status">{{ $status }}</span>
            <span>Room {{ $duel->code }}{{ $archived ? ' · Earlier match' : '' }}</span>
        </div>
    </div>

    <div @class(['duel-outcome', 'duel-outcome--winner' => $winner])>
        <span class="duel-outcome-icon" aria-hidden="true">@fa(['icon' => $winner ? 'trophy' : ($outcome === 'Draw' ? 'handshake' : 'gamepad'), 'mr' => 0])</span>
        <div><strong>{{ $outcome }}</strong><p>{{ $outcomeNote }}</p></div>
    </div>

    <dl class="duel-timeline">
        <div><dt>@fa(['icon' => 'play']) Started</dt><dd>{{ $formatTime($duel->starts_at) }}</dd></div>
        <div><dt>@fa(['icon' => 'flag-checkered']) Ended</dt><dd>{{ $formatTime($duel->finished_at) }}</dd></div>
        <div><dt>@fa(['icon' => 'clock']) Duration</dt><dd>{{ $duration($duel->finished_at) }}</dd></div>
    </dl>

    <div class="duel-players">
        @foreach(['host' => 'Host', 'guest' => 'Guest'] as $role => $name)
            @php
                $player = $duel->players->firstWhere('role', $role);
                $rounds = $duel->settings['numOfChallenges'] ?? null;
                $progress = $player && is_numeric($rounds) && $rounds > 0 ? min(100, max(0, $player->progress / $rounds * 100)) : 0;
            @endphp
            <section @class(['duel-player', 'duel-player--winner' => $winner === $role]) aria-label="{{ $name }} results">
                <div class="duel-player-heading">
                    <div><h6>@fa(['icon' => 'user']) {{ $name }}</h6><span>{{ $role === 'host' ? 'Started the room' : ($player ? 'Joined the room' : 'Opponent') }}</span></div>
                    @if($winner === $role)<span class="duel-winner-badge">@fa(['icon' => 'trophy']) Winner</span>@endif
                </div>
                @if($player)
                    <div class="duel-score"><strong>{{ $player->score }}</strong><span>@fa(['icon' => 'bolt', 'fa_color' => 'orange']) points{{ ! $player->finished_at ? ' so far' : '' }}</span></div>
                    <dl class="duel-player-stats">
                        <div><dt>@fa(['icon' => 'bullseye', 'fa_color' => 'green']) Accuracy</dt><dd>{{ isset($player->result['accuracy']) ? $player->result['accuracy'].'%' : '—' }}</dd></div>
                        <div><dt>@fa(['icon' => 'gamepad', 'fa_color' => 'blue']) Rounds</dt><dd>{{ $player->progress }}{{ $rounds !== null ? ' / '.$rounds : '' }}</dd></div>
                        <div><dt>@fa(['icon' => 'clock', 'fa_color' => 'purple']) Time</dt><dd>{{ $duration($player->finished_at) }}</dd></div>
                    </dl>
                    @if(is_numeric($rounds) && $rounds > 0)
                        <div class="duel-round-progress" role="progressbar" aria-label="{{ $name }} rounds completed" aria-valuemin="0" aria-valuemax="{{ $rounds }}" aria-valuenow="{{ min($rounds, max(0, $player->progress)) }}"><span style="width: {{ $progress }}%"></span></div>
                    @endif
                    <p class="duel-player-finish">
                        @if($player->finished_at)
                            @fa(['icon' => 'check-circle', 'fa_color' => 'green']) Finished at {{ $formatTime($player->finished_at) }}
                        @else
                            {{ $terminal ? 'Did not finish' : 'Has not finished yet' }} · Last saved progress
                        @endif
                    </p>
                @else
                    <p class="duel-player-empty">Not joined</p>
                @endif
            </section>
        @endforeach
    </div>

    <section class="duel-settings" aria-label="Game settings">
        <h6>@fa(['icon' => 'sliders']) Game settings</h6>
        @if($settingFields)
            @include('admin.theory.duels.fields', ['fields' => $settingFields, 'nested' => false])
        @else
            <p class="text-muted">No settings saved.</p>
        @endif
    </section>

    <details class="duel-extra">
        <summary>@fa(['icon' => 'list-check']) Player activity</summary>
        <p class="small text-muted mt-3">Players are anonymous. Host created the room; Guest joined it. Times shown in {{ $timezone }}.</p>
        @foreach(['host' => 'Host', 'guest' => 'Guest'] as $role => $name)
            @php($player = $duel->players->firstWhere('role', $role))
            @if($player)
                <section class="duel-activity">
                    <h6>@fa(['icon' => 'user']) {{ $name }}</h6>
                    <dl class="duel-value-fields">
                        @foreach(['Joined' => $player->created_at, 'Ready' => $player->ready_at, 'Last seen' => $player->last_seen_at, 'Left' => $player->departed_at, 'Rematch requested' => $player->rematch_at] as $label => $time)
                            @if($time)<div class="duel-value-field"><dt>{{ $label }}</dt><dd>{{ $formatTime($time) }}</dd></div>@endif
                        @endforeach
                    </dl>
                    @if($activityFields[$role]['result'])
                        <h6 class="duel-activity-label">Additional results</h6>
                        @include('admin.theory.duels.fields', ['fields' => $activityFields[$role]['result'], 'nested' => false])
                    @endif
                    @if($activityFields[$role]['checkpoint'])
                        <h6 class="duel-activity-label">Last saved game state</h6>
                        @include('admin.theory.duels.fields', ['fields' => $activityFields[$role]['checkpoint'], 'nested' => false])
                    @endif
                </section>
            @endif
        @endforeach
        @if($duel->players->isEmpty())<p class="text-muted">No player activity saved.</p>@endif
    </details>

    <details class="duel-extra">
        <summary>@fa(['icon' => 'circle-info']) Record details</summary>
        <dl class="duel-value-fields mt-3 mb-0">
            @foreach(['Room created' => $formatTime($duel->created_at), 'Room expires' => $formatTime($duel->expires_at), 'Last updated' => $formatTime($duel->updated_at), 'Left by' => $duel->left_by ? ucfirst($duel->left_by) : 'Nobody', 'Room ID' => $duel->id, 'Random seed' => $duel->seed, 'Revision' => $duel->revision] as $label => $value)
                <div class="duel-value-field"><dt>{{ $label }}</dt><dd>{{ $value }}</dd></div>
            @endforeach
        </dl>
    </details>
@endmodal
