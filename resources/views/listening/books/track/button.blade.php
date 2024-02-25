<div class="d-flex align-items-center mb-3 ordered" data-id="{{$track->id}}">
    @auth
    <div class="pr-2 pl-1 mr-1 sort-handle d-center">
      <i class="fas fa-sort"></i>
    </div>
    @endauth

    <button data-listen="{{route('listening.books.tracks.listen', compact(['book', 'track']))}}" data-track="{{asset($track->audio_path)}}" class="bg-white d-apart border-dark border px-3 py-2 text-black w-100 text-truncate" style="background: transparent;">
        <div class="d-flex align-items-center text-truncate mr-2">
            <div class="d-center">@fa(['icon' => 'circle-play', 'fa_type' => 'r', 'fa_size' => 'lg'])</div>
            <div class="text-truncate">{{$track->name}}</div>
            <div class="text-truncate opacity-4 fst-italic ml-2 pr-1">{{$track->composer_short_name ?? 'Folk song'}}</div>
        </div>

        <div class="opacity-4 small text-nowrap">
            @auth
            @fa(['icon' => 'headphones', 'mr' => 1]){{$track->listen_count}}
            @else
            @fa(['icon' => 'clock', 'mr' => 1, 'fa_type' => 'r']){{$track->duration()}}
            @endauth
        </div>
    </button>

    @auth
    <button data-bs-toggle="modal" data-bs-target="#edit-track-{{$track->id}}-modal" class="btn-raw p-1 ml-2 d-center text-black">@fa(['icon' => 'edit', 'mr' => 0])</button>

    @include('listening.books.track.edit')
    @endauth
</div>