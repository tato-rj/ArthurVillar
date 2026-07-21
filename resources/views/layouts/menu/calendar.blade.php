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
      'label' => 'Lessons',
      'children' => [
          'calendar.lesson-plans.index' => 'Recurring',
          'calendar.single-lesson-plans.index' => 'Single',
          'calendar.lessons.index' => 'Confirmed',
          'calendar.lessons.canceled' => 'Canceled',
      ],
    ],
    [
      'label' => 'Events',
      'children' => [
          'calendar.events.index' => 'Scheduled',
          'calendar.events.canceled' => 'Canceled',
          'calendar.events.google' => 'Google Events',
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
