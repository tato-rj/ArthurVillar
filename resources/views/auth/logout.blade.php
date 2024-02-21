<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
  @csrf
</form>
<a class="nav-link" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" href="">Logout</a>
