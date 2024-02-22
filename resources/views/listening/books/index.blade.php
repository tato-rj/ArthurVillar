@extends('layouts.app')

@push('header')
<script>
    window.app = <?php echo json_encode([
        'series' => $books->pluck('series')->unique()->sort()
    ]); ?>
</script>
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <h1 class="text-center">Select the book below</h1>

        @auth
        <div class="text-center">
            <button data-bs-toggle="modal" data-bs-target="#create-book-modal" class="btn-raw">@fa(['icon' => 'plus'])Add book</button>
        </div>
        @endauth

        <div class="col-lg-8 col-md-10 col-12 mx-auto mt-3">
            <div class="d-flex">
                @foreach($books as $book)
                @include('listening.books.button')
                @endforeach
            </div>
        </div>
    </div>
</section>

@include('listening.books.create')
@endsection

@push('scripts')
<script type="text/javascript">
autocomplete(document.getElementById("series-input"), app.series);
</script>
@endpush