@extends('layouts.app', ['title' => 'Holidays'])

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle([
            'label' => 'Holidays',
            'subtitle' => 'Choose which holidays block lessons on the calendar.'
        ])
    </div>

    <div class="mx-auto" style="max-width: 720px;">
        @foreach($holidays as $holiday)
        <form method="POST" action="{{route('studio.holidays.update', $holiday)}}" class="d-flex align-items-center justify-content-between border-bottom py-3">
            @csrf
            @method('PATCH')

            <div>
                <h5 class="mb-1">{{$holiday->title}}</h5>
                <p class="small text-muted mb-0">{{$holiday->dateForYear(now()->year)->toFormattedDateString()}}</p>
            </div>

            <label class="switch mb-0">
                <input type="checkbox" name="is_observed" value="1" {{iftrue($holiday->is_observed, 'checked')}}>
                <span class="slider"></span>
            </label>
        </form>
        @endforeach
    </div>
</section>
@endsection

@push('scripts')
<script>
document.querySelectorAll('form[action*="/holidays/"] input[name="is_observed"]').forEach(function(input) {
    input.addEventListener('change', function() {
        input.closest('form').submit();
    });
});
</script>
@endpush
