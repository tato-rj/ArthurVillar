@include('layouts.menu.nav', [ 
  'header' => 
  [
    'title' => 'Studio',
    'icon' => 'calendar-days'
  ], 
  'routes' => 
  [
    'studio.home' => 'Calendar*',

    'studio.students.index' => 'Students',
    'studio.lessons.index' => 'Lessons',
    'studio.breaks.index' => 'Breaks*',
    'studio.locations.index' => 'Locations',
    'studio.holidays.index' => 'Holidays',
    'studio.waiting-list.index' => 'Waiting list'
  ]
])
