// faq.js — FAQ accordion

function initFAQ() {
    const items = document.querySelectorAll('.faq-accordion');
    items.forEach(item => {
        const btn = item.querySelector('.faq-q');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all, then toggle current
            items.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
}
