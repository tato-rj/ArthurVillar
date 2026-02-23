@table([
	'rows' => $playlists,
	'columns' => [
		'created_at*' => [
			'label' => 'Date',
			'width' => '1%'
		],
		'name*' => [
			'label' => 'Name',
			'width' => '1%'
		],
		'description*' => [
			'label' => 'Description',
			'width' => 'auto'
		],
		'recordings_count*' => [
			'label' => 'Recordings',
			'width' => 'auto'
		],
		'actions' => [
			'label' => '',
			'width' => '1%'
		]],
	'view' => 'admin.listening.playlists.table.row'
])