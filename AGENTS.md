# Project guidance

This file applies to the entire repository. Add a more specific `AGENTS.md` inside a subdirectory only when that area needs different instructions.

## Working in this repository

- This is a Laravel 9 application with frontend assets built by Laravel Mix.
- Treat `resources/` as the source of truth. Files under `public/js` and `public/css` are generated assets, but they are committed and must be rebuilt when their sources change.
- Preserve unrelated work in the working tree. Before editing, run `git status --short` and inspect overlapping diffs. Do not clean up or rewrite files outside the requested scope.
- Keep controller responses and their browser consumers in sync. JSON mutation endpoints should return every value the browser needs to update the affected view without fetching the whole page again.
- Prefer focused tests while iterating, then run the relevant broader suite. Do not introduce tests that merely duplicate implementation details.

## Calendar architecture

The calendar page is primarily implemented in these files:

- `resources/js/calendar/index.js`: browser state, rendering, modal actions, and in-place updates.
- `app/Calendar/Scheduler.php`: calendar payload and occurrence construction.
- `app/Http/Controllers/Calendar/`: mutation endpoints.
- `resources/views/calendar/`: calendar and modal markup.
- `resources/sass/calendar.scss`: calendar styling.
- `tests/Feature/CalendarLessonFlowTest.php` and `tests/Feature/CalendarTest.php`: backend calendar behavior.
- `tests/JavaScript/calendar-lesson-mutations.test.cjs`: browser-state mutation regression coverage.

### Lesson mutation contract

Lesson actions initiated from the calendar must stay in the browser and update only the lesson occurrence involved. This includes confirming attendance, confirming payment, recording an early payment, canceling one occurrence, and reverting those actions.

- Send mutation requests with `fetch`, `Accept: application/json`, `X-Requested-With: XMLHttpRequest`, and the CSRF token.
- On success, update the canonical event in `state.events`, the matching occurrence in `state.plannedLessons` or `state.singleLessonPlans`, CalendarJS event copies, the rendered event elements, the open lesson modal, and payment totals.
- Preserve the existing calendar DOM, view, scroll position, and modal when an action only changes lesson status.
- Disable the lesson controls while a mutation is pending and reject duplicate submissions for the same event GUID.
- Associate asynchronous responses with the event GUID captured when the request began. A slow response must not overwrite a different lesson modal opened in the meantime.
- Respect active event-type filters after status changes. A canceled lesson may become hidden without removing its canonical state, so reverting it can restore the same event in place.
- Recompute conflict and travel-route presentation when cancellation status changes because neighboring events can also be affected.
- Keep the broader calendar refresh for mutations that change schedule geometry or a series, such as rescheduling, removing a schedule override, or changing future/all occurrences.

The mutation response should include the values needed by the client when applicable: `status`, `lesson_id`, `edit_url`, `payment_url`, `early_payment_id`, `schedule_override_deleted`, `lesson_deleted`, `canceled_by`, `fee_amount`, and `payment_exempt`.

### Calendar performance

- Range requests include 14 days on either side of the visible dates, except the already broad schedule view. Render only visible dates, and use containment when checking whether a range is loaded.
- Browser range caching is limited to six responses for 60 seconds. Invalidate it after mutations; reject and refetch responses that started before the latest mutation. Never mark a failed request as a loaded range.
- Share duplicate range requests and abort superseded navigation requests. Keep cancellation separate from lesson-saving requests.
- Travel requests run at most two at a time and pause while lesson mutations or range fetches are pending. Discard queued work for dates no longer visible. Travel cache keys must remain stable during ordinary date navigation, with separate invalidation for schedule changes and cancellations.
- Batch projected lesson counts through `LessonPlan::projectedLessonCounts()`. Travel-origin and teaching-break calculations skip summaries they do not consume. Avoid serializing unused lesson history or computed plan status into calendar payloads.
- `tests/Feature/CalendarPerformanceTest.php` guards against per-plan query growth and compares batched counts with the individual calculation. `tests/JavaScript/calendar-performance.test.cjs` covers navigation caching, stale responses, request priority, and overlap detection.

## Verification

Use these focused checks for lesson-calendar changes:

```bash
php artisan test --filter 'CalendarPerformanceTest|CalendarLessonFlowTest|CalendarTest|LessonTest|LessonPlanTest'
/opt/homebrew/bin/node --test tests/JavaScript/calendar-*.test.cjs
```

Build frontend assets with:

```bash
npm run development
```

The complete Mix build compiles every entry in `webpack.mix.js` and can update generated assets unrelated to the current task. Inspect `git status` and the generated diff afterward, preserve pre-existing changes, and ensure `public/mix-manifest.json` contains the hash of the rebuilt calendar bundle.

Before handing off, also run `git diff --check` on the files changed for the task.
