// animations.js — All visual effects & interactions
// Covers: scroll reveal, particles, counters, tilt, magnetic buttons,
//         cursor glow, parallax, timeline reveal, prize reveal, form micro-interactions

/* ─── 1. SPLIT TEXT REVEAL ───────────────────────────────────── */
function initSplitTextReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = document.querySelectorAll('.split-text');
    if (!els.length) return;

    els.forEach(el => {
        // Simple word splitter that respects existing HTML nodes
        const processNode = (node) => {
            if (node.nodeType === 3) { // Text node
                const words = node.nodeValue.split(/(\s+)/);
                const frag = document.createDocumentFragment();
                words.forEach(w => {
                    if (!w.trim()) {
                        frag.appendChild(document.createTextNode(w));
                    } else {
                        const span = document.createElement('span');
                        span.className = 'word';
                        span.textContent = w;
                        frag.appendChild(span);
                    }
                });
                return frag;
            } else if (node.nodeType === 1) { // Element node
                const newEl = node.cloneNode(false);
                Array.from(node.childNodes).forEach(child => {
                    newEl.appendChild(processNode(child));
                });
                return newEl;
            }
            return node.cloneNode(true);
        };

        const newContent = processNode(el);
        el.innerHTML = '';
        el.appendChild(newContent);

        // Assign staggered delays to all .word elements within this container
        const words = el.querySelectorAll('.word');
        words.forEach((w, i) => {
            w.style.transitionDelay = `${i * 0.12}s`;
        });
    });

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    els.forEach(el => io.observe(el));
}

/* ─── 2. SCROLL REVEAL ─────────────────────────────────────── */
function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => io.observe(el));
}

/* ─── 2. HERO PARTICLE CANVAS ──────────────────────────────── */
function initHeroParticles() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    const COLORS = [
        'rgba(91, 82, 240,',
        'rgba(240, 79, 122,',
        'rgba(168, 85, 247,',
        'rgba(6, 182, 212,',
    ];

    // Canvas is now styled globally in HTML, so we don't need to override its style here


    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const spawn = () => ({
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(Math.random() * 1.2 + 0.4),
        size: Math.random() * 2.5 + 0.5,
        alpha: 0,
        maxAlpha: Math.random() * 0.6 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 0,
        maxLife: Math.random() * 200 + 120,
    });

    const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length < 120 && Math.random() < 0.45) particles.push(spawn());
        particles = particles.filter(p => p.life < p.maxLife);
        particles.forEach(p => {
            p.life++; p.x += p.vx; p.y += p.vy;
            const t = p.life / p.maxLife;
            p.alpha = t < 0.1 ? (t / 0.1) * p.maxAlpha
                    : t > 0.8 ? ((1 - t) / 0.2) * p.maxAlpha
                    : p.maxAlpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${p.alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };
    draw();
}

/* ─── 3. COUNTER ANIMATION ─────────────────────────────────── */
function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el     = entry.target;
            const target = parseFloat(el.getAttribute('data-counter'));
            const suffix = el.getAttribute('data-suffix') || '';
            let start = null;
            const step = ts => {
                if (!start) start = ts;
                const progress = Math.min((ts - start) / 1400, 1);
                const eased    = 1 - Math.pow(2, -10 * progress);
                el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => io.observe(el));
}

/* ─── 4. MAGNETIC BUTTONS ──────────────────────────────────── */
function initMagneticButtons() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.btn-hero').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r  = btn.getBoundingClientRect();
            const dx = (e.clientX - r.left - r.width  / 2) * 0.18;
            const dy = (e.clientY - r.top  - r.height / 2) * 0.18;
            btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
}

/* ─── 5. CARD TILT ─────────────────────────────────────────── */
function initCardTilt() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.track-card, .preview-card, .stat-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width  - 0.5;
            const y = (e.clientY - r.top)  / r.height - 0.5;
            card.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

/* ─── 6. TIMELINE NODE REVEAL ──────────────────────────────── */
function initTimelineReveal() {
    const trackFill = document.querySelector('.timeline-track-fill');
    const nodes = document.querySelectorAll('.tl-node');
    if (!nodes.length) return;

    nodes.forEach(n => {
        Object.assign(n.style, { opacity: '0', transform: 'translateY(20px)', transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)' });
    });

    const io = new IntersectionObserver((entries, obs) => {
        let i = 0;
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const n = entry.target;
            setTimeout(() => {
                n.style.opacity   = '1';
                n.style.transform = 'none';
            }, i * 150);
            i++;
            obs.unobserve(n);
        });
        
        // Draw track fill based on active nodes (assuming last active is the current state)
        if (trackFill && i > 0) {
            setTimeout(() => {
                const activeIndex = Array.from(nodes).findIndex(n => n.classList.contains('active'));
                const pct = activeIndex >= 0 ? (activeIndex / (nodes.length - 1)) * 100 : 0;
                trackFill.style.width = `${pct}%`;
            }, 300);
        }
    }, { threshold: 0.3 });

    nodes.forEach(n => io.observe(n));
}

/* ─── 7. PRIZE HERO REVEAL ─────────────────────────────────── */
function initPrizeReveal() {
    const hero = document.querySelector('.prize-hero');
    if (!hero) return;
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('prize-revealed');
        });
    }, { threshold: 0.4 });
    io.observe(hero);
}

/* ─── 8. FORM MICRO-INTERACTIONS ───────────────────────────── */
function initFormEffects() {
    const formPanel = document.querySelector('.form-panel');
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group')?.classList.add('focused');
            if (formPanel) formPanel.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            input.closest('.form-group')?.classList.remove('focused');
            if (formPanel) formPanel.classList.remove('focused');
        });
    });
}

/* ─── 9. CURSOR GLOW TRAIL ─────────────────────────────────── */
function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    Object.assign(glow.style, {
        position: 'fixed', pointerEvents: 'none', zIndex: '9998',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(91,82,240,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)', transition: 'opacity 0.3s ease',
        opacity: '0', left: '0', top: '0',
    });
    document.body.appendChild(glow);

    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; glow.style.opacity = '1'; });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

    const update = () => {
        gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
        glow.style.left = gx + 'px'; glow.style.top = gy + 'px';
        requestAnimationFrame(update);
    };
    update();
}

/* ─── 10. PARALLAX AURORA ──────────────────────────────────── */
function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const blobs = document.querySelectorAll('.aurora-blob');
    if (!blobs.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const sy = window.scrollY;
                blobs.forEach((b, i) => { b.style.transform = `translateY(${sy * (i + 1) * 0.04}px)`; });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/* ─── MASTER INIT ──────────────────────────────────────────── */
function initAnimations() {
    initSplitTextReveal();
    initScrollReveal();
    initHeroParticles();
    initCounters();
    initMagneticButtons();
    initCardTilt();
    initTimelineReveal();
    initPrizeReveal();
    initFormEffects();
    initCursorGlow();
    initParallax();
}
