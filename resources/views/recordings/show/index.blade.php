@extends('layouts.app', ['title' => $book->name])

@push('header')
<style type="text/css">
[data-track]:hover {
    background: #ffe54c !important;
}

#header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
</style>
@endpush

@section('content')
<section class="container pb-5">
    <div id="header" class="pt-5 bg-white">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-10 mx-auto">
                <div class="mb-3" style="font-size: 76%">
                    <a href="{{route('suzuki.index')}}">@fa(['icon' => 'long-arrow-left'])CHANGE BOOK</a>
                </div>

                <p class="text-center m-0">Suzuki Piano Series</p>
                <h1 class="text-center mb-4">{{$book->name}}</h1>
                @include('recordings.show.controls')
            </div>
        </div>
    </div>
    <div id="tracks-container" class="row py-3">
        <div class="col-lg-4 col-md-6 col-10 mx-auto">
            @each('recordings.show.play', $book->tracks, 'track')
        </div>
    </div>
</section>
@endsection

@push('scripts')
<script type="text/javascript">
let audio, shuffle;

$(document).ready(function() {
    $('#tracks-container').css({'margin-top': $('#header').outerHeight()});
    window.scrollTo({top: 0});
});

$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#controls').addClass('border-bottom');
    } else {
        $('#controls').removeClass('border-bottom');
    }
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
            $button = $(button).next();
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
@endpush