@extends('layouts.app', ['title' => $composer->name])

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => $composer->name,
            'mb' => 0
        ])
        <div class="text-center">
            @flag {{$composer->country->name ?? null}}
        </div>
    </div>
    <div id="composers-container" class="row">
        <div class="col-lg-6 col-md-8 col-10 mx-auto">
            <form method="POST" action="{{route('admin.composers.update', $composer)}}" enctype="multipart/form-data">
                @method('PATCH')
                @csrf
                
                @cropper(['model' => $composer])

                @input(['label' => 'Name', 'name' => 'name', 'required' => true, 'value' => $composer->name])

                <div class="row">
                    @select(['label' => 'Country', 'grid' => 'col', 'name' => 'country_id'])
                        @foreach($countries as $letter => $list)
                        <optgroup label="{{strtoupper($letter)}}">
                            @foreach($list as $country)
                            @option(['name' => 'country_id', 'label' => $country->name, 'value' => $country->id, 'selected' => $country->id == $composer->country_id])
                            @endforeach
                        </optgroup>
                        @endforeach
                    @endselect
                    @select(['label' => 'Period', 'grid' => 'col', 'name' => 'period_id'])
                        @foreach($periods as $period)
                            @option(['name' => 'period_id', 'label' => $period->name, 'value' => $period->id, 'selected' => $composer->period_id == $period->id])
                        @endforeach
                    @endselect
                </div>
                <div class="row"> 
                    @input(['label' => 'Born in', 'grid' => 'col', 'name' => 'born_in', 'value' => $composer->formatDate('born_in', 'm/d/Y')])
                    @input(['label' => 'Died in', 'grid' => 'col', 'name' => 'died_in', 'value' => $composer->formatDate('died_in', 'm/d/Y')])
                </div>

                @textarea(['label' => 'Biography', 'name' => 'biography', 'value' => $composer->biography])
                @textarea(['label' => 'Curiosity', 'name' => 'curiosity', 'rows' => 2, 'value' => $composer->curiosity])

                @submit(['label' => 'Save changes', 'theme' => 'primary'])
            </form>

            <div class="text-center mt-3 pt-3" style="border-top: 4px dotted grey">
                @delete(['action' => route('admin.composers.destroy', $composer), 'label' => 'Delete this composer'])
            </div>
        </div>
    </div>
</section>
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