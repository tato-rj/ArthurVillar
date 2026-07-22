@extends('layouts.app', [
    'title' => 'Studio Calendar Privacy Policy',
    'noMenu' => true,
    'disableAnalytics' => true,
])

@section('content')
<main class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-8">
            @include('calendar.public.navigation')

            <h1 class="mb-2">Privacy Policy</h1>
            <p class="text-muted">Effective July 22, 2026</p>

            <p>Studio Calendar is a private, non-commercial scheduling application created and operated by Arthur Villar for his own use. This policy explains how the application handles information when a Google account is connected.</p>

            <h2 class="h4 mt-5">Information accessed from Google</h2>
            <p>After the account owner grants permission, Studio Calendar may access:</p>
            <ul>
                <li>Basic Google profile information, such as the profile name and picture.</li>
                <li>Primary calendar metadata, including the calendar identifier, name, and time zone.</li>
                <li>Google Calendar event information, including titles, descriptions, locations, dates and times, recurrence information, status, organizer and attendee information, conferencing links, and links back to Google Calendar.</li>
            </ul>
            <p>The application processes calendar changes and retains relevant meetings where the connected account is an attendee, is not the organizer, and has not declined. Other downloaded events are not retained as imported Studio Calendar events.</p>

            <h2 class="h4 mt-5">How the information is used</h2>
            <p>Google information is used only to identify the connected calendar, synchronize relevant events, display those events in Studio Calendar, and help the owner identify scheduling conflicts. The integration is read-only and cannot create, modify, or delete Google Calendar events.</p>

            <h2 class="h4 mt-5">Storage and security</h2>
            <p>Imported event records and calendar connection details are stored in Studio Calendar's private database. Google OAuth access and refresh tokens are encrypted at rest by the application. Access to the scheduling interface requires authentication.</p>

            <h2 class="h4 mt-5">Sharing and sale of information</h2>
            <p>Studio Calendar does not sell Google user data, use it for advertising, or share it with other people. Information is disclosed only when necessary to operate the application's hosting infrastructure, comply with the law, or protect the security of the application.</p>
            <p>Studio Calendar's use and transfer of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including its Limited Use requirements.</p>

            <h2 class="h4 mt-5">Retention and deletion</h2>
            <p>Google Calendar information is retained while its Google account remains connected and as needed for synchronization. Disconnecting an account from Studio Calendar deletes the stored connection and its imported Google events. Authorization can also be revoked through the Google Account third-party connections settings.</p>

            <h2 class="h4 mt-5">Other technical information</h2>
            <p>The hosting environment may produce ordinary security and server logs, such as IP address, browser information, request time, and error details. Google Calendar event contents are not used for advertising or intentionally sent to analytics services. These public information pages do not load the site's analytics script.</p>

            <h2 class="h4 mt-5">Changes and contact</h2>
            <p>This policy may be updated if the application's functionality or data practices change. Questions or requests concerning Google data can be sent to <a href="mailto:arthurvillar@gmail.com">arthurvillar@gmail.com</a>.</p>

            @include('calendar.public.footer')
        </div>
    </div>
</main>
@endsection
