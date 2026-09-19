@include('calendar.invitations.form', [
    'invitation' => $scheduler,
    'invitationRoutePrefix' => 'scheduler.schedulers',
    'invitationStylesheet' => 'css/external/scheduler.css',
])
