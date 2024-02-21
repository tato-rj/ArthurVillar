@extends('layouts.app')

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <h1 class="text-center mb-4">Select the book below</h1>

        <div class="col-lg-3 col-md-5 col-8 mx-auto">
            @for($i=1;$i<=7;$i++)
            @php($book = "Book{$i}")
            <div>
                <a href="{{route('recordings.show', ['book' => strtolower($book)])}}" class="button w-100 text-center">{{$book}}</a>
            </div>
            @endfor
        </div>
    </div>
</section>
@endsection

@push('scripts')
@endpush