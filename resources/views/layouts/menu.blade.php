{{-- @include('auth.logout') --}}
<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">Menu</button>

<div class="offcanvas border-0 offcanvas-end" style="width: auto; min-width: 220px;" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
  <div class="offcanvas-header">
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
      @if(local())
      <li class="nav-item mb-2">
        <a class="btn btn-sm btn-outline-secondary" href="{{route('admin.youtube.create')}}">@fa(['icon' => 'youtube', 'fa_type' => 'b'])Youtube to mp3</a>
      </li>
      @endif
      <li class="nav-item">
        <a class="nav-link" href="{{route('admin.composers.index')}}">@fa(['icon' => 'user'])Composers</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{route('admin.recordings.index')}}">@fa(['icon' => 'microphone'])Recordings</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{route('admin.recordings.index')}}">@fa(['icon' => 'list'])Playlists</a>
      </li>
{{--       <li class="nav-item">
        <a class="nav-link" href="{{route('listening.index')}}">Books</a>
      </li> --}}

      <hr>

      <li class="nav-item">
        @include('auth.logout')
      </li>

    </ul>
  </div>
</div>
