// registration.js — Form validation and submission

function initRegistration() {
    const form      = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');

    // Clear error on input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.form-group')?.classList.remove('error');
        });
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        let valid = true;

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                valid = false;
                input.closest('.form-group')?.classList.add('error');
            }
        });

        // Email format check
        const email = form.querySelector('#email');
        if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            valid = false;
            email.closest('.form-group')?.classList.add('error');
        }

        if (!valid) return;

        // Simulate async submission
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            form.reset();
            showSuccessToast();
        }, 1500);
    });
}

function showSuccessToast() {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas fa-check-circle"></i></div>
            <div class="toast-content">
                <h4>Registration Successful!</h4>
                <p>Your team is officially in. Check your email for confirmation.</p>
            </div>
            <button class="toast-close" aria-label="Close"><i class="fas fa-times"></i></button>
        `;
        document.body.appendChild(toast);
        toast.querySelector('.toast-close').addEventListener('click', () => toast.classList.remove('show'));
    }

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => toast.classList.remove('show'), 5500);
}
