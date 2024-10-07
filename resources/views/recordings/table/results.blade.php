@table([
	'rows' => $recordings,
	'columns' => [
		'name*' => [
			'label' => 'Name',
			'width' => 'auto'
		],
		'composer*' => [
			'label' => 'Composer',
			'width' => 'auto'
		],
		'ensemble_type*' => [
			'label' => 'Ensemble',
			'width' => '1%'
		],
		'playlists_count*' => [
			'label' => 'Playlists',
			'width' => '1%'
		],
		'actions' => [
			'label' => '',
			'width' => 'auto'
		]],
	'view' => 'recordings.table.row'
])