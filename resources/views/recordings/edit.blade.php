@extends('layouts.app', ['title' => 'Edit ' . $recording->nameWithComposer])

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4 text-center">
        @pagetitle([
            'label' => 'Edit recording',
            'href' => [
                'url' => route('recordings.play', $recording),
                'label' => 'Play recording',
                'icon' => 'play'
            ]
        ])

    </div>
    <div id="tracks-container" class="row">
        <div class="col-lg-6 col-md-8 col-10 mx-auto">
            <form method="POST" action="{{route('admin.recordings.update', $recording)}}" enctype="multipart/form-data" disable-on-submit>
            	@csrf
            	@method('PATCH')
            	
            	@cropper

                <div class="row"> 
                	@input(['label' => 'Name', 'grid' => 'col', 'name' => 'name', 'required' => true, 'value' => $recording->name])
                    @select(['label' => 'Period', 'grid' => 'col', 'name' => 'period_id'])
                        @foreach($periods as $period)
                            @option(['name' => 'period_id', 'label' => $period->name, 'value' => $period->id, 'selected' => $recording->period_id == $period->id])
                        @endforeach
                    @endselect
                </div>

            	<div class="row"> 
            		@input(['label' => 'Composer', 'grid' => 'col', 'name' => 'composer', 'required' => true, 'value' => $recording->composer])
            		@input(['label' => 'Artist', 'grid' => 'col', 'name' => 'artist', 'value' => $recording->artist])
                    @input(['label' => 'Year', 'grid' => 'col', 'name' => 'composed_in', 'value' => $recording->composed_in])
            	</div>

            	@textarea(['label' => 'Description', 'name' => 'description', 'value' => $recording->description])

                @input(['label' => 'Source URL', 'name' => 'source_url', 'value' => $recording->source_url])
                <label class="input-file cursor-pointer w-100 form-group">
                    <input style="display: none" name="audio" data-accept="mp3" type="file">
                    <div class="form-control">
                        <span class="filename"></span>
                        <span class="default">
                            @fa(['icon' => 'cloud-arrow-up'])<small>Select mp3</small>
                        </span>
                    </div>
                </label>

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