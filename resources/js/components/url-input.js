const urlInputSelector = 'input[type="url"]';

const normalizeUrlInput = function(input) {
    if (!input || !input.matches(urlInputSelector)) {
        return;
    }

    const value = input.value.trim();

    if (!value) {
        input.value = '';
        return;
    }

    if (/^[a-z][a-z\d+.-]*:\/\//i.test(value)) {
        input.value = value;
        return;
    }

    input.value = value.startsWith('//')
        ? `https:${value}`
        : `https://${value.replace(/^\/+/, '')}`;
};

document.addEventListener('paste', function(event) {
    if (!event.target.matches(urlInputSelector)) {
        return;
    }

    window.setTimeout(function() {
        normalizeUrlInput(event.target);
    });
});

document.addEventListener('change', function(event) {
    normalizeUrlInput(event.target);
});

document.addEventListener('focusout', function(event) {
    normalizeUrlInput(event.target);
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        normalizeUrlInput(event.target);
    }
});

