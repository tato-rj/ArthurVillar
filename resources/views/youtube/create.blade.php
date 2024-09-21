@extends('layouts.app', ['title' => 'Youtube Converter'])

@push('header')
@endpush

@section('content')
<section class="container py-5">
    <div class="row mb-4">
        @pagetitle(['label' => 'Youtube Converter'])

        <div class="col-lg-6 col-md-8 col-10 mx-auto">
            <form id="create-track" method="POST" action="{{route('admin.youtube.convert')}}">
                @csrf

                @input(['placeholder' => 'Youtube url', 'name' => 'youtube_url', 'required' => true, 'value' => old('youtube_url')])

                <div class="row">
                    @input(['placeholder' => 'Start', 'grid' => 'col', 'name' => 'start_time', 'value' => old('start_time')])
                    @input(['placeholder' => 'End', 'grid' => 'col', 'name' => 'end_time', 'value' => old('end_time')])
                </div>

                @submit(['label' => 'Submit', 'theme' => 'primary'])
            </form>
        </div>
    </div>

</section>
@endsection

@push('scripts')
<script>

$('#create-track button[type=submit]').click(function(e) {
    e.preventDefault();
    
    $(this).disable();

    loading();

    convertYoutube(this);
});

function loading()
{
    $feedback = $('#overlay').find('#overlay-feedback');
    $feedback.text($feedback.data('default'));

    $('#overlay-spinner').show();
    $('#overlay-success').hide();

    $('#overlay').fadeIn('fast');
}

function convertYoutube(button) {
    let $form = $(button).closest('form');
    let youtubeUrl = $form.find('input[name="youtube_url"]').val();
    let start = $form.find('input[name="start_time"]').val();
    let end = $form.find('input[name="end_time"]').val();

    axios.post($form.attr('action'), {youtubeUrl: youtubeUrl, start: start, end: end})
         .then(function(response) {
            $('#overlay-spinner').hide();
            $('#overlay-success').show();
            $('#overlay-feedback').text(response.data.feedback);

            setTimeout(function() {
                window.location = response.data.downloadUrl;
                $('#overlay').fadeOut();
                $('input').val('');
                $('button').enable();
            }, 1000);
         })
         .catch(function(error) {
            // log(error);
            $('#overlay').fadeOut('fast', function() {
                log(error.response.data);
            });
         });
}
</script>
@endpush