@extends('layouts.app', ['title' => 'Composers'])

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<style type="text/css">
.ql-container, .ql-toolbar {
  border-color: #212529 !important;
}
</style>
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
<script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>

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

<script type="text/javascript">
var quill = new Quill('#quill-event-edit', {
  theme: 'snow',
  placeholder: 'Write the description here...',
});

quill.on('text-change', function(delta, oldDelta, source) {
  let $editor = $(quill.container);

  $('[name="'+$editor.data('name')+'"]').val($editor.find('.ql-editor').html());
});
</script>
@endpush