@include('layouts.menu.nav', ['home' => 'theory.home',
  'routes' => 
  [
    'theory.mic.index' => 'Microphone',
    'theory.audio.index' => 'Audio Control',
    'theory.leaderboard.index' => 'Leaderboards',
    'theory.tournaments.index' => 'Tournaments',
    'theory.stats.index' => 'Stats',
  ]
])

