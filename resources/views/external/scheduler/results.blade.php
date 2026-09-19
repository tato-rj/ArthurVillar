@include('calendar.invitations.results', [
    'invitation' => $scheduler,
    'invitationRoutePrefix' => 'scheduler.schedulers',
    'invitationVoteClass' => \App\Models\External\SchedulerVote::class,
])
