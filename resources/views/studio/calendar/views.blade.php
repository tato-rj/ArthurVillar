<div class="offcanvas offcanvas-start" style="width: auto; min-width: 220px;" tabindex="-1" id="calendar-offcanvas-views">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Calendar view</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 studio-calendar-offcanvas-views">
      <li class="nav-item py-2 mb-2" data-calendar-offcanvas-view="schedule">
        <button type="button" class="btn btn-raw">@fa(['icon' => 'list-ol'])Schedule</button>
      </li>
      <li class="nav-item py-2 mb-2" data-calendar-offcanvas-view="day">
        <button type="button" class="btn btn-raw">@fa(['icon' => 'square', 'fa_type' => 'r'])Day</button>
      </li>
      <li class="nav-item py-2 mb-2" data-calendar-offcanvas-view="3-days">
        <button type="button" class="btn btn-raw">@fa(['icon' => 'table-columns'])3 day</button>
      </li>
      <li class="nav-item py-2 mb-2" data-calendar-offcanvas-view="week">
        <button type="button" class="btn btn-raw">@fa(['icon' => 'table-list'])Week</button>
      </li>
      <li class="nav-item py-2 mb-2" data-calendar-offcanvas-view="month">
        <button type="button" class="btn btn-raw">@fa(['icon' => 'table-cells'])Month</button>
      </li>
    </ul>
  </div>
</div>
