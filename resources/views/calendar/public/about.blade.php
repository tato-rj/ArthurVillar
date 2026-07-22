@extends('layouts.app', [
    'title' => 'About Studio Calendar',
    'noMenu' => true,
    'disableAnalytics' => true,
])

@section('content')
<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            @include('calendar.public.navigation')

            <h1 class="mb-4">Studio Calendar</h1>
            <p class="lead">A private scheduling application created and operated by Arthur Villar for managing his teaching studio and personal calendar.</p>

            <h2 class="h4 mt-5">What the application does</h2>
            <p>Studio Calendar keeps lessons, recurring lesson plans, teaching breaks, recitals, expenses, and general events together in one scheduling interface. It is a personal administrative tool and is not offered as a commercial service.</p>

            <h2 class="h4 mt-5">Google Calendar integration</h2>
            <p>A Google account can be connected to display relevant Google Calendar events alongside studio events. The integration is read-only: Studio Calendar cannot create, edit, or delete anything in Google Calendar.</p>
            <p>The application uses Google Calendar data only to synchronize relevant event details and make scheduling conflicts visible. A connected account can be disconnected at any time, which removes its stored connection and imported events from Studio Calendar.</p>

            <h2 class="h4 mt-5">Personal and non-commercial use</h2>
            <p>Studio Calendar is intended solely for its owner's personal use. It does not sell subscriptions, process payments, advertise to users, or sell Google user data.</p>

            <p class="mt-5">For details about data handling, read the <a href="{{route('calendar.privacy')}}">Privacy Policy</a>.</p>

            @include('calendar.public.footer')
        </div>
    </div>
</main>
@endsection
