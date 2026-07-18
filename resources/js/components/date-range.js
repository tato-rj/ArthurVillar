const dateRangeSelector = '[data-date-range]';

const createDate = function(year, month, day) {
   return new Date(year, month, day, 12, 0, 0, 0);
};

const cloneDate = function(date) {
   return createDate(date.getFullYear(), date.getMonth(), date.getDate());
};

const dateKey = function(date) {
   return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
   ].join('-');
};

const parseDate = function(value, endOfMonth) {
   const match = String(value || '').match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);

   if (! match)
      return null;

   const year = Number(match[1]);
   const month = Number(match[2]) - 1;
   const day = match[3] ? Number(match[3]) : (endOfMonth ? createDate(year, month + 1, 0).getDate() : 1);
   const date = createDate(year, month, day);

   return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
      ? date
      : null;
};

const outputValue = function(date, output) {
   if (! date)
      return '';

   return output === 'month' ? dateKey(date).substring(0, 7) : dateKey(date);
};

const rangeLabelFormatter = new Intl.DateTimeFormat('en-US', {
   month: 'short',
   day: 'numeric',
   year: 'numeric'
});

const monthLabelFormatter = new Intl.DateTimeFormat('en-US', {
   month: 'long',
   year: 'numeric'
});

const initializeDateRange = function(element) {
   if (! element || element.dataset.dateRangeInitialized === 'true')
      return;

   element.dataset.dateRangeInitialized = 'true';

   const fromInput = element.querySelector('[data-date-range-from]');
   const toInput = element.querySelector('[data-date-range-to]');
   const toggle = element.querySelector('[data-date-range-toggle]');
   const popover = element.querySelector('[data-date-range-popover]');
   const grid = element.querySelector('[data-date-range-grid]');
   const monthLabel = element.querySelector('[data-date-range-month]');
   const label = element.querySelector('[data-date-range-label]');
   const instruction = element.querySelector('[data-date-range-instruction]');
   const output = element.dataset.output || 'date';
   const placeholder = label ? label.textContent : 'Select date range';
   let start = parseDate(fromInput ? fromInput.value : '', false);
   let end = parseDate(toInput ? toInput.value : '', true);
   let selectingEnd = Boolean(start && ! end);
   let visibleMonth = cloneDate(start || new Date());

   visibleMonth.setDate(1);

   const updateLabel = function() {
      if (! label)
         return;

      if (start && end) {
         label.textContent = `${rangeLabelFormatter.format(start)} – ${rangeLabelFormatter.format(end)}`;
      } else if (start) {
         label.textContent = `${rangeLabelFormatter.format(start)} – Select end`;
      } else {
         label.textContent = placeholder;
      }

      if (instruction)
         instruction.textContent = selectingEnd ? 'Select the last date' : 'Select the first date';
   };

   const syncInputs = function(notify) {
      if (fromInput)
         fromInput.value = outputValue(start, output);

      if (toInput)
         toInput.value = outputValue(end, output);

      updateLabel();

      if (notify) {
         element.dispatchEvent(new CustomEvent('date-range:change', {
            bubbles: true,
            detail: {
               from: fromInput ? fromInput.value : '',
               to: toInput ? toInput.value : ''
            }
         }));
      }
   };

   const render = function() {
      if (! grid)
         return;

      const first = createDate(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1);
      const gridStart = createDate(first.getFullYear(), first.getMonth(), 1 - first.getDay());
      const today = dateKey(new Date());

      if (monthLabel)
         monthLabel.textContent = monthLabelFormatter.format(first);

      grid.innerHTML = '';

      for (let index = 0; index < 42; index++) {
         const date = createDate(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index);
         const key = dateKey(date);
         const button = document.createElement('button');

         button.type = 'button';
         button.className = 'calendar-date-range-day';
         button.textContent = date.getDate();
         button.dataset.date = key;
         button.classList.toggle('is-outside', date.getMonth() !== first.getMonth());
         button.classList.toggle('is-today', key === today);
         button.classList.toggle('is-start', Boolean(start && key === dateKey(start)));
         button.classList.toggle('is-end', Boolean(end && key === dateKey(end)));
         button.classList.toggle('is-in-range', Boolean(start && end && date > start && date < end));
         button.setAttribute('aria-label', rangeLabelFormatter.format(date));
         button.setAttribute('aria-pressed', start && end && date >= start && date <= end ? 'true' : 'false');
         grid.appendChild(button);
      }

      updateLabel();
   };

   const close = function() {
      if (! popover || popover.hidden)
         return;

      popover.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
   };

   toggle.addEventListener('click', function() {
      const shouldOpen = popover.hidden;

      document.querySelectorAll(`${dateRangeSelector} [data-date-range-popover]`).forEach(function(other) {
         if (other !== popover)
            other.hidden = true;
      });

      popover.hidden = ! shouldOpen;
      toggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');

      if (shouldOpen) {
         start = parseDate(fromInput ? fromInput.value : '', false);
         end = parseDate(toInput ? toInput.value : '', true);
         selectingEnd = Boolean(start && ! end);
         visibleMonth = cloneDate(start || new Date());
         visibleMonth.setDate(1);
         render();
      }
   });

   element.querySelector('[data-date-range-previous]').addEventListener('click', function() {
      visibleMonth = createDate(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
      render();
   });

   element.querySelector('[data-date-range-next]').addEventListener('click', function() {
      visibleMonth = createDate(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
      render();
   });

   grid.addEventListener('click', function(event) {
      const day = event.target.closest('[data-date]');

      if (! day)
         return;

      const selected = parseDate(day.dataset.date, false);

      if (! selectingEnd) {
         start = selected;
         end = null;
         selectingEnd = true;
         visibleMonth = createDate(selected.getFullYear(), selected.getMonth(), 1);
         syncInputs(false);
      } else {
         end = selected;

         if (end < start) {
            const originalStart = start;
            start = end;
            end = originalStart;
         }

         selectingEnd = false;
         syncInputs(true);
      }

      render();
   });

   element.querySelector('[data-date-range-clear]').addEventListener('click', function() {
      start = null;
      end = null;
      selectingEnd = false;
      syncInputs(true);
      render();
   });

   document.addEventListener('click', function(event) {
      const clickPath = typeof event.composedPath === 'function' ? event.composedPath() : [];

      // Rendering the selected range replaces the clicked day button before
      // this document-level handler runs. The event path still identifies the
      // click as originating inside this picker, so it must remain open.
      if (! element.contains(event.target) && ! clickPath.includes(element))
         close();
   });

   document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape')
         close();
   });

   updateLabel();
};

document.addEventListener('DOMContentLoaded', function() {
   document.querySelectorAll(dateRangeSelector).forEach(initializeDateRange);
});

window.calendarDateRanges = {
   initialize: initializeDateRange
};
