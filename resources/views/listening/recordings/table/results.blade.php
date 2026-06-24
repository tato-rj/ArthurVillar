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
		'actions' => [
			'label' => '',
			'width' => 'auto'
		]],
	'view' => 'listening.recordings.table.row'
])