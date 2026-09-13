<section
    class="offline-state"
    data-offline-state
    role="dialog"
    aria-modal="true"
    aria-labelledby="offline-state-title"
    aria-describedby="offline-state-description"
    aria-hidden="true"
    hidden
>
    <div class="offline-state__content">
        <img
            class="offline-state__illustration"
            src="{{ asset('/images/offline-piano.png') }}"
            alt=""
            width="720"
            height="720"
        >

        <h1 class="offline-state__title" id="offline-state-title">
            The piano lost the Wi-Fi
        </h1>

        <p
            class="offline-state__description"
            id="offline-state-description"
            data-offline-description
            data-default-message="We can’t reach the internet right now. Check your connection and try again."
        >
            We can’t reach the internet right now. Check your connection and try again.
        </p>

        <button class="btn btn-primary offline-state__retry" type="button" data-offline-retry>
            <span class="offline-state__retry-label" data-offline-retry-label>Try again</span>
        </button>
    </div>
</section>
