const syncLessonPaymentSection = function(form) {
    const section = form ? form.querySelector('[data-lesson-payment-section]') : null;
    if (!section) {
        return;
    }

    const student = form.querySelector('[data-student-combobox-value]');
    const option = Array.from(form.querySelectorAll('[data-student-combobox-option]')).find(function(option) {
        return student && option.dataset.studentId === student.value;
    });

    section.hidden = Boolean(option && option.dataset.studentPaymentExempt === '1');
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-lesson-plan-form]').forEach(syncLessonPaymentSection);
});

// Run after either page's student picker has updated its selected student.
document.addEventListener('click', function(event) {
    const option = event.target.closest('[data-student-combobox-option]');
    if (option) {
        syncLessonPaymentSection(option.closest('form'));
    }
});

['input', 'change'].forEach(function(type) {
    document.addEventListener(type, function(event) {
        if (event.target.matches('[data-student-combobox-input], [data-student-combobox-value]')) {
            syncLessonPaymentSection(event.target.closest('form'));
        }
    });
});

document.addEventListener('submit', function(event) {
    syncLessonPaymentSection(event.target);
});

// Duplicating a lesson preselects its student before opening the modal.
document.addEventListener('show.bs.modal', function(event) {
    if (event.target.id === 'create-calendar-lesson-plan-modal') {
        syncLessonPaymentSection(event.target.querySelector('form'));
    }
});

document.addEventListener('reset', function(event) {
    window.setTimeout(function() {
        syncLessonPaymentSection(event.target);
    }, 0);
});
