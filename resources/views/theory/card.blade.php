<div class="col-lg-3 col-md-4 col-6 mx-auto pb-4">
    <div class="mb-4 bg-white border border-dark p-3 rounded h-100 d-flex flex-column justify-content-between">
        <h5 class="mb-0">
            <span class="bg-{{$settings->gameTheme()}} rounded p-2 d-center mb-3" style="width: 40px; height: 40px;">@fa(['icon' => $icon, 'mr' => 0])</span>{{$settings->gameName()}}
        </h5>
        <div class="mb-3">
            <label class="opacity-5 small mb-0">What's this game like?</label>
            <p class="m-0 opacity-8">{{$settings->gameDescription()}}</p>
        </div>

        <div>
        <div class="btn-floating w-100">
            <button data-bs-toggle="modal" data-bs-target="#{{str_slug($settings->gameName())}}-settings-modal", {{isset($disabled) && $disabled ? 'disabled' : null}} class="btn btn-white text-dark w-100">
                @if(isset($disabled) && $disabled)
                Coming up soon
                @else
                @fa(['icon' => 'gear'])Set up game
                @endif
            </button>
        </div>
    </div>

        {{$slot}}
    </div>
</div>