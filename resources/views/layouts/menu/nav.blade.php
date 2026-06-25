<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">@fa(['icon' => 'bars', 'mr' => 0, 'fa_size' => 'xl'])</button>

<div class="offcanvas border-0 offcanvas-end" style="width: auto; min-width: 220px;" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
  <div class="offcanvas-header d-apart">
    <div class="opacity-8 small fw-bold">@fa(['icon' => $header['icon']]){{$header['title']}}</div>
    <button style="font-size: 70%" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body pt-1">
    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
      @isset($home)
      <li class="nav-item">
        <a class="nav-link" href="{{route($home)}}">Home</a>
      </li>
      @endisset

      @foreach($routes as $route => $label)
      <li class="nav-item">
        <a class="nav-link" href="{{route($route)}}">{{$label}}</a>
      </li>
      @endforeach

      <hr>
      <li class="nav-item">
        @include('auth.logout')
      </li>
    </ul>
  </div>
</div>
