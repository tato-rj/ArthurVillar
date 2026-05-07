<div class="col-lg-3 col-md-6 col-12 g-3">
    <div class="mb-4 bg-white border border-dark p-3 rounded h-100 d-flex flex-column justify-content-between">
        <div>
            <div class="d-flex justify-content-between">
                <div class="bg-{{$settings->gameTheme()}} rounded p-2 d-center mb-2" style="width: 40px; height: 40px;transform: rotate(15deg);">@fa(['icon' => $settings->gameIcon(), 'mr' => 0])
                </div>
                <div>
                    <div class="d-flex flex-wrap justify-content-end">
                        @foreach($settings->categories() as $category)
                        <a href="{{route('theory.index', ['category' => $category])}}" class="link-none">
                            <div style="font-size: .7em" class="badge rounded-pill bg-light text-muted d-inline-block m-1">{{$category}}</div>
                        </a>
                        @endforeach
                    </div>
                </div>
            </div>

            <h5 class="mb-1">{{$settings->gameName()}}</h5>

            <div>
                <label class="opacity-5 small mb-1">What's in it?</label>
                <p class="m-0 opacity-8">{{$settings->gameDescription()}}</p>
            </div>
        </div>

        <div>
            <div class="d-flex">
                <div class="btn-floating w-100 mr-2">
                    <button data-bs-toggle="modal" data-bs-target="#{{str_slug($settings->gameName())}}-settings-modal" class="btn btn-white text-dark w-100 text-nowrap">
                        @fa(['icon' => 'gear'])Set up game
                    </button>
                </div>
              <div class="btn-floating">
                <button data-bs-toggle="modal" data-bs-target="#leaderboard-{{str_slug($settings->gameName())}}-modal" class="btn btn-white">@fa(['icon' => 'ranking-star', 'mr' => 0])</button>
              </div>
            </div>
            @include('theory.components.leaderboard.show')
            @include('theory.'.str_slug($settings->gameName()).'.settings')
        </div>
    </div>
</div>
