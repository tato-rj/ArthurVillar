<form id="lesson-recital-picker" data-url="{{ route('calendar.students.upcoming-recitals', ['student' => '__student__']) }}" hidden>
    <fieldset class="mb-3" data-lesson-recital-fields>
        <legend class="float-none fs-6 fw-bold mb-3" tabindex="-1">Upcoming recitals</legend>
        <p class="small mb-0" role="status" data-lesson-recital-status hidden></p>
        <div data-lesson-recital-options></div>
        <template data-lesson-recital-option>
            <label class="form-check d-block mb-2">
                <input class="form-check-input" type="checkbox" name="recital_ids[]">
                <span class="form-check-label">
                    <span data-recital-name></span>
                    <span class="d-block small" data-recital-details></span>
                </span>
            </label>
        </template>
    </fieldset>
    <p class="alert alert-danger small mb-3" role="alert" data-lesson-recital-error hidden></p>
    <div class="d-flex gap-2">
        <button type="button" class="btn btn-outline-secondary w-100" data-lesson-recital-cancel>Cancel</button>
        <button type="submit" class="btn btn-primary w-100" disabled>Save</button>
    </div>
</form>
