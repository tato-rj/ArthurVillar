@extends('layouts.app', ['title' => 'Music Theory Challenges'])

@push('header')
<link href="{{ mix('css/musicgames.css') }}" rel="stylesheet">
<style>
</style>
@endpush

@section('content')
<section class="container py-5">
    <div class="row">
        <div class="text-center mb-4 px-4">
            <h1 class="text-center">Music Theory Challenges</h1>
            <p>Interactive games for practicing core music theory skills</p>
            <a href="{{route('theory.open-staff.play')}}" class="btn btn-outline-secondary">@fa(['icon' => 'chalkboard'])Open Staff</a>
        </div>

        <div class="text-right">
            @if($category = request('category'))
            <div class="d-inline-block">
                <a href="{{route('theory.index')}}" class="btn btn-raw">
                <div class="border rounded border-3 px-2 py-1 small d-center fw-bold text-muted">
                    @fa(['icon' => 'times']){{$category}}
                </div>
                </a>
            </div>
            @endif
        </div>

        @foreach($games as $settings)
            @if($settings->public() && (! request('category') || $settings->categories()->contains(request('category'))))
            @include('theory.card')
            @endif
        @endforeach
    </div>
</section>
@endsection

@push('scripts')
<script>
$('.mode-menu button').on('click', function () {
  const $btns = $(this).siblings().addBack();
  $btns.removeClass('btn-secondary').addClass('btn-outline-secondary')
       .each((_, b) => $($(b).data('target')).hide());
  $(this).removeClass('btn-outline-secondary').addClass('btn-secondary');
  $($(this).data('target')).show();
});
</script>

<script>
</script>
@endpush