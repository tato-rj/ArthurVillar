@extends('layouts.app', ['title' => $invitation ? 'Edit Invitation' : 'New Invitation'])

@push('header')
<link href="/css/vendor/calendarjs.css" rel="stylesheet">
<link href="{{ mix('css/calendar.css') }}" rel="stylesheet">
@endpush

@section('content')
<section class="container py-5">
    @if($invitation)
        {{ Breadcrumbs::render('calendar.invitations.edit', $invitation) }}
    @else
        {{ Breadcrumbs::render('calendar.invitations.create') }}
    @endif

    <div class="row mb-4">
        @pagetitle([
            'label' => $invitation ? 'Edit Invitation' : 'New Invitation'
        ])
    </div>

    @php
        $optionValues = old('options', $invitation
            ? $invitation->options->map(fn ($option) => $option->starts_at->format('Y-m-d\TH:i'))->all()
            : []);
        $selectedDuration = (int) old('duration_minutes', $invitation?->duration_minutes ?? 60);
    @endphp

    <form id="invitation-form" method="POST" action="{{ $invitation ? route('calendar.invitations.update', $invitation) : route('calendar.invitations.store') }}">
        @csrf
        @if($invitation)
            @method('PATCH')
        @endif

        <div class="row mb-4">
            <div class="col-lg-8 col-md-10 col-12 mx-auto">
                @input([
                    'label' => 'Title',
                    'name' => 'title',
                    'required' => true,
                    'value' => $invitation?->title,
                    'placeholder' => 'What are you scheduling?',
                ])

                @textarea([
                    'label' => 'Description',
                    'name' => 'description',
                    'value' => old('description', $invitation?->description),
                    'rows' => 4,
                    'placeholder' => 'Add any details your guests should know.',
                ])
            </div>
        </div>

        <div class="row mb-5">
            <div class="col-lg-8 col-md-10 col-12 mx-auto">
                @label(['label' => 'Duration'])
                <input id="invitation-duration" type="hidden" name="duration_minutes" value="{{ $selectedDuration }}">

            <div class="invitation-duration-options" role="group" aria-label="Meeting duration">
                @foreach([15, 30, 60, 90, 120] as $duration)
                    <button
                        type="button"
                        class="invitation-duration-option {{ $selectedDuration === $duration ? 'active' : '' }}"
                        data-duration="{{ $duration }}"
                        aria-pressed="{{ $selectedDuration === $duration ? 'true' : 'false' }}">
                        {{ $duration }} min
                    </button>
                @endforeach

                <button
                    type="button"
                    id="show-custom-duration"
                    class="invitation-duration-option {{ !in_array($selectedDuration, [15, 30, 60, 90, 120]) ? 'active' : '' }}"
                    aria-pressed="{{ !in_array($selectedDuration, [15, 30, 60, 90, 120]) ? 'true' : 'false' }}">
                    @fa(['icon' => 'plus'])Custom
                </button>
            </div>

            <div id="custom-duration-container" class="invitation-custom-duration mt-3" style="display: {{ !in_array($selectedDuration, [15, 30, 60, 90, 120]) ? 'flex' : 'none' }};">
                <input
                    id="custom-duration"
                    class="form-control"
                    type="number"
                    min="5"
                    max="720"
                    step="5"
                    value="{{ $selectedDuration }}"
                    aria-label="Custom duration in minutes">
                <span>minutes</span>
            </div>

            @error('duration_minutes')
                <div class="text-red mt-2">@fa(['icon' => 'exclamation-circle', 'mr' => 1]){{ $message }}</div>
            @enderror
            </div>
        </div>

        <div class="row mb-5">
            <div class="col-lg-8 col-md-10 col-12 mx-auto">
                <div class="invitation-calendar-toolbar mb-2">
                <button type="button" id="invitation-calendar-previous" class="invitation-calendar-nav btn btn-white" aria-label="Previous week">
                    @fa(['icon' => 'arrow-left', 'mr' => 0])
                    <span id="invitation-previous-count" class="invitation-overflow-count" style="display: none;" aria-hidden="true"></span>
                </button>
                <button type="button" id="invitation-calendar-next" class="invitation-calendar-nav btn btn-white" aria-label="Next week">
                    @fa(['icon' => 'arrow-right', 'mr' => 0])
                    <span id="invitation-next-count" class="invitation-overflow-count" style="display: none;" aria-hidden="true"></span>
                </button>
                <button type="button" id="invitation-calendar-today" class="btn btn-outline-secondary">Today</button>
                <h3 id="invitation-calendar-label" class="invitation-calendar-label"></h3>
                </div>

                <p class="invitation-calendar-help mb-2">
                    Click an empty time to add it. Drag a green block to move it, or use its × button to delete it.
                </p>

                <div class="invitation-calendar-shell">
                    <div id="invitation-calendar"></div>
                    <div id="invitation-calendar-overlays" class="invitation-calendar-overlays"></div>
                </div>

                <div id="invitation-options-inputs"></div>

                <div id="invitation-calendar-error" class="invitation-calendar-error text-red mt-2">
                    @fa(['icon' => 'exclamation-circle', 'mr' => 1])Add at least one proposed time.
                </div>

                @error('options')
                    <div class="text-red mt-2">@fa(['icon' => 'exclamation-circle', 'mr' => 1]){{ $message }}</div>
                @enderror
                @error('options.*')
                    <div class="text-red mt-2">@fa(['icon' => 'exclamation-circle', 'mr' => 1]){{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="text-center">
            @submit(['label' => $invitation ? 'Update invitation' : 'Create invitation', 'theme' => 'primary'])
        </div>
    </form>
</section>
@endsection

@push('scripts')
<script src="/js/vendor/lemonadejs/lemonade.js"></script>
<script src="/js/vendor/calendarjs/index.js"></script>
<script>
$(function() {
    const calendarElement = document.getElementById('invitation-calendar');
    const form = document.getElementById('invitation-form');
    const durationInput = document.getElementById('invitation-duration');
    const customDuration = document.getElementById('custom-duration');
    const customDurationContainer = document.getElementById('custom-duration-container');
    const customDurationButton = document.getElementById('show-custom-duration');
    const hiddenOptions = document.getElementById('invitation-options-inputs');
    const calendarError = document.getElementById('invitation-calendar-error');
    const calendarOverlays = document.getElementById('invitation-calendar-overlays');
    const previousCount = document.getElementById('invitation-previous-count');
    const nextCount = document.getElementById('invitation-next-count');
    const initialStarts = @json(array_values($optionValues));
    const fixedDurations = [15, 30, 60, 90, 120];
    const scheduleStart = '08:00';
    const scheduleEnd = '22:00';
    let duration = Number(durationInput.value || 60);
    let normalizingEvents = false;

    const pad = function(value) {
        return String(value).padStart(2, '0');
    };

    const toDateString = function(date) {
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    };

    const parseLocalDateTime = function(value) {
        const match = String(value || '').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);

        if (!match) {
            return null;
        }

        return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), Number(match[4]), Number(match[5]));
    };

    const timeToMinutes = function(value) {
        const parts = String(value || '00:00').split(':').map(Number);

        return (parts[0] * 60) + parts[1];
    };

    const scheduleStartMinutes = timeToMinutes(scheduleStart);
    const scheduleEndMinutes = timeToMinutes(scheduleEnd);

    const minutesToTime = function(value) {
        const safeValue = Math.max(0, Math.min(1440, Number(value)));

        return `${pad(Math.floor(safeValue / 60))}:${pad(safeValue % 60)}`;
    };

    const addDays = function(date, days) {
        const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        next.setDate(next.getDate() + days);

        return next;
    };

    const startOfWeek = function(date) {
        return addDays(date, -date.getDay());
    };

    const formatEventValue = function(event) {
        return `${String(event.date).substring(0, 10)}T${String(event.start).substring(0, 5)}`;
    };

    const eventData = initialStarts.map(function(value, index) {
        const startsAt = parseLocalDateTime(value);

        if (!startsAt) {
            return null;
        }

        const startMinutes = (startsAt.getHours() * 60) + startsAt.getMinutes();
        const safeStart = Math.min(startMinutes, 1440 - duration);

        return {
            guid: `invitation-option-${index}-${Date.now()}`,
            title: '',
            date: toDateString(startsAt),
            start: minutesToTime(safeStart),
            end: minutesToTime(safeStart + duration),
            color: '#07883a',
        };
    }).filter(Boolean);

    const firstStart = initialStarts.map(parseLocalDateTime).find(Boolean);
    let currentDate = firstStart || new Date();
    let calendar = null;

    const updateWeekLabel = function() {
        const start = startOfWeek(currentDate);
        const end = addDays(start, 6);
        const startLabel = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'}).format(start);
        const endLabel = start.getMonth() === end.getMonth()
            ? `${end.getDate()}, ${end.getFullYear()}`
            : new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }).format(end);

        document.getElementById('invitation-calendar-label').textContent = `${startLabel} – ${endLabel}`;
    };

    const syncHiddenOptions = function() {
        const events = calendar && typeof calendar.getData === 'function' ? calendar.getData() : [];

        events.sort(function(first, second) {
            return formatEventValue(first).localeCompare(formatEventValue(second));
        });

        hiddenOptions.innerHTML = '';
        events.forEach(function(event) {
            const input = document.createElement('input');

            input.type = 'hidden';
            input.name = 'options[]';
            input.value = formatEventValue(event);
            hiddenOptions.appendChild(input);
        });

        if (events.length) {
            calendarError.classList.remove('is-visible');
        }
    };

    const patchEventDeleteButtons = function() {
        calendarElement.querySelectorAll('.lm-schedule-item').forEach(function(item) {
            const visualDuration = Math.max(15, timeToMinutes(item.dataset.end) - timeToMinutes(item.dataset.start));

            item.style.height = `${visualDuration}px`;
            item.dataset.height = String(Math.max(1, Math.round(visualDuration / 15)));

            if (item.querySelector('.invitation-option-delete')) {
                return;
            }

            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'invitation-option-delete';
            button.setAttribute('aria-label', 'Delete proposed time');
            button.innerHTML = '&times;';
            button.addEventListener('mousedown', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();

                if (calendar && item.event) {
                    calendar.deleteEvents(item.event);
                    syncHiddenOptions();
                }
            });
            item.appendChild(button);
        });
    };

    const patchCalendarHeaders = function() {
        const weekStart = startOfWeek(currentDate);
        const today = toDateString(new Date());

        calendarElement.querySelectorAll('.lm-schedule thead td[data-weekday]').forEach(function(header, index) {
            const headerDate = addDays(weekStart, index);

            header.textContent = String(headerDate.getDate());
            header.setAttribute('data-selected', toDateString(headerDate) === today ? 'true' : 'false');
        });
    };

    const patchPastSlots = function() {
        const now = new Date();
        const today = toDateString(now);
        const currentMinutes = (now.getHours() * 60) + now.getMinutes();

        calendarElement.querySelectorAll('.lm-schedule tbody td[data-date][data-y]').forEach(function(cell) {
            const slotMinutes = Number(cell.dataset.y) * 15;
            const isPast = cell.dataset.date < today
                || (cell.dataset.date === today && slotMinutes < currentMinutes);

            cell.classList.toggle('invitation-past-slot', isPast);
            cell.setAttribute('aria-disabled', isPast ? 'true' : 'false');
        });
    };

    const patchCurrentTimePointer = function() {
        const pointer = calendarElement.querySelector('.lm-schedule-pointer');

        if (!pointer) {
            return;
        }

        const now = new Date();
        const today = toDateString(now);
        const currentMinutes = (now.getHours() * 60) + now.getMinutes();
        const row = Math.floor(currentMinutes / 15);
        const cell = calendarElement.querySelector(`.lm-schedule tbody td[data-date="${today}"][data-y="${row}"]`);

        if (!cell) {
            pointer.style.display = 'none';
            return;
        }

        const fraction = (currentMinutes % 15) / 15;

        pointer.style.top = `${cell.offsetTop + (cell.offsetHeight * fraction)}px`;
        pointer.style.left = `${cell.offsetLeft}px`;
        pointer.style.width = `${cell.offsetWidth}px`;
        pointer.style.display = 'block';
    };

    const setOverflowCount = function(element, count) {
        element.textContent = count ? `+${count}` : '';
        element.style.display = count ? 'block' : 'none';
    };

    const updateWeekOverflowIndicators = function() {
        if (!calendar) {
            return;
        }

        const weekStart = toDateString(startOfWeek(currentDate));
        const weekEnd = toDateString(addDays(startOfWeek(currentDate), 6));
        const events = calendar.getData();

        setOverflowCount(previousCount, events.filter(function(event) {
            return String(event.date).substring(0, 10) < weekStart;
        }).length);
        setOverflowCount(nextCount, events.filter(function(event) {
            return String(event.date).substring(0, 10) > weekEnd;
        }).length);
    };

    const createVerticalOverflowIndicator = function(date, direction, events, left, edge) {
        const button = document.createElement('button');
        const count = document.createElement('span');

        button.type = 'button';
        button.className = `invitation-offscreen-indicator invitation-offscreen-indicator-${direction}`;
        button.style.left = `${left}px`;
        button.style[direction === 'up' ? 'top' : 'bottom'] = `${edge}px`;
        button.setAttribute('aria-label', `${events.length} selected ${events.length === 1 ? 'time' : 'times'} ${direction === 'up' ? 'above' : 'below'} ${date}`);
        button.innerHTML = direction === 'up'
            ? '<i class="fas fa-arrow-up"></i>'
            : '<i class="fas fa-arrow-down"></i>';

        count.className = 'invitation-overflow-count';
        count.textContent = `+${events.length}`;
        count.setAttribute('aria-hidden', 'true');
        button.appendChild(count);
        button.addEventListener('click', function() {
            const target = direction === 'up'
                ? events.reduce(function(latest, event) {
                    return timeToMinutes(event.start) > timeToMinutes(latest.start) ? event : latest;
                })
                : events.reduce(function(earliest, event) {
                    return timeToMinutes(event.start) < timeToMinutes(earliest.start) ? event : earliest;
                });
            const schedule = calendarElement.querySelector('.lm-schedule');

            if (schedule) {
                schedule.scrollTo({
                    top: Math.max(0, timeToMinutes(target.start) - scheduleStartMinutes - 60),
                    behavior: 'smooth',
                });
            }
        });
        calendarOverlays.appendChild(button);
    };

    const updateVerticalOverflowIndicators = function() {
        calendarOverlays.innerHTML = '';

        if (!calendar) {
            return;
        }

        const schedule = calendarElement.querySelector('.lm-schedule');
        const header = calendarElement.querySelector('.lm-schedule thead td[data-weekday]');
        const shell = calendarElement.closest('.invitation-calendar-shell');

        if (!schedule || !header || !shell) {
            return;
        }

        const scheduleRect = schedule.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const shellRect = shell.getBoundingClientRect();
        const weekStart = startOfWeek(currentDate);

        for (let index = 0; index < 7; index += 1) {
            const date = toDateString(addDays(weekStart, index));
            const cell = calendarElement.querySelector(
                `.lm-schedule tbody td[data-date="${date}"][data-y="${scheduleStartMinutes / 15}"]`
            );

            if (!cell) {
                continue;
            }

            const cellRect = cell.getBoundingClientRect();
            const left = (cellRect.left - shellRect.left) + (cellRect.width / 2);
            const dayItems = Array.from(calendarElement.querySelectorAll(`.lm-schedule tbody td[data-date="${date}"] .lm-schedule-item`));
            const above = [];
            const below = [];

            dayItems.forEach(function(item) {
                const rect = item.getBoundingClientRect();

                if (rect.bottom <= headerRect.bottom) {
                    above.push(item.event);
                } else if (rect.top >= scheduleRect.bottom) {
                    below.push(item.event);
                }
            });

            if (above.length) {
                createVerticalOverflowIndicator(date, 'up', above, left, (headerRect.bottom - shellRect.top) + 8);
            }

            if (below.length) {
                createVerticalOverflowIndicator(date, 'down', below, left, 12);
            }
        }
    };

    const updateOverflowIndicators = function() {
        updateWeekOverflowIndicators();
        updateVerticalOverflowIndicators();
    };

    const patchCalendar = function() {
        requestAnimationFrame(function() {
            patchCalendarHeaders();
            patchPastSlots();
            patchCurrentTimePointer();
            patchEventDeleteButtons();
            updateWeekLabel();
            updateOverflowIndicators();
        });
    };

    const normalizeEventDuration = function(event) {
        const latestStart = scheduleEndMinutes - duration;
        const start = Math.min(
            Math.max(timeToMinutes(event.start), scheduleStartMinutes),
            latestStart
        );
        const end = start + duration;

        if (event.start === minutesToTime(start) && event.end === minutesToTime(end)) {
            return;
        }

        calendar.updateEvent(event, {
            start: minutesToTime(start),
            end: minutesToTime(end),
        });
    };

    const normalizeAllEventDurations = function() {
        if (!calendar || normalizingEvents) {
            return;
        }

        normalizingEvents = true;
        calendar.getData().forEach(normalizeEventDuration);
        normalizingEvents = false;
        syncHiddenOptions();
        patchCalendar();
    };

    calendar = window.calendarjs.Schedule(calendarElement, {
        type: 'week',
        value: toDateString(addDays(currentDate, 1)),
        data: eventData,
        grid: 15,
        snap: duration,
        overlap: true,
        validRange: [scheduleStart, scheduleEnd],
        onbeforeinsert: function() {
            return false;
        },
        onbeforechangeevent: function(instance, detail) {
            if (detail && String(detail.action || '').includes('resize')) {
                return false;
            }
        },
        oncreate: function(instance, events) {
            if (events && events[0]) {
                normalizeEventDuration(events[0]);
            }

            syncHiddenOptions();
            patchCalendar();
        },
        onchangeevent: function(instance, option, oldValue) {
            const now = new Date();
            const optionDate = String(option.date).substring(0, 10);
            const optionIsPast = optionDate < toDateString(now)
                || (optionDate === toDateString(now) && timeToMinutes(option.start) < ((now.getHours() * 60) + now.getMinutes()));

            if (optionIsPast && oldValue) {
                normalizingEvents = true;
                instance.updateEvent(option, oldValue);
                normalizingEvents = false;
                syncHiddenOptions();
                patchCalendar();
                return;
            }

            if (!normalizingEvents) {
                normalizeAllEventDurations();
            }

            syncHiddenOptions();
            patchCalendar();
        },
        ondelete: function() {
            syncHiddenOptions();
            patchCalendar();
        },
    });

    calendarElement.addEventListener('click', function(event) {
        if (event.target.closest('.lm-schedule-item')) {
            return;
        }

        const cell = event.target.closest('tbody td[data-date][data-y]');

        if (!cell) {
            return;
        }

        if (cell.classList.contains('invitation-past-slot')) {
            return;
        }

        const start = Math.min(
            Math.max(Number(cell.dataset.y) * 15, scheduleStartMinutes),
            scheduleEndMinutes - duration
        );
        const end = start + duration;

        calendar.addEvents({
            guid: `invitation-option-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            title: '',
            date: cell.dataset.date,
            start: minutesToTime(start),
            end: minutesToTime(end),
            color: '#07883a',
        });
        syncHiddenOptions();
        patchCalendar();
    });

    const observer = new MutationObserver(patchEventDeleteButtons);
    observer.observe(calendarElement, {childList: true, subtree: true});

    const schedule = calendarElement.querySelector('.lm-schedule');

    if (schedule) {
        schedule.addEventListener('scroll', updateVerticalOverflowIndicators, {passive: true});
    }

    window.setInterval(function() {
        patchPastSlots();
        patchCurrentTimePointer();
    }, 60000);

    const scrollCalendar = function() {
        requestAnimationFrame(function() {
            const schedule = calendarElement.querySelector('.lm-schedule');

            if (schedule) {
                schedule.scrollTop = 0;
                requestAnimationFrame(updateVerticalOverflowIndicators);
            }
        });
    };

    const showWeek = function(date, shouldScroll) {
        currentDate = date;
        calendar.value = toDateString(addDays(currentDate, 1));
        calendar.data = calendar.getData().slice();
        updateWeekLabel();
        patchCalendar();

        if (shouldScroll) {
            scrollCalendar();
        }
    };

    const setDuration = function(value) {
        const nextDuration = Number(value);

        if (!Number.isInteger(nextDuration) || nextDuration < 5 || nextDuration > 720) {
            return false;
        }

        duration = nextDuration;
        durationInput.value = String(duration);
        calendar.snap = duration;

        document.querySelectorAll('[data-duration]').forEach(function(button) {
            const isActive = Number(button.dataset.duration) === duration;

            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        const isCustom = !fixedDurations.includes(duration);
        customDurationButton.classList.toggle('active', isCustom);
        customDurationButton.setAttribute('aria-pressed', isCustom ? 'true' : 'false');
        normalizeAllEventDurations();

        return true;
    };

    document.querySelectorAll('[data-duration]').forEach(function(button) {
        button.addEventListener('click', function() {
            customDurationContainer.style.display = 'none';
            setDuration(Number(button.dataset.duration));
        });
    });

    customDurationButton.addEventListener('click', function() {
        customDurationContainer.style.display = 'flex';
        customDuration.focus();
        customDuration.select();
    });

    customDuration.addEventListener('change', function() {
        if (!setDuration(Number(this.value))) {
            this.value = String(duration);
        }
    });

    document.getElementById('invitation-calendar-previous').addEventListener('click', function() {
        showWeek(addDays(currentDate, -7), false);
    });

    document.getElementById('invitation-calendar-next').addEventListener('click', function() {
        showWeek(addDays(currentDate, 7), false);
    });

    document.getElementById('invitation-calendar-today').addEventListener('click', function() {
        showWeek(new Date(), true);
    });

    form.addEventListener('submit', function(event) {
        syncHiddenOptions();

        if (!hiddenOptions.children.length) {
            event.preventDefault();
            calendarError.classList.add('is-visible');
            calendarElement.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    });

    syncHiddenOptions();
    patchCalendar();
    scrollCalendar();
});
</script>
@endpush
