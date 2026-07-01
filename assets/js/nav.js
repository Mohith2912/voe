// nav.js — Navbar scroll-glass effect + active page link

function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Scroll-glass effect
    const onScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on init

    // Active page link highlighting
    const path = window.location.pathname.replace(/\\/g, '/');
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        // Normalise href to just the filename
        const linkFile = href.split('/').pop();
        const pageFile = path.split('/').pop() || 'index.html';
        if (
            linkFile === pageFile ||
            (pageFile === '' && linkFile === 'index.html')
        ) {
            link.classList.add('active-page');
        }
    });

    // Mobile menu
    const mobileBtn  = document.getElementById('mobileMenuBtn');
    const mobileNav  = document.getElementById('mobileNav');
    const mobileClose= document.getElementById('mobileClose');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        const closeMenu = () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        };
        if (mobileClose) mobileClose.addEventListener('click', closeMenu);
        mobileNav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
    }
}
