@include('layouts.menu.nav', [ 
  'header' => 
  [
    'title' => 'Calendar',
    'icon' => 'calendar-days'
  ], 
  'routes' => 
  [
    'calendar.home' => 'Calendar',
    'calendar.invitations.index' => 'Invitations*',
    'calendar.students.index' => 'Students',
    'calendar.lesson-plans.index' => 'Lesson plans',
    'calendar.lessons.index' => 'Lessons',
    'calendar.events.index' => 'Events',
    'calendar.waiting-list.index' => 'Waiting list*',
    'calendar.recitals.index' => 'Recitals',
    'calendar.locations.index' => 'Locations*',
    'calendar.breaks.index' => 'Breaks',
    'calendar.holidays.index' => 'Holidays',
    [
      'label' => 'Finances',
      'children' => [
          'calendar.expenses.index' => 'Expenses',
          'calendar.expenses.report' => 'Report'
      ],
    ],
  ]
])
