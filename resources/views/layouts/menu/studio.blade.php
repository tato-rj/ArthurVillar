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
    'studio.payments.index' => 'Payments'
  ]
])
