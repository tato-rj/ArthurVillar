<div class="col-lg-3 col-md-4 col-6 mx-auto g-3">
    <div class="mb-4 bg-white border border-dark p-3 rounded h-100 d-flex flex-column justify-content-between">
        <div>
            <div class="bg-{{$settings->gameTheme()}} rounded p-2 d-center mb-2" style="width: 40px; height: 40px;transform: rotate(15deg);">@fa(['icon' => $settings->gameIcon(), 'mr' => 0])
            </div>

            <h5 class="mb-1">{{$settings->gameName()}}</h5>

            <div class="mb-1">
                <label class="opacity-5 small mb-1">What's in it?</label>
                <p class="m-0 opacity-8">{{$settings->gameDescription()}}</p>
            </div>
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
            
            @include('theory.'.str_slug($settings->gameName()).'.modals.settings')
        </div>
    </div>
</div>