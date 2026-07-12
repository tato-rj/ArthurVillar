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
    'studio.locations.index' => 'Locations',
    'studio.waiting-list.index' => 'Waiting list*',
    [
      'label' => 'Finances',
      'children' => [
          'studio.expenses.index' => 'Expenses',
          'studio.expenses.report' => 'Report'
      ],
    ],
    'studio.breaks.index' => 'Breaks',
    'studio.holidays.index' => 'Holidays'
  ]
])
