@extends('layouts.app', ['title' => 'Composers'])

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Composers',
            'modal' => [
                'target' => '#create-composer-modal',
                'icon' => 'plus',
                'label' => 'New composer'
            ]
        ])
    </div>
    <div id="composers-container" class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">
            @include('composers.table.results')
        </div>
    </div>
</section>
@include('composers.create')
@endsection

@push('scripts')
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.js"></script>
<script type="text/javascript">
(new SimpleCropper({
  ratio: 1/1,
  imageInput: 'input#image-input',
  uploadButton: '#upload-button',
  confirmButton: '#confirm-button',
  cancelButton: '#cancel-button',
  submitButton: 'button[type="submit"]'
})).create();
</script>
@endpush