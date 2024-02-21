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
                    <a href="{{route('recordings.index')}}">@fa(['icon' => 'long-arrow-left'])CHANGE BOOK</a>
                </div>

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
let audio;

$(document).ready(function() {
    $('#tracks-container').css({'margin-top': $('#header').outerHeight()});
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
        $(button).next().click();
    });

    select(button);
    $('#play-all').text('Stop');
}

function stop() {
    if (isPlaying()) {
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

$('#play-all').click(function() {
    if (isPlaying()) {
        stop();
        $(this).text('Play all');
    } else {
        $('[data-track]').first().click();
    }
});

$('#shuffle').click(function() {
    var container = $('#tracks-container > div');
    var elements = container.children();

    for (var i = elements.length; i > 0; i--) {
        var randomIndex = Math.floor(Math.random() * i);
        container.append(elements[randomIndex]);
    }
    // shuffle = true;

    // $('#play-all').text('Stop');

    // stop();

    // $button = $('[data-track]').random();

    // scrollTo($button);

    // $button.click();
});

function scrollTo($button) {
    var viewportHeight = $(window).height();
    var targetPosition = $button.offset().top;
    var targetHeight = $button.outerHeight();

    var scrollToPosition = targetPosition - (viewportHeight - targetHeight) / 2;

    $('html, body').animate({
        scrollTop: scrollToPosition
    }, {
        duration: 200, // Adjust the duration (in milliseconds) as needed
        easing: "linear"
    });
}
</script>
@endpush