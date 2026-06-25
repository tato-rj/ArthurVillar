@include('layouts.menu.nav', [
  'header' => 
  [
    'title' => 'Listening',
    'icon' => 'headphones'
  ], 
  'routes' => 
  [
    'listening.recordings.index' => 'Recordings',
    'listening.playlists.index' => 'Playlists',
    'listening.composers.index' => 'Composers'
  ]
])
