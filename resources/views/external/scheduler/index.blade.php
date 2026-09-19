@include('calendar.invitations.index', [
    'invitationRoutePrefix' => 'scheduler.schedulers',
    'invitationTableRoute' => 'scheduler.schedulers.table',
    'invitationRouteParameter' => 'scheduler',
    'invitationStylesheet' => 'css/external/scheduler.css',
])
