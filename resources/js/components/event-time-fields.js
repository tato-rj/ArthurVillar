const SELECTOR = '[data-general-event-time-fields]';
const DEFAULT_DURATION_MINUTES = 60;
const MINIMUM_DURATION_MINUTES = 15;

const timeToMinutes = function(value) {
    const match = String(value || '').match(/^(\d{1,2}):(\d{2})/);

    if (!match) {
        return null;
    }

    return (Number(match[1]) * 60) + Number(match[2]);
};

const formatDuration = function(minutes) {
    if (minutes >= 60) {
        const hours = minutes / 60;

        return `${Number.isInteger(hours) ? hours : hours.toFixed(1)} hr`;
    }

    return `${minutes} min`;
};

const cacheEndOptions = function(endSelect) {
    if (!Array.isArray(endSelect.generalEventEndOptions)) {
        endSelect.generalEventEndOptions = Array.from(endSelect.options).map(function(option) {
            return {
                value: option.value,
                label: option.textContent,
            };
        });
    }

    return endSelect.generalEventEndOptions;
};

const restoreEndOptions = function(endSelect, preferredValue) {
    const options = cacheEndOptions(endSelect);

    endSelect.innerHTML = '';
    options.forEach(function(option) {
        endSelect.add(new Option(option.label, option.value));
    });
    endSelect.value = preferredValue || '';
};

const renderEndOptions = function(container, preferredValue) {
    const startSelect = container.querySelector('select[name="starts_at"]');
    const endSelect = container.querySelector('select[name="ends_at"]');

    if (!startSelect || !endSelect) {
        return;
    }

    const startMinutes = timeToMinutes(startSelect.value);

    if (startMinutes === null) {
        restoreEndOptions(endSelect, preferredValue || endSelect.value);
        return;
    }

    const options = cacheEndOptions(endSelect).filter(function(option) {
        const endMinutes = timeToMinutes(option.value);

        return option.value === '' || (endMinutes !== null && endMinutes > startMinutes);
    });

    endSelect.innerHTML = '';
    options.forEach(function(option) {
        const endMinutes = timeToMinutes(option.value);
        const label = option.value === ''
            ? option.label
            : `${option.label} (${formatDuration(endMinutes - startMinutes)})`;

        endSelect.add(new Option(label, option.value));
    });

    const selectedValue = preferredValue || '';
    endSelect.value = Array.from(endSelect.options).some(function(option) {
        return option.value === selectedValue;
    }) ? selectedValue : '';
};

const getMaximumEndMinutes = function(endSelect) {
    return cacheEndOptions(endSelect).reduce(function(maximum, option) {
        const minutes = timeToMinutes(option.value);

        return minutes === null ? maximum : Math.max(maximum, minutes);
    }, 0);
};

const minutesToTime = function(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;

    return `${String(hours).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
};

const refresh = function(container) {
    const startSelect = container.querySelector('select[name="starts_at"]');
    const endSelect = container.querySelector('select[name="ends_at"]');

    if (!startSelect || !endSelect) {
        return;
    }

    const startMinutes = timeToMinutes(startSelect.value);
    const endMinutes = timeToMinutes(endSelect.value);

    if (startMinutes !== null && endMinutes !== null && endMinutes > startMinutes) {
        container.generalEventDurationMinutes = endMinutes - startMinutes;
    }

    renderEndOptions(container, endSelect.value);
};

const initialize = function(container) {
    if (!container || container.generalEventTimeFieldsInitialized) {
        return;
    }

    const startSelect = container.querySelector('select[name="starts_at"]');
    const endSelect = container.querySelector('select[name="ends_at"]');

    if (!startSelect || !endSelect) {
        return;
    }

    container.generalEventTimeFieldsInitialized = true;
    cacheEndOptions(endSelect);
    refresh(container);

    startSelect.addEventListener('change', function() {
        const startMinutes = timeToMinutes(startSelect.value);

        if (startMinutes === null) {
            renderEndOptions(container, '');
            return;
        }

        const currentEndMinutes = timeToMinutes(endSelect.value);
        const currentDifference = currentEndMinutes !== null && currentEndMinutes > startMinutes
            ? currentEndMinutes - startMinutes
            : null;
        const duration = container.generalEventDurationMinutes
            || currentDifference
            || DEFAULT_DURATION_MINUTES;
        const maximumEnd = getMaximumEndMinutes(endSelect);
        const shiftedEnd = Math.min(startMinutes + Math.max(MINIMUM_DURATION_MINUTES, duration), maximumEnd);

        renderEndOptions(container, minutesToTime(shiftedEnd));
    });

    endSelect.addEventListener('change', function() {
        const startMinutes = timeToMinutes(startSelect.value);
        const endMinutes = timeToMinutes(endSelect.value);

        if (startMinutes !== null && endMinutes !== null && endMinutes > startMinutes) {
            container.generalEventDurationMinutes = endMinutes - startMinutes;
        }
    });

    const form = container.closest('form');

    if (form && !form.generalEventTimeResetListener) {
        form.generalEventTimeResetListener = true;
        form.addEventListener('reset', function() {
            window.setTimeout(function() {
                window.resetEventTimeFields(form);
                window.refreshEventTimeFields(form);
            }, 0);
        });
    }
};

const eachContainer = function(root, callback) {
    const scope = root && root.querySelectorAll ? root : document;

    if (scope.matches && scope.matches(SELECTOR)) {
        callback(scope);
    }

    scope.querySelectorAll(SELECTOR).forEach(callback);
};

window.initializeEventTimeFields = function(root) {
    eachContainer(root, initialize);
};

window.resetEventTimeFields = function(root) {
    eachContainer(root, function(container) {
        const endSelect = container.querySelector('select[name="ends_at"]');

        container.generalEventDurationMinutes = null;
        if (endSelect) {
            restoreEndOptions(endSelect, endSelect.value);
        }
    });
};

window.refreshEventTimeFields = function(root) {
    eachContainer(root, function(container) {
        initialize(container);
        refresh(container);
    });
};

const observeDynamicForms = function() {
    window.initializeEventTimeFields(document);

    new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    window.initializeEventTimeFields(node);
                }
            });
        });
    }).observe(document.body, { childList: true, subtree: true });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeDynamicForms);
} else {
    observeDynamicForms();
}
