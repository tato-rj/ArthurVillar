@include('layouts.menu.nav', ['home' => 'admin.home', 'routes' =>
  [
    'admin.users.index' => 'Users',
    [
      'label' => 'Theory',
      'children' => [
        'admin.theory.mic.index' => 'Microphone',
        'admin.theory.audio.index' => 'Audio Control',
        'admin.theory.leaderboard.index' => 'Leaderboards',
        'admin.theory.duels.index' => 'Duels',
        'admin.theory.tournaments.index' => 'Tournaments',
        'admin.theory.stats.index' => 'Stats',
      ]
    ],
  ]
])
