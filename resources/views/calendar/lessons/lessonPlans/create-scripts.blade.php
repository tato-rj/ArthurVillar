<script>
window.calendarLessonPlanCreateForms = window.calendarLessonPlanCreateForms || (function() {
    const openCombobox = function(combobox) {
        if (combobox) {
            combobox.setAttribute('open', '');
        }
    };

    const closeCombobox = function(combobox) {
        if (combobox) {
            combobox.removeAttribute('open');
        }
    };

    const filterComboboxOptions = function(combobox) {
        const input = combobox.querySelector('[data-student-combobox-input]');
        const options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));
        const empty = combobox.querySelector('[data-student-combobox-empty]');
        const query = String(input ? input.value : '').trim().toLowerCase();
        let visibleCount = 0;

        options.forEach(function(option) {
            const isVisible = !query || String(option.dataset.studentName || option.textContent).toLowerCase().includes(query);

            option.style.display = isVisible ? '' : 'none';
            visibleCount += isVisible ? 1 : 0;
        });

        combobox.querySelectorAll('[data-student-combobox-group]').forEach(function(group) {
            const hasVisibleOption = Array.from(group.querySelectorAll('[data-student-combobox-option]')).some(function(option) {
                return option.style.display !== 'none';
            });

            group.style.display = hasVisibleOption ? '' : 'none';
        });

        if (empty) {
            empty.style.display = visibleCount ? 'none' : '';
        }
    };

    const selectedLocationOption = function(form) {
        const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;

        return locationSelect ? locationSelect.options[locationSelect.selectedIndex] : null;
    };

    const syncOnlineFields = function(form, selector, shouldEmpty) {
        const selectedOption = selectedLocationOption(form);
        const isOnline = selectedOption && selectedOption.dataset.isOnline === '1';

        (form ? form.querySelectorAll(selector) : []).forEach(function(field) {
            const input = field.querySelector('input');

            field.style.display = isOnline ? '' : 'none';

            if (input) {
                input.disabled = !isOnline;

                if (!isOnline || shouldEmpty) {
                    input.value = '';
                }
            }
        });
    };

    const syncFee = function(form) {
        const selectedOption = selectedLocationOption(form);
        const durationSelect = form ? form.querySelector('select[name="duration_minutes"]') : null;
        const feeInput = form ? form.querySelector('input[name="fee_amount"]') : null;
        const hourlyFee = selectedOption ? Number(selectedOption.dataset.feeAmount || 0) : 0;
        const duration = durationSelect ? Number(durationSelect.value || 0) : 0;

        if (!feeInput || !hourlyFee || !duration) {
            return;
        }

        const proratedFee = hourlyFee * (duration / 60);
        const roundedFee = Math.floor(proratedFee / 5) * 5;

        feeInput.value = roundedFee.toFixed(2).replace(/\.00$/, '');
    };

    const syncRepeatFields = function(form, shouldReset) {
        const repeatSelect = form ? form.querySelector('select[name="repeat"]') : null;
        const endsOnWrapper = form ? form.querySelector('[data-lesson-repeat-end]') : null;
        const endsOnInput = endsOnWrapper ? endsOnWrapper.querySelector('input[name="ends_on"]') : null;
        const isRecurring = repeatSelect && repeatSelect.value !== 'none';

        if (!endsOnWrapper || !endsOnInput) {
            return;
        }

        endsOnWrapper.style.display = isRecurring ? '' : 'none';
        endsOnInput.disabled = !isRecurring;
        endsOnInput.required = !!isRecurring;

        if (!isRecurring && shouldReset) {
            endsOnInput.value = '';
        }
    };

    const syncFormDefaultsFromStudentOption = function(option) {
        const form = option ? option.closest('form') : null;
        const locationSelect = form ? form.querySelector('select[name="location_id"]') : null;
        const paymentMethodSelect = form ? form.querySelector('select[name="payment_method"]') : null;
        const paymentSection = form ? form.querySelector('[data-lesson-payment-section]') : null;

        if (locationSelect && option.dataset.studentLocationId) {
            locationSelect.value = option.dataset.studentLocationId;
            locationSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (paymentMethodSelect && option.dataset.studentPaymentMethod) {
            paymentMethodSelect.value = option.dataset.studentPaymentMethod;
        }

        if (paymentSection) {
            paymentSection.hidden = option.dataset.studentPaymentExempt === '1';
        }

        syncFee(form);
    };

    const syncGroupClass = function(form) {
        const checkbox = form ? form.querySelector('[data-group-class]') : null;
        const combobox = form ? form.querySelector('[data-student-combobox]') : null;
        const input = combobox ? combobox.querySelector('[data-student-combobox-input]') : null;
        const value = combobox ? combobox.querySelector('[data-student-combobox-value]') : null;
        const paymentSection = form ? form.querySelector('[data-lesson-payment-section]') : null;
        const isGroupClass = !!(checkbox && checkbox.checked);

        if (!checkbox || !combobox || !input || !value) {
            return;
        }

        if (isGroupClass) {
            input.value = '';
            value.value = '';
            input.setCustomValidity('');
            closeCombobox(combobox);

            if (paymentSection) {
                paymentSection.hidden = false;
            }
        }

        input.disabled = isGroupClass;
        value.disabled = isGroupClass;
        value.required = !isGroupClass;
        combobox.classList.toggle('opacity-6', isGroupClass);
    };

    const initializeComboboxes = function(root) {
        (root || document).querySelectorAll('[data-student-combobox]').forEach(function(combobox) {
            if (combobox.dataset.initialized) {
                return;
            }

            combobox.dataset.initialized = '1';

            const input = combobox.querySelector('[data-student-combobox-input]');
            const value = combobox.querySelector('[data-student-combobox-value]');
            const options = Array.from(combobox.querySelectorAll('[data-student-combobox-option]'));
            const form = combobox.closest('form');

            filterComboboxOptions(combobox);

            if (input) {
                input.addEventListener('focus', function() {
                    filterComboboxOptions(combobox);
                    openCombobox(combobox);
                });

                input.addEventListener('input', function() {
                    if (value) {
                        value.value = '';
                    }

                    input.setCustomValidity('');
                    filterComboboxOptions(combobox);
                    openCombobox(combobox);
                });

                input.addEventListener('keydown', function(event) {
                    if (event.key === 'Escape') {
                        closeCombobox(combobox);
                        input.blur();
                    }
                });
            }

            options.forEach(function(option) {
                option.addEventListener('click', function() {
                    if (input) {
                        input.value = option.dataset.studentName || option.textContent.trim();
                        input.setCustomValidity('');
                    }

                    if (value) {
                        value.value = option.dataset.studentId || '';
                    }

                    syncFormDefaultsFromStudentOption(option);
                    closeCombobox(combobox);
                });
            });

            if (form) {
                form.addEventListener('submit', function(event) {
                    const groupClass = form.querySelector('[data-group-class]');

                    if (groupClass && groupClass.checked) {
                        return;
                    }

                    if (!value || value.value) {
                        return;
                    }

                    const typedName = input ? input.value.trim().toLowerCase() : '';
                    const exactMatch = options.find(function(option) {
                        return String(option.dataset.studentName || '').toLowerCase() === typedName;
                    });

                    if (exactMatch) {
                        if (input) {
                            input.value = exactMatch.dataset.studentName || exactMatch.textContent.trim();
                        }

                        value.value = exactMatch.dataset.studentId || '';
                        syncFormDefaultsFromStudentOption(exactMatch);
                    }

                    if (!value.value) {
                        event.preventDefault();

                        if (input) {
                            input.setCustomValidity('Select a student from the list.');
                            input.reportValidity();
                        }

                        openCombobox(combobox);
                    }
                });
            }
        });
    };

    const initializeForms = function(root) {
        (root || document).querySelectorAll('[data-single-lesson-plan-form], [data-lesson-plan-form]').forEach(function(form) {
            if (form.dataset.createFormInitialized) {
                return;
            }

            form.dataset.createFormInitialized = '1';

            const locationSelect = form.querySelector('select[name="location_id"]');
            const durationSelect = form.querySelector('select[name="duration_minutes"]');
            const repeatSelect = form.querySelector('select[name="repeat"]');
            const groupClass = form.querySelector('[data-group-class]');
            const onlineSelector = form.matches('[data-single-lesson-plan-form]')
                ? '.single-lesson-plan-online-field'
                : '.lesson-plan-online-field';

            syncOnlineFields(form, onlineSelector, false);
            syncFee(form);
            syncRepeatFields(form, false);
            syncGroupClass(form);

            if (groupClass) {
                groupClass.addEventListener('change', function() {
                    syncGroupClass(form);
                });
            }

            if (locationSelect) {
                locationSelect.addEventListener('change', function() {
                    syncFee(form);
                    syncOnlineFields(form, onlineSelector, true);
                });
            }

            if (durationSelect) {
                durationSelect.addEventListener('change', function() {
                    syncFee(form);
                });
            }

            if (repeatSelect) {
                repeatSelect.addEventListener('change', function() {
                    syncRepeatFields(form, true);
                });
            }
        });
    };

    const initialize = function(root) {
        initializeComboboxes(root || document);
        initializeForms(root || document);
    };

    document.addEventListener('click', function(event) {
        document.querySelectorAll('[data-student-combobox][open]').forEach(function(combobox) {
            if (!combobox.contains(event.target)) {
                closeCombobox(combobox);
            }
        });
    });

    return { initialize };
})();

document.addEventListener('DOMContentLoaded', function() {
    window.calendarLessonPlanCreateForms.initialize(document);
});
</script>
