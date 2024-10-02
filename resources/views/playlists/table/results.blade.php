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
		'pieces_count*' => [
			'label' => 'Pieces',
			'width' => 'auto'
		],
		'actions' => [
			'label' => '',
			'width' => '1%'
		]],
	'view' => 'playlists.table.row'
])