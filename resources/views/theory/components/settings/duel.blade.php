@if(array_key_exists($settings->gameSlug(), \App\Theory\Duels\GameRegistry::GAMES))
<button type="button" data-duel-create="{{ $settings->gameSlug() }}" class="btn btn-white w-100 mt-3">@fa(['icon' => 'bolt'])Start Multiplayer Duel</button>
@endif
