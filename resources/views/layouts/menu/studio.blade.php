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
    [
      'label' => 'Lessons',
      'children' => [
          'studio.lesson-plans.index' => 'Recurring',
          'studio.single-lesson-plans.index' => 'Single',
          'studio.lessons.index' => 'Confirmed',
      ],
    ],
    'studio.waiting-list.index' => 'Waiting list*',
    [
      'label' => 'Recitals',
      'children' => [
          'studio.recitals.index' => 'Events',
          'studio.venues.index' => 'Venues'
      ],
    ],
    'studio.locations.index' => 'Locations*',
    'studio.breaks.index' => 'Breaks',
    'studio.holidays.index' => 'Holidays',
    [
      'label' => 'Finances',
      'children' => [
          'studio.expenses.index' => 'Expenses',
          'studio.expenses.report' => 'Report'
      ],
    ],
  ]
])
