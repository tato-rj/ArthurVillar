@extends('layouts.app', ['title' => 'Recordings'])

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Recordings',
            'modal' => [
                'target' => '#create-recording-modal',
                'icon' => 'plus',
                'label' => 'New recording'
            ]
        ])
    </div>
    <div id="tracks-container" class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">
            @include('recordings.table.results')
        </div>
    </div>
</section>

@include('recordings.create')
@endsection

@push('scripts')
<script type="text/javascript">
// autocomplete(document.getElementById("method-input"), app.methods);
</script>
<script>

</script>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.js"></script>
<script type="text/javascript">
(new SimpleCropper({
  ratio: 4/3,
  imageInput: 'input#image-input',
  uploadButton: '#upload-button',
  confirmButton: '#confirm-button',
  cancelButton: '#cancel-button',
  submitButton: 'button[type="submit"]'
})).create();
</script>
@endpush