<div id="pagetitle" class="d-center text-grey pt-4 pb-2" data-game-settings="{{$settings->gameSlug()}}" data-game-options="{{json_encode($settings->replayOptions())}}">
    <div class="rounded d-center" style="transform: rotate(15deg);">@fa(['icon' => $settings->gameIcon()])
  </div>
  <label class="prevent-select small fw-bold text-uppercase">{{$settings->gameName()}}</label>
</div>
