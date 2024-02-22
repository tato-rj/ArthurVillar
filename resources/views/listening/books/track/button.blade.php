<div class="d-flex mb-3">
    <button data-track="{{asset($track->audio_path)}}" class="d-flex align-items-center border-dark border px-4 py-2 text-black w-100" style="background: transparent;">
    @fa(['icon' => 'circle-play', 'fa_type' => 'r', 'fa_size' => 'lg']){{$track->name}}
    </button>

    @auth
    <button data-bs-toggle="modal" data-bs-target="#edit-track-{{$track->id}}-modal" class="btn-raw p-1 ml-2 d-center text-black">@fa(['icon' => 'edit', 'mr' => 0])</button>

    @include('listening.books.track.edit')
    @endauth
</div>