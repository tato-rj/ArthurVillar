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
		'period*' => [
			'label' => 'Period',
			'width' => '1%'
		],
		'playlists_count*' => [
			'label' => 'Playlists',
			'width' => '1%'
		],
		// 'country.name*' => [
		// 	'label' => 'Country',
		// 	'width' => 'auto'
		// ],
		// 'ethnicity.name*' => [
		// 	'label' => 'Ethnicity',
		// 	'width' => 'auto'
		// ],
		'actions' => [
			'label' => '',
			'width' => 'auto'
		]],
	'view' => 'recordings.table.row'
])