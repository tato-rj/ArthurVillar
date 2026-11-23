export function bindGoogleHideForm(form, weekStartDay, requestJson, submitHide, onBack) {
    const picker = form.querySelector('.calendar-cancel-picker');
    const grid = picker.querySelector('[data-cancel-grid]');
    const status = picker.querySelector('[data-cancel-status]');
    const retry = picker.querySelector('[data-cancel-retry]');
    const previous = picker.querySelector('[data-month-offset="-1"]');
    const next = picker.querySelector('[data-month-offset="1"]');
    const submit = form.querySelector('[type="submit"]');
    const selected = new Set();
    const monthFormat = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
    const dayFormat = new Intl.DateTimeFormat('en', { dateStyle: 'long' });
    let event, month, dates, request;

    function updateCount() {
        status.textContent = dates.size ? `Select dates to hide. ${selected.size} selected.` : 'No available dates.';
        submit.disabled = selected.size === 0;
    }

    function renderMonth() {
        const prefix = month.getFullYear() + '-' + String(month.getMonth() + 1).padStart(2, '0');
        picker.querySelector('[data-cancel-month]').textContent = monthFormat.format(month);
        const available = Array.from(dates);
        previous.disabled = !available.some(date => date.slice(0, 7) < prefix);
        next.disabled = !available.some(date => date.slice(0, 7) > prefix);
        grid.replaceChildren();
        const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        for (let day = 1; day <= last; day++) {
            const date = prefix + '-' + String(day).padStart(2, '0');
            const available = dates.has(date);
            const cell = document.createElement(available ? 'label' : 'button');
            cell.className = 'calendar-cancel-day';
            cell.textContent = day;
            if (day === 1) cell.style.gridColumnStart = 1 + (month.getDay() - weekStartDay + 7) % 7;
            if (available) {
                const input = document.createElement('input');
                input.type = 'checkbox';
                input.value = date;
                input.checked = selected.has(date);
                input.setAttribute('aria-label', 'Hide ' + dayFormat.format(new Date(month.getFullYear(), month.getMonth(), day)));
                cell.classList.toggle('is-opened', date === event.date);
                cell.appendChild(input);
            } else {
                cell.type = 'button';
                cell.disabled = true;
            }
            grid.appendChild(cell);
        }
        updateCount();
    }

    async function loadDates() {
        const controller = new AbortController();
        request = controller;
        submit.disabled = previous.disabled = next.disabled = true;
        retry.hidden = true;
        status.textContent = 'Loading dates…';
        try {
            const payload = await requestJson(event.occurrencesUrl, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
            }, 'Unable to load Google event dates.');
            if (request !== controller) return;
            dates = new Set(payload.dates);
            renderMonth();
        } catch (error) {
            if (request !== controller) return;
            status.textContent = error.message;
            retry.hidden = false;
        } finally {
            if (request === controller) request = null;
        }
    }

    function close() {
        request?.abort();
        request = null;
        event = dates = null;
        selected.clear();
        form.reset();
        form.hidden = picker.hidden = true;
        form.querySelector('fieldset').disabled = submit.disabled = false;
        grid.replaceChildren();
        delete form.dataset.eventGuid;
    }

    form.addEventListener('change', function(e) {
        if (e.target.name === 'scope') {
            picker.hidden = e.target.value !== 'multiple';
            if (picker.hidden) {
                request?.abort();
                request = null;
                submit.disabled = false;
            } else if (dates) {
                renderMonth();
            } else {
                picker.querySelector('[data-cancel-month]').textContent = monthFormat.format(month);
                loadDates();
            }
        } else if (grid.contains(e.target)) {
            if (e.target.checked) selected.add(e.target.value);
            else selected.delete(e.target.value);
            updateCount();
        }
    });
    picker.addEventListener('click', function(e) {
        const nav = e.target.closest('[data-month-offset]');
        if (nav && dates) {
            month.setMonth(month.getMonth() + Number(nav.dataset.monthOffset));
            renderMonth();
        } else if (e.target === retry) {
            loadDates();
        }
    });
    form.querySelector('[data-google-hide-back]').addEventListener('click', () => { close(); onBack(); });
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        if (!event || form.hidden || submit.disabled) return;
        const opened = event;
        const scope = form.elements.scope.value;
        form.querySelector('fieldset').disabled = submit.disabled = true;
        try {
            await submitHide(opened, scope === 'multiple' ? { scope, dates: Array.from(selected) } : { scope });
        } finally {
            if (event === opened) form.querySelector('fieldset').disabled = submit.disabled = false;
        }
    });
    return {
        close,
        open(opened) {
            close();
            event = opened;
            month = new Date(opened.date.slice(0, 7) + '-01T12:00:00');
            form.dataset.eventGuid = opened.guid;
            form.hidden = false;
            form.querySelector('input:checked').focus();
        },
    };
}
