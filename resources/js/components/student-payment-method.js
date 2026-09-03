const syncStudentPaymentMethod = function(field) {
    const choice = field.querySelector('select[name="student_payment_method"]');
    const method = field.querySelector('input[name="payment_method"]');
    const exempt = field.querySelector('input[name="payment_exempt"]');
    const isExempt = choice.value === 'payment_exempt';

    exempt.value = isExempt ? '1' : '0';
    // Keep the saved method while exempt, just as the former checkbox did.
    if (!isExempt) {
        method.value = choice.value;
    }
};

// Delegation also handles student edit forms loaded into a modal later.
document.addEventListener('change', function(event) {
    if (event.target.matches('select[name="student_payment_method"]')) {
        const field = event.target.closest('[data-student-payment-method]');
        if (field) {
            syncStudentPaymentMethod(field);
        }
    }
});

document.addEventListener('submit', function(event) {
    event.target.querySelectorAll('[data-student-payment-method]').forEach(syncStudentPaymentMethod);
}, true);
