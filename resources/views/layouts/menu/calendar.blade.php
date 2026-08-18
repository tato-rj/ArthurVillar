@include('layouts.menu.nav', [
  'routes' => 
  [
    'calendar.home' => 'Calendar',
    'calendar.invitations.index' => 'Invitations*',
    'calendar.students.index' => 'Students',
    [
      'label' => 'Lessons',
      'children' => [
        'calendar.lesson-plans.index' => 'Plans',
        'calendar.lesson-records.index' => 'Records',
      ]
    ],
    [
      'label' => 'Events',
      'children' => [
        'calendar.events.index' => 'My events',
        'calendar.events.google' => 'Google events',
      ]
    ],
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
