@include('calendar.invitations.public', [
    'invitation' => $scheduler,
    'invitationVoteClass' => \App\Models\External\SchedulerVote::class,
    'invitationStylesheet' => 'css/external/scheduler.css',
    'invitationHideScheduleStylesheet' => true,
])
