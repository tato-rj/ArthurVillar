@extends('layouts.app', ['title' => 'Edit ' . $recording->nameWithComposer])

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
<style type="text/css">
.ql-container, .ql-toolbar {
  border-color: #212529 !important;
}

.ql-editor p {
  margin-bottom: .5rem !important;
}
</style>
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4 text-center">
        @pagetitle([
            'label' => 'Edit recording',
            'modal' => [
                'target' => '#play-'.$recording->id.'-modal',
                'icon' => 'play',
                'label' => 'Play'
            ]
        ])
      @include('recordings.play.modal')

    </div>
    <div id="tracks-container" class="row">
        <div class="col-lg-6 col-md-8 col-10 mx-auto">
            <form method="POST" action="{{route('admin.recordings.update', $recording)}}" enctype="multipart/form-data" disable-on-submit>
            	@csrf
            	@method('PATCH')
            	
                @input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $recording->name])

                <div class="row"> 
                    @select(['label' => 'Ensemble type', 'placeholder' => '', 'grid' => 'col', 'name' => 'ensemble_type'])
                        @foreach($ensembles as $ensemble)
                            @option(['name' => 'ensemble_type', 'label' => ucfirst($ensemble), 'value' => $ensemble, 'selected' => $recording->ensemble_type == $ensemble])
                        @endforeach
                    @endselect
                    @select(['label' => 'Composer', 'grid' => 'col', 'name' => 'composer_id'])
                        @foreach($periods as $period)
                        <optgroup label="{{$period->name}}">
                            @foreach($period->composers as $composer)
                            @option(['name' => 'composer_id', 'label' => $composer->name, 'value' => $composer->id, 'selected' => $recording->composer_id == $composer->id])
                            @endforeach
                        </optgroup>
                        @endforeach
                    @endselect
                </div>

            	<div class="row"> 
                    @select(['label' => 'Period', 'grid' => 'col', 'name' => 'period_id'])
                        @foreach($periods as $period)
                            @option(['name' => 'period_id', 'label' => $period->name, 'value' => $period->id, 'selected' => $recording->period_id == $period->id])
                        @endforeach
                    @endselect
            		@input(['label' => 'Artist', 'grid' => 'col', 'name' => 'artist', 'value' => $recording->artist])
                    @input(['label' => 'Year', 'type' => 'number', 'min' => 1400, 'grid' => 'col', 'name' => 'composed_in', 'value' => $recording->composed_in])
            	</div>

                <div id="quill-event-edit" data-name="description" class="mb-4 form-control">
                    {!!$recording->description!!}
                </div>
                <textarea style="display: none" name="description">{!!$recording->description!!}</textarea>

                @input(['label' => 'Source URL', 'name' => 'source_url', 'value' => $recording->source_url])

                <div class="d-flex align-items-center form-group">
                    @if($audioUrl = $recording->storage('audio_path'))
                    <div class="mr-2">
                        <a href="{{$audioUrl}}" class="btn btn-primary form-control" download>@fa(['icon' => 'download', 'mr' => 0])</a>
                    </div>
                    @endif
                    <label class="input-file cursor-pointer w-100">
                        <input style="display: none" name="audio" data-accept="mp3" type="file">
                        <div class="form-control text-truncate">
                            <span class="default text-truncate">
                                @fa(['icon' => 'cloud-arrow-up'])<small>{{$recording->audio_path ?? 'Select mp3'}}</small>
                            </span>
                        </div>
                    </label>
                </div>

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
<script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>

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