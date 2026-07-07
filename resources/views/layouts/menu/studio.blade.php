@include('layouts.menu.nav', [ 
  'header' => 
  [
    'title' => 'Studio',
    'icon' => 'calendar-days'
  ], 
  'routes' => 
  [
    'studio.home' => 'Calendar',
    'studio.students.index' => 'Students',
    'studio.lessons.index' => 'Lessons',
    'studio.payments.index' => 'Payments',
    'studio.breaks.index' => 'Breaks',
    'studio.waiting-list.index' => 'Waiting list'
  ]
])
