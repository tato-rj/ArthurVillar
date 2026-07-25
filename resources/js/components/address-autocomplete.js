const addressStates = new WeakMap();

const csrfToken = function() {
    const token = document.querySelector('meta[name="csrf-token"]');

    return token ? token.content : (window.calendarCsrfToken || '');
};

const sessionToken = function() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
    }

    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
};

const stateFor = function(fields) {
    if (!addressStates.has(fields)) {
        addressStates.set(fields, {
            activeIndex: -1,
            controller: null,
            menu: null,
            timer: null,
            token: sessionToken(),
        });
    }

    return addressStates.get(fields);
};

const closeMenu = function(fields) {
    const state = addressStates.get(fields);
    const input = fields && fields.querySelector('input[name="address"]');

    if (!state) {
        return;
    }

    if (state.menu) {
        state.menu.remove();
        state.menu = null;
    }

    state.activeIndex = -1;

    if (input) {
        input.setAttribute('aria-expanded', 'false');
        input.removeAttribute('aria-activedescendant');
    }
};

const postJson = function(url, body, signal) {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        signal: signal,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken(),
            'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(body),
    }).then(function(response) {
        if (response.status === 204) {
            return null;
        }

        if (!response.ok) {
            throw new Error('Unable to load address suggestions.');
        }

        return response.json();
    });
};

const setActiveSuggestion = function(fields, index) {
    const state = stateFor(fields);
    const input = fields.querySelector('input[name="address"]');
    const suggestions = state.menu
        ? Array.from(state.menu.querySelectorAll('[data-address-suggestion]'))
        : [];

    if (!suggestions.length) {
        return;
    }

    state.activeIndex = (index + suggestions.length) % suggestions.length;
    suggestions.forEach(function(suggestion, suggestionIndex) {
        const active = suggestionIndex === state.activeIndex;

        suggestion.classList.toggle('is-active', active);
        suggestion.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    if (input) {
        input.setAttribute('aria-activedescendant', suggestions[state.activeIndex].id);
    }
};

const renderSuggestions = function(fields, suggestions) {
    const state = stateFor(fields);
    const input = fields.querySelector('input[name="address"]');
    const control = input && input.closest('.form-control');

    closeMenu(fields);

    if (!control || !suggestions.length) {
        return;
    }

    const menu = document.createElement('div');

    menu.className = 'address-autocomplete-results';
    menu.setAttribute('role', 'listbox');
    menu.id = `address-suggestions-${Math.random().toString(36).slice(2, 10)}`;

    suggestions.forEach(function(suggestion, index) {
        const option = document.createElement('button');
        const main = document.createElement('span');
        const secondary = document.createElement('span');

        option.type = 'button';
        option.className = 'address-autocomplete-option';
        option.id = `${menu.id}-${index}`;
        option.dataset.addressSuggestion = '';
        option.dataset.placeId = suggestion.place_id;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');

        main.className = 'address-autocomplete-main';
        main.textContent = suggestion.main_text || suggestion.label;
        option.appendChild(main);

        if (suggestion.secondary_text) {
            secondary.className = 'address-autocomplete-secondary';
            secondary.textContent = suggestion.secondary_text;
            option.appendChild(secondary);
        }

        menu.appendChild(option);
    });

    const attribution = document.createElement('div');

    attribution.className = 'address-autocomplete-attribution';
    attribution.setAttribute('translate', 'no');
    attribution.textContent = 'Google Maps';
    menu.appendChild(attribution);

    control.classList.add('address-autocomplete-control');
    control.appendChild(menu);
    state.menu = menu;
    state.activeIndex = -1;
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', menu.id);
    input.setAttribute('aria-expanded', 'true');
};

const setSelectValue = function(select, value) {
    if (!select) {
        return;
    }

    const normalized = String(value || '').trim().toLowerCase();
    const option = Array.from(select.options).find(function(item) {
        return item.value.toLowerCase() === normalized
            || item.textContent.trim().toLowerCase() === normalized;
    });

    select.value = option ? option.value : '';
};

const applyAddress = function(fields, address) {
    const addressInput = fields.querySelector('input[name="address"]');
    const cityInput = fields.querySelector('input[name="city"]');
    const stateSelect = fields.querySelector('select[name="state"]');
    const postalCodeInput = fields.querySelector('input[name="postal_code"]');

    if (addressInput) addressInput.value = address.address || '';
    if (cityInput) cityInput.value = address.city || '';
    if (postalCodeInput) postalCodeInput.value = address.postal_code || '';
    setSelectValue(stateSelect, address.state);
};

const chooseSuggestion = function(fields, option) {
    const state = stateFor(fields);
    const placeId = option ? option.dataset.placeId : '';
    const detailsUrl = fields.dataset.addressDetailsUrl;

    if (!placeId || !detailsUrl) {
        return;
    }

    option.disabled = true;

    postJson(detailsUrl, {
        place_id: placeId,
        session_token: state.token,
    })
        .then(function(response) {
            if (response && response.address) {
                applyAddress(fields, response.address);
            }
        })
        .catch(function(error) {
            if (error.name !== 'AbortError') {
                console.error(error);
            }
        })
        .finally(function() {
            closeMenu(fields);
            state.token = sessionToken();
        });
};

document.addEventListener('input', function(event) {
    const input = event.target.closest('[data-address-fields] input[name="address"]');

    if (!input) {
        return;
    }

    const fields = input.closest('[data-address-fields]');
    const state = stateFor(fields);
    const query = input.value.trim();

    window.clearTimeout(state.timer);

    if (state.controller) {
        state.controller.abort();
        state.controller = null;
    }

    if (query.length < 3) {
        closeMenu(fields);
        return;
    }

    state.timer = window.setTimeout(function() {
        state.controller = new AbortController();

        postJson(fields.dataset.addressSearchUrl, {
            input: query,
            session_token: state.token,
        }, state.controller.signal)
            .then(function(response) {
                if (input.value.trim() !== query) {
                    return;
                }

                renderSuggestions(fields, response && Array.isArray(response.suggestions)
                    ? response.suggestions
                    : []);
            })
            .catch(function(error) {
                if (error.name !== 'AbortError') {
                    console.error(error);
                    closeMenu(fields);
                }
            });
    }, 300);
});

document.addEventListener('keydown', function(event) {
    const input = event.target.closest('[data-address-fields] input[name="address"]');

    if (!input) {
        return;
    }

    const fields = input.closest('[data-address-fields]');
    const state = stateFor(fields);
    const suggestions = state.menu
        ? Array.from(state.menu.querySelectorAll('[data-address-suggestion]'))
        : [];

    if (!suggestions.length) {
        return;
    }

    if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveSuggestion(fields, state.activeIndex + 1);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveSuggestion(fields, state.activeIndex - 1);
    } else if (event.key === 'Enter' && state.activeIndex >= 0) {
        event.preventDefault();
        chooseSuggestion(fields, suggestions[state.activeIndex]);
    } else if (event.key === 'Escape') {
        closeMenu(fields);
    }
});

document.addEventListener('click', function(event) {
    const option = event.target.closest('[data-address-suggestion]');

    if (option) {
        chooseSuggestion(option.closest('[data-address-fields]'), option);
        return;
    }

    document.querySelectorAll('[data-address-fields]').forEach(function(fields) {
        if (!fields.contains(event.target)) {
            closeMenu(fields);
        }
    });
});
