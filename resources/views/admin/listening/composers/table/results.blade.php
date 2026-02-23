@table([
	'rows' => $composers,
	'columns' => [
		'name*' => [
			'label' => 'Name',
			'width' => 'auto'
		],
		'period*' => [
			'label' => 'Period',
			'width' => '1%'
		],
		'country.name*' => [
			'label' => 'Country',
			'width' => 'auto'
		],
		// 'ethnicity.name*' => [
		// 	'label' => 'Ethnicity',
		// 	'width' => 'auto'
		// ],
		'actions' => [
			'label' => '',
			'width' => '1%'
		]],
	'view' => 'admin.listening.composers.table.row'
])