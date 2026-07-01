// main.js — Application entry point

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initNavigation  === 'function') initNavigation();   // nav.js
    if (typeof initAnimations  === 'function') initAnimations();   // animations.js
    if (typeof initTabs        === 'function') initTabs();         // tabs.js
    if (typeof initFAQ         === 'function') initFAQ();          // faq.js
    if (typeof initRegistration=== 'function') initRegistration(); // registration.js
});
