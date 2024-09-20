@extends('layouts.app', ['title' => 'Edit ' . $recording->nameWithComposer])

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle(['label' => 'Edit recording'])

    </div>
    <div id="tracks-container" class="row">
        <div class="col-lg-6 col-md-8 col-10 mx-auto">
<form method="POST" action="{{route('admin.recordings.update', $recording)}}" enctype="multipart/form-data">
	@csrf
	@method('PATCH')
	
	@cropper(['model' => $recording])

	@input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $recording->name])

	<div class="row"> 
		@input(['label' => 'Composer', 'grid' => 'col', 'name' => 'composer', 'required' => true, 'value' => $recording->composer])
		@input(['label' => 'Artist', 'grid' => 'col', 'name' => 'artist', 'value' => $recording->artist])
	</div>
	@textarea(['label' => 'Description', 'name' => 'description', 'value' => $recording->description])

	@submit(['label' => 'Save changes', 'theme' => 'primary'])
</form>

<div class="text-center mt-3 pt-3" style="border-top: 4px dotted grey">
	@delete(['action' => route('admin.recordings.destroy', $recording), 'label' => 'Delete this recording'])
</div>
    	</div>
    </div>
</section>
@endsection

@push('scripts')
<script>
$('#create-track button[type=submit]').click(function(e) {
    e.preventDefault();
    $(this).disable();

    convertYoutube(this);
});

function convertYoutube(button) {
    let $form = $(button).closest('form');
    let youtubeUrl = $form.find('input[name="youtube_url"]').val();
    let start = $form.find('input[name="start_time"]').val();
    let end = $form.find('input[name="end_time"]').val();

    $('#overlay').fadeIn('fast');

    axios.post("{{route('admin.recordings.youtubeToAudio')}}", {youtubeUrl: youtubeUrl, start: start, end: end})
         .then(function(response) {
            $('#overlay-spinner').hide();
            $('#overlay-success').show();
            $('#overlay-feedback').text(response.data.feedback);

            $form.find('input[name="audio_path"]').val(response.data.path);

            setTimeout(function() {
                $form.submit();
            }, 1000);
         })
         .catch(function(error) {
            log(error.response.data);
            $('#overlay').fadeOut('fast', function() {
                alert(error.response.data);
            });
         });
}
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