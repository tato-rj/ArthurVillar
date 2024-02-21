<button data-track="{{asset($track->path)}}" class="d-flex align-items-center border-dark border px-4 py-2 mb-3 text-black w-100" style="background: transparent;">
    @fa(['icon' => 'circle-play', 'fa_type' => 'r', 'fa_size' => 'lg']){{$track->name}}
</button>