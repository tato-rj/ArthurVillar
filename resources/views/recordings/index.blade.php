@extends('layouts.app')

@push('header')
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.4.3/cropper.min.css">
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle(['label' => 'Recordings'])
        <div class="text-center">
            <button data-bs-toggle="modal" data-bs-target="#create-book-modal" class="btn-raw">@fa(['icon' => 'plus'])Upload</button>
        </div>

    </div>
    <div id="tracks-container" class="row">
        <div class="col-lg-8 col-md-10 col-12 mx-auto">
            @include('recordings.table.results')
{{--             @foreach($recordings as $recording)
                @include('recordings.edit')
                <button data-bs-toggle="modal" data-bs-target="#edit-recording-{{$recording->id}}-modal" href="{{route('recordings.play', $recording)}}" class="btn-raw d-apart border-dark border px-3 py-2 text-black w-100 text-truncate">
                    <div class="d-flex align-items-center text-truncate mr-2">
                        <div class="text-truncate">{{$recording->name}}</div>
                        <div class="text-truncate opacity-4 fst-italic ml-2 pr-1">{{$recording->composer}}</div>
                    </div>

                    <div class="opacity-4 small text-nowrap">
                        @auth
                        @fa(['icon' => 'headphones', 'mr' => 1]){{$recording->listen_count}}
                        @else
                        @fa(['icon' => 'clock', 'mr' => 1, 'fa_type' => 'r']){{$recording->duration()}}
                        @endauth
                    </div>
                </button>
            @endforeach --}}
        </div>
    </div>
{{--         <div class="col-lg-8 col-md-10 col-12 mx-auto mt-3">
            <div class="d-flex">
                @foreach($books as $book)
                @include('listening.books.button')
                @endforeach
            </div>
        </div> --}}
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