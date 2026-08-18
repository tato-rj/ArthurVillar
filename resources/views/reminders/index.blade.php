@extends('layouts.app', ['title' => 'Reminders'])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Reminders',
            'modal' => [
                'target' => '#create-reminder-modal',
                'icon' => 'plus',
                'label' => 'New reminder'
            ]
        ])
    </div>
    <div id="reminders-container" class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">

        </div>
    </div>
</section>
@include('reminders.create')
@endsection

@push('scripts')
@endpush
