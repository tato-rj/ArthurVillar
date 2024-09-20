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
		// 'pieces_count*' => [
		// 	'label' => 'Pieces',
		// 	'width' => 'auto'
		// ],
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
			'width' => '1%'
		]],
	'view' => 'recordings.table.row'
])