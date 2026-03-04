<div class="col-lg-3 col-md-4 col-11 mx-auto pb-4">
    <div class="mb-4 bg-{{$settings->gameTheme()}} border border-dark p-3 rounded h-100 d-flex flex-column justify-content-between">
        <h5 class="mb-0">
            @fa(['icon' => $icon]){{$settings->gameName()}}
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
                @fa(['icon' => 'gear'])Set up challenge
                @endif
            </button>
        </div>
    </div>

        {{$slot}}
    </div>
</div>