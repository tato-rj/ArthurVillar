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
    [
      'label' => 'Schedule',
      'children' => [
          'calendar.lessons.index' => 'Lessons',
          'calendar.lesson-plans.index' => 'Recurring plans',
          'calendar.events.index' => 'General events',
          'calendar.events.google' => 'Google events',
      ],
    ],
    'calendar.waiting-list.index' => 'Waiting list*',
    'calendar.recitals.index' => 'Recitals',
    [
      'label' => 'Locations*',
      'children' => [
          'calendar.locations.index' => 'Calendars',
          'calendar.venues.index' => 'Venues'
      ],
    ],
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
