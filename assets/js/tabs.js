// tabs.js — Tab switching system

function initTabs() {
    const tabSystems = document.querySelectorAll('[data-tab-system]');

    tabSystems.forEach(system => {
        const btns  = system.querySelectorAll('[data-tab-target]');
        const panes = system.querySelectorAll('[data-tab-content]');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab-target');

                btns.forEach(b => b.classList.remove('active'));
                panes.forEach(p => p.classList.remove('active'));

                btn.classList.add('active');
                const targetPane = system.querySelector(`[data-tab-content="${targetId}"]`);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    });
}
