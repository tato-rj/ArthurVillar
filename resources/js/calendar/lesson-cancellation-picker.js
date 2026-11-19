// Keep this selection independent of the main calendar's visible range and filters.
export function bindLessonCancellationPicker(form, weekStartDay, requestJson) {
    const picker = form.querySelector('#multiple-event-picker');
    const grid = picker.querySelector('[data-cancel-grid]');
    const status = picker.querySelector('[data-cancel-status]');
    const retry = picker.querySelector('[data-cancel-retry]');
    const submit = form.querySelector('button[type="submit"]');
    const fields = form.elements;
    const monthFormat = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' });
    const dayFormat = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' });
    const selected = new Map();
    let byDate = new Map();
    let month;
    let request;
    let message = '';

    const key = row => row.original_date + ' ' + row.original_start_time;
    const monthKey = () => month.getFullYear() + '-' + String(month.getMonth() + 1).padStart(2, '0');
    const updateSelection = function() {
        const count = selected.size;
        const cancelCount = Array.from(selected.values()).filter(row => row.action === 'cancel').length;
        const restoreCount = count - cancelCount;
        const summary = [cancelCount && cancelCount + ' to cancel', restoreCount && restoreCount + ' to restore']
            .filter(Boolean).join(' · ') || 'No changes selected.';
        form.querySelector('[data-cancel-reason]').hidden = !picker.hidden && !cancelCount;
        status.textContent = [message, summary].filter(Boolean).join(' ');
        submit.disabled = !picker.hidden && (count === 0 || !!request);
    };

    const renderDays = function() {
        grid.replaceChildren();
        const last = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
        const opened = fields.scheduled_date.value + ' ' + fields.scheduled_start_time.value;
        for (let day = 1; day <= last; day++) {
            const date = monthKey() + '-' + String(day).padStart(2, '0');
            const rows = byDate.get(date);
            const cell = document.createElement(rows ? 'label' : 'button');
            cell.className = 'calendar-cancel-day';
            cell.textContent = day;
            if (day === 1) cell.style.gridColumnStart = 1 + (month.getDay() - weekStartDay + 7) % 7;
            if (rows) {
                const isOpened = rows.some(row => key(row) === opened);
                cell.classList.toggle('is-opened', isOpened);
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.dataset.date = date;
                const kept = rows.filter(row => selected.has(key(row)) ? selected.get(key(row)).action === 'restore' : !row.canceled).length;
                checkbox.checked = kept === rows.length;
                checkbox.indeterminate = kept > 0 && kept < rows.length;
                const label = dayFormat.format(new Date(month.getFullYear(), month.getMonth(), day));
                checkbox.setAttribute('aria-label', 'Keep ' + rows.map(row => row.start).join(' and ') + ' on ' + label
                    + (isOpened ? ', lesson you opened' : ''));
                cell.appendChild(checkbox);
            } else {
                cell.type = 'button';
                cell.disabled = true;
            }
            grid.appendChild(cell);
        }
    };

    const loadMonth = async function() {
        if (request) request.abort();
        const controller = new AbortController();
        request = controller;
        const currentMonth = monthKey();
        const url = form.dataset.occurrencesUrl.replace('__plan__', fields.lesson_plan_id.value);
        picker.querySelector('[data-cancel-month]').textContent = monthFormat.format(month);
        picker.querySelector('[data-month-offset="-1"]').disabled = currentMonth <= form.dataset.today.slice(0, 7);
        byDate = new Map();
        message = 'Loading dates…';
        retry.hidden = true;
        renderDays();
        updateSelection();
        try {
            const payload = await requestJson(url + '?month=' + currentMonth, {
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                signal: controller.signal,
            }, 'Unable to load lesson dates.');
            if (request !== controller) return;
            const available = new Map();
            for (const row of payload.occurrences) {
                if (!byDate.has(row.date)) byDate.set(row.date, []);
                byDate.get(row.date).push(row);
                available.set(key(row), row);
            }
            // Drop stale selections if a lesson moved while this picker was open.
            for (const [id, row] of selected) {
                const current = available.get(id);
                if ((current || row.date.startsWith(currentMonth))
                    && (!current || current.date !== row.date || current.start !== row.start || current.canceled === (row.action === 'cancel'))) {
                    selected.delete(id);
                }
            }
            message = byDate.size ? '' : 'No upcoming lessons this month.';
            renderDays();
        } catch (error) {
            if (request !== controller) return;
            message = error.message || 'Unable to load lesson dates.';
            retry.hidden = false;
        } finally {
            if (request === controller) {
                request = null;
                updateSelection();
            }
        }
    };

    const reset = function(scope = 'current') {
        if (request) request.abort();
        request = null;
        selected.clear();
        picker.hidden = true;
        form.querySelector('[data-cancel-reason]').hidden = Boolean(fields.single_lesson_plan_id.value);
        form.classList.remove('is-multiple');
        fields.cancelation_type.value = scope;
        submit.disabled = false;
    };

    form.addEventListener('change', function(event) {
        if (event.target.name === 'cancelation_type') {
            if (event.target.value !== 'multiple') {
                reset(event.target.value);
                return;
            }
            const firstDate = fields.date.value > form.dataset.today ? fields.date.value : form.dataset.today;
            const firstMonth = firstDate.slice(0, 7);
            month = new Date(firstMonth + '-01T12:00:00');
            picker.hidden = false;
            form.classList.add('is-multiple');
            loadMonth();
        } else if (event.target.matches('[data-date]') && picker.contains(event.target)) {
            for (const row of byDate.get(event.target.dataset.date)) {
                const cancel = !event.target.checked;
                if (cancel === row.canceled) selected.delete(key(row));
                else selected.set(key(row), { ...row, action: cancel ? 'cancel' : 'restore' });
            }
            updateSelection();
        }
    });

    picker.addEventListener('click', function(event) {
        const nav = event.target.closest('[data-month-offset]');
        if (nav) {
            month.setMonth(month.getMonth() + Number(nav.dataset.monthOffset));
            loadMonth();
        } else if (event.target === retry) {
            loadMonth();
        }
    });

    return { reset, selection: () => Array.from(selected.values()) };
}
