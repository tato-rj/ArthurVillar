@include('layouts.menu.nav', ['home' => 'theory.home', 
  'header' => 
  [
    'title' => 'Theory',
    'icon' => 'book'
  ], 
  'routes' => 
  [
    'theory.audio.index' => 'Audio Control',
    'theory.leaderboard.index' => 'Leaderboards',
    'theory.tournaments.index' => 'Tournaments',
    'theory.stats.index' => 'Stats',
  ]
])

