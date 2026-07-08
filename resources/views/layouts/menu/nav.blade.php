<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">@fa(['icon' => 'bars', 'mr' => 0, 'fa_size' => 'xl'])</button>

<div class="offcanvas border-0 offcanvas-end" style="width: auto; min-width: 220px;" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
  <div class="offcanvas-header d-apart">
    <div class="position-relative w-100">
      <ul class="subdomains-select border rounded-sm" aria-label="Switch website">
        @foreach($subdomains as $subdomain)
        @php($isCurrentSubdomain = strtolower($subdomain['label']) == subdomain())
        <li class="subdomain-option {{$isCurrentSubdomain ? 'is-current' : 'opacity-4'}} small fw-bold">
          @if($isCurrentSubdomain)
          <button type="button" class="subdomain-select-toggle" aria-expanded="false">
            @fa(['icon' => $subdomain['icon'], 'mr' => 1]){{$subdomain['label']}}
          </button>
          @else
          <a href="{{$subdomain['url']}}" class="subdomain-select-link">
            @fa(['icon' => $subdomain['icon'], 'mr' => 1]){{$subdomain['label']}}
          </a>
          @endif
        </li>
        @endforeach
      </ul>
    </div>

    <button style="font-size: 70%" type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body pt-3">
    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
      @isset($home)
      <li class="nav-item">
        <a class="nav-link" href="{{route($home)}}">Home</a>
      </li>
      @endisset

      @foreach($routes as $route => $label)
      <li class="nav-item">
        <a class="nav-link" href="{{route($route)}}">{{str_replace('*', '', $label)}}</a>
      </li>

      @if(str_contains($label, '*'))
      <hr>
      @endif
      @endforeach

      <li class="nav-item mt-3">
        @include('auth.logout')
      </li>
    </ul>
  </div>
</div>
