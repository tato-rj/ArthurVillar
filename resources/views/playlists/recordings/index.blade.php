@extends('layouts.app', ['title' => $playlist->name])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => $playlist->name,
            'subtitle' => $playlist->recordings()->count() . ' ' . str_plural('recording', $playlist->recordings()->count())
        ])
    </div>

    <div id="recordings-container" class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">
        	@filters(['lists' => [
        		'type' => $ensembles, 
        		'period' => $periods->pluck('name')
        	]])

			@table([
				'rows' => $playlist->recordings,
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
				'view' => 'playlists.recordings.row'
			])
        </div>
    </div>

@endsection

@push('scripts')
@endpush