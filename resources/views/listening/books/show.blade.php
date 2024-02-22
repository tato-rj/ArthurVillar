@extends('layouts.app', ['title' => $book->name])

@push('header')
<style type="text/css">
[data-track]:hover, #controls button:hover {
    background: #ffe54c !important;
}

#header {
/*    position: fixed;
    top: 0;
    left: 0;
    width: 100%;*/
}
</style>
@endpush

@section('content')
<section class="container mb-4">
    <div id="header" class="bg-white">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-10 mx-auto">
                <div class="py-4">
                    <a class="nav-link" href="{{route('listening.index')}}">@fa(['icon' => 'long-arrow-left'])All books</a>
                </div>
                
                <div class="text-center">
                    <img id="book-cover" src="{{asset($book->cover_path)}}" style="width: 100px" class="mb-2">
                </div>

                <div class="text-center">
                    <p class="m-0">Suzuki Piano Series</p>
                    
                    <h1 class="">{{$book->name}}</h1>
                </div>

                @auth
                <div class="d-center">
                    <button data-bs-toggle="modal" data-bs-target="#create-track-modal" class="btn-raw mx-2">@fa(['icon' => 'plus'])Add track</button>
                    <button data-bs-toggle="modal" data-bs-target="#edit-book-{{$book->id}}-modal" class="btn-raw mx-2">@fa(['icon' => 'edit'])Edit book</button>
                </div>
                @endauth

                @include('listening.books.controls')
            </div>
        </div>
    </div>
    <div id="tracks-container" class="row -3">
        <div class="col-lg-4 col-md-6 col-10 mx-auto">
            @foreach($book->tracks as $track)
            @include('listening.books.track.button')
            @endforeach
        </div>
    </div>
</section>

@include('listening.books.track.create')
@include('listening.books.edit')
@endsection

@push('scripts')
<script type="text/javascript">
let audio, shuffle;

$(document).ready(function() {
    // $('#tracks-container').css({'margin-top': $('#header').outerHeight()});
    window.scrollTo({top: 0});
});

$(window).scroll(function() {
    // let scroll = $(this).scrollTop();
    // let opacity = scroll > 0 ? (10/scroll).toFixed(2) : 1;
    // let $cover = $('#book-cover');
    // let coverPos = $cover.offset().top + $cover.outerHeight();

    // $cover.css({opacity: opacity});

    // if (scroll >= coverPos) {
    //     $('#header').css({position: 'fixed'});
    //     $cover.hide();
    // }
    // if ($(this).scrollTop()) {
    //     $('#controls').addClass('border-bottom');
    // } else {
    //     $('#controls').removeClass('border-bottom');
    // }
});

$('[data-track]').click(function() {
    let isCurrentTrack = isPlaying(this);

    stop();
    resetControls();

    if (! isCurrentTrack)
        play(this);
});

function isPlaying(button = null) { 
    if (button && audio) {
        return audio.src == $(button).data('track');
    }

    return audio && ! audio.paused;
}

function play(button) {
    audio = new Audio($(button).data('track'));
    audio.play();

    audio.addEventListener("ended", function(){        
        unselectAll();

        if (shuffle) {
            $button = $('[data-track]').random();
            scrollToButton($button);
        } else {
            $button = $(button).parent().next().find('[data-track]');
        }

        $button.click();
    });

    select(button);
}

function stop() {
    if (isPlaying()) {
        shuffle = false;
        audio.pause();
        audio.currentTime = 0;
        audio = null;

        unselectAll();
    }
}

function select(button) {
    $(button).addClass('bg-primary').find('i').removeClass('fa-circle-play').addClass('fa-circle-pause');;
}

function unselectAll() {
    $('[data-track]').removeClass('bg-primary').find('i').addClass('fa-circle-play').removeClass('fa-circle-pause');
}

$(document).on('click', '#play-all[start]', function() {
    stop();
    resetControls();

    $button = $('[data-track]').first();
    scrollToButton($button);
    play($button);
    $(this).removeAttr('start').attr('stop', true).text('Stop').addClass('bg-primary');
});

$(document).on('click', '#shuffle[start]', function() {
    stop();
    resetControls();

    shuffle = true;
    $button = $('[data-track]').random();

    scrollToButton($button);
    play($button);
    $(this).removeAttr('start').attr('stop', true).text('Stop').addClass('bg-primary');
});

$(document).on('click', 'button[stop]', function() {
    stop();
    resetControls();
});

function scrollToButton($button) {
    var viewportHeight = $(window).height();
    var targetPosition = $button.offset().top;
    var targetHeight = $button.outerHeight();

    var scrollToPosition = targetPosition - (viewportHeight - targetHeight) / 2;

    $('html, body').animate({
        scrollTop: scrollToPosition
    }, {
        duration: 200,
        easing: "linear"
    });
}

function resetControls() {
    $('button[stop]').each(function() {
        $(this).removeAttr('stop').attr('start', true).text($(this).data('label')).removeClass('bg-primary');
    });
}
</script>

<script type="text/javascript">
$('#create-track button[type=submit]').click(function(e) {
    e.preventDefault();
    
    convertYoutube($(this).closest('form'));
});

$('#edit-track button[type=submit]').click(function(e) {
    e.preventDefault();
    
    let $form = $(this).closest('form');

    if ($form.find('input[name="youtube_url"]').val()) {
        convertYoutube($form);
    } else {
        $form.submit();
    }
});

function convertYoutube($form) {
    let youtubeUrl = $form.find('input[name="youtube_url"]').val();

    $('#overlay').fadeIn('fast');

    axios.post("{{route('listening.books.tracks.youtube', $book)}}", {youtubeUrl: youtubeUrl})
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
@endpush