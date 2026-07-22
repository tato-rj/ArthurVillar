@extends('layouts.app', [
    'title' => 'Studio Calendar Terms of Service',
    'noMenu' => true,
    'disableAnalytics' => true,
])

@section('content')
<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            @include('calendar.public.navigation')

            <h1 class="mb-2">Terms of Service</h1>
            <p class="text-muted">Effective July 22, 2026</p>

            <p>Studio Calendar is a private scheduling application created and operated by Arthur Villar for his own personal and professional organization. It is not offered to the public as a commercial product or service.</p>

            <h2 class="h4 mt-5">Personal, non-commercial application</h2>
            <p>No public account registration, subscription, purchase, or payment is offered through Studio Calendar. Access to its private scheduling features is limited to the owner and any access explicitly authorized by him.</p>

            <h2 class="h4 mt-5">Google Calendar connection</h2>
            <p>Connecting a Google account authorizes read-only access to the calendar information described in the <a href="{{route('calendar.privacy')}}">Privacy Policy</a>. Studio Calendar does not create, edit, or delete events in Google Calendar. A connection may be removed from Studio Calendar or revoked through Google Account settings.</p>

            <h2 class="h4 mt-5">Availability</h2>
            <p>The application is provided for personal use on an as-is and as-available basis. Its features may be changed, suspended, or discontinued at any time. No guarantee is made that synchronization will always be uninterrupted, complete, or error-free.</p>

            <h2 class="h4 mt-5">Third-party services</h2>
            <p>Google Calendar functionality depends on services provided by Google and is also subject to Google's applicable terms and policies. Studio Calendar is not affiliated with or endorsed by Google.</p>

            <h2 class="h4 mt-5">Changes and contact</h2>
            <p>These terms may be updated when the application changes. Questions can be sent to <a href="mailto:arthurvillar@gmail.com">arthurvillar@gmail.com</a>.</p>

            @include('calendar.public.footer')
        </div>
    </div>
</main>
@endsection
