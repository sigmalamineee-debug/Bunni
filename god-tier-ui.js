// ===== GOD-TIER UI LOGIC =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme Switcher FIRST
    initThemeSwitcher();

    // Core UI
    try { initAurora(); } catch (e) { console.error(e); }
    try { initBentoGrid(); } catch (e) { console.error(e); }
    try { initScrollJacking(); } catch (e) { console.error(e); }
    try { initSpotlight(); } catch (e) { console.error(e); }
    try { initMarquee(); } catch (e) { console.error(e); }
    try { initGlitchText(); } catch (e) { console.error(e); }
    try { initNavbar(); } catch (e) { console.error(e); }
    try { initUniversalTilt(); } catch (e) { console.error(e); }
    try { initCustomContextMenu(); } catch (e) { console.error(e); }
    try { initSmokyReveal(); } catch (e) { console.error(e); }
    try { initScrollIndicator(); } catch (e) { console.error(e); }
    try { initConstellationParticles(); } catch (e) { console.error(e); }
    try { initUISounds(); } catch (e) { console.error(e); }

    // Functional Features
    try { initMonacoEditor(); } catch (e) { console.error(e); }
    try { initBackendStatus(); } catch (e) { console.error(e); }
    try { initScriptSearch(); } catch (e) { console.error(e); }

    // Visual Enhancements (God-Tier)
    try { initFlipSettings(); } catch (e) { console.error(e); }
    try { initNeonRain(); } catch (e) { console.error(e); }
    try { initWaterRipple(); } catch (e) { console.error(e); }
    try { initThemeShockwave(); } catch (e) { console.error(e); }
    try { initMagneticButtons(); } catch (e) { console.error(e); }
    try { initParallaxIcons(); } catch (e) { console.error(e); }
});

/* 1. AURORA BACKGROUND */
function initAurora() {
    const auroraContainer = document.createElement('div');
    auroraContainer.className = 'aurora-container';
    ['aurora-1', 'aurora-2', 'aurora-3'].forEach(blobClass => {
        const blob = document.createElement('div');
        blob.className = `aurora-blob ${blobClass}`;
        auroraContainer.appendChild(blob);
    });
    document.body.prepend(auroraContainer);
}

/* 2. BENTO GRID */
function initBentoGrid() {
    // CSS Grid handles most of this, but we can add dynamic resizing if needed
}

/* 3. CINEMATIC SCROLL-JACKING */
function initScrollJacking() {
    const container = document.querySelector('.scroll-jack-container');
    if (!container) return;
    const windowEl = document.querySelector('.cinematic-window');
    const contents = document.querySelectorAll('.cinematic-content');
    const dots = document.querySelectorAll('.progress-dot');

    window.addEventListener('scroll', () => {
        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        let progress = (0 - rect.top) / (rect.height - viewportHeight);
        progress = Math.max(0, Math.min(1, progress));

        let scale = 1;
        if (progress < 0.1) scale = 0.8 + (progress * 2);
        else if (progress > 0.9) scale = 1 - ((progress - 0.9) * 2);

        const rotateX = (progress - 0.5) * 20;
        if (windowEl) windowEl.style.transform = `scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`;

        let activeIndex = 0;
        if (progress > 0.66) activeIndex = 2;
        else if (progress > 0.33) activeIndex = 1;

        contents.forEach((content, index) => {
            if (index === activeIndex) {
                content.classList.add('active');
                if (dots[index]) dots[index].classList.add('active');
            } else {
                content.classList.remove('active');
                if (dots[index]) dots[index].classList.remove('active');
            }
        });
    });
}

/* 4. SPOTLIGHT BORDERS */
function initSpotlight() {
    const cards = document.querySelectorAll('.bento-card');
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                cards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* 5. INFINITE MARQUEE */
function initMarquee() {
    // CSS animation handles this
}

/* 6. GLITCH TEXT */
function initGlitchText() {
    const headers = document.querySelectorAll('h1, h2, .window-title');
    headers.forEach(header => {
        header.addEventListener('mouseover', () => {
            header.style.animation = 'glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite';
            setTimeout(() => header.style.animation = 'none', 300);
        });
    });
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes glitch-skew {
            0% { transform: translate(0) }
            20% { transform: translate(-2px, 2px) }
            40% { transform: translate(-2px, -2px) }
            60% { transform: translate(2px, 2px) }
            80% { transform: translate(2px, -2px) }
            100% { transform: translate(0) }
        }
    `;
    document.head.appendChild(style);
}

/* 7. NAVBAR */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
        else navbar.classList.remove('navbar-scrolled');
    });
}

/* 8. UNIVERSAL TILT */
function initUniversalTilt() {
    const cards = document.querySelectorAll('.bento-card, .feature-card, .hub-card, .dashboard-preview-card');
    cards.forEach(card => {
        let ticking = false;
        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = card.getBoundingClientRect();
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -3;
                    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 3;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

/* 9. THEME SWITCHER */
function initThemeSwitcher() {
    const toggles = document.querySelectorAll('.theme-toggle, .theme-toggle-nav');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('theme-void');
            const icon = toggle.querySelector('i');
            if (document.body.classList.contains('theme-void')) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    });
}

/* 10. CONTEXT MENU */
function initCustomContextMenu() {
    const menu = document.createElement('div');
    menu.className = 'custom-context-menu';
    menu.innerHTML = `
        <div class="menu-item"><i class="fa-solid fa-copy"></i> Copy</div>
        <div class="menu-item"><i class="fa-solid fa-paste"></i> Paste</div>
        <div class="menu-separator"></div>
        <div class="menu-item"><i class="fa-solid fa-terminal"></i> Inject</div>
        <div class="menu-item"><i class="fa-solid fa-rotate"></i> Refresh UI</div>
    `;
    document.body.appendChild(menu);

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        menu.style.left = `${e.clientX}px`;
        menu.style.top = `${e.clientY}px`;
        menu.classList.add('visible');
    });

    document.addEventListener('click', () => menu.classList.remove('visible'));
}

/* 11. SMOKY REVEAL */
function initSmokyReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.filter = 'blur(0)';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    document.querySelectorAll('.reveal-text-line').forEach(el => observer.observe(el));
}

/* 12. SCROLL INDICATOR */
function initScrollIndicator() {
    // Removed as per user preference
}

/* 13. CONSTELLATION PARTICLES */
function initConstellationParticles() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('constellation-canvas');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');
    let width, height, particles = [];
    // Reduced particle count from 40 to 15 for performance
    const particleCount = 15;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
            particles.forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 120})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* 14. UI SOUNDS */
function initUISounds() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playTone(freq, type) {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    }
    document.querySelectorAll('button, a, .nav-tab, .bento-card').forEach(el => {
        el.addEventListener('mouseenter', () => playTone(400, 'sine'));
        el.addEventListener('click', () => playTone(600, 'square'));
    });
}

/* 15. MONACO EDITOR */
let editor;
function initMonacoEditor() {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        monaco.editor.defineTheme('bunni-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '6A9955' },
                { token: 'keyword', foreground: 'C586C0' },
                { token: 'string', foreground: 'CE9178' },
            ],
            colors: {
                'editor.background': '#0f0518',
                'editor.lineHighlightBackground': '#1f1f1f',
                'editorCursor.foreground': '#E2B340',
            }
        });
        editor = monaco.editor.create(document.getElementById('monaco-container'), {
            value: '-- Welcome to Bunni Executor\nprint("Hello World!")\n\n-- Inject to start hacking!',
            language: 'lua',
            theme: document.body.classList.contains('theme-void') ? 'bunni-dark' : 'vs-dark',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 14,
            minimap: { enabled: true },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            roundedSelection: true,
            padding: { top: 16, bottom: 16 },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            smoothScrolling: true
        });
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isVoid = document.body.classList.contains('theme-void');
                    monaco.editor.setTheme(isVoid ? 'bunni-dark' : 'vs-dark');
                }
            });
        });
        observer.observe(document.body, { attributes: true });
    });
}

/* 16. BACKEND STATUS */
function initBackendStatus() {
    const statusText = document.querySelector('.status-badge');
    setTimeout(() => {
        if (statusText) {
            statusText.innerHTML = '<span class="dot green"></span> Connected';
            statusText.classList.add('online');
        }
        const injectBtn = document.querySelector('.btn-secondary');
        if (injectBtn) {
            injectBtn.addEventListener('click', () => {
                injectBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Injecting...';
                setTimeout(() => {
                    injectBtn.innerHTML = '<i class="fa-solid fa-check"></i> Injected';
                    injectBtn.style.color = '#4ade80';
                    setTimeout(() => {
                        injectBtn.innerHTML = '<i class="fa-solid fa-link"></i> Attach';
                        injectBtn.style.color = '';
                    }, 2000);
                }, 1500);
            });
        }
    }, 1000);
}

/* 17. SCRIPT SEARCH */
function initScriptSearch() {
    const searchInput = document.querySelector('.hub-search-input');
    const scriptCards = document.querySelectorAll('.hub-card');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            scriptCards.forEach(card => {
                const title = card.querySelector('.hub-script-title').innerText.toLowerCase();
                const game = card.querySelector('.hub-script-game').innerText.toLowerCase();
                if (title.includes(term) || game.includes(term)) {
                    card.style.display = 'flex';
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = 'revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/* 18. VISUAL ENHANCEMENTS */

// 3D Flip Settings
function initFlipSettings() {
    const settingsBtn = document.querySelector('.icon-btn[title="Settings"]');
    const editorCard = document.querySelector('.dashboard-preview-card');
    if (settingsBtn && editorCard) {
        settingsBtn.addEventListener('click', () => editorCard.classList.toggle('flipped'));
        const style = document.createElement('style');
        style.innerHTML = `
            .dashboard-preview-card { transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d; }
            .dashboard-preview-card.flipped { transform: rotateY(180deg); }
        `;
        document.head.appendChild(style);
    }
}

// Neon Rain
function initNeonRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'neon-rain-canvas';
    Object.assign(canvas.style, { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: '-1', opacity: '0', pointerEvents: 'none' });
    document.body.appendChild(canvas);
}

// Water Ripple
function initWaterRipple() {
    document.addEventListener('click', (e) => {
        const ripple = document.createElement('div');
        ripple.className = 'water-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });
    const style = document.createElement('style');
    style.innerHTML = `
        .water-ripple {
            position: fixed; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.4); border-radius: 50%;
            transform: translate(-50%, -50%); pointer-events: none; animation: ripple-expand 1s linear forwards; z-index: 9999;
        }
        @keyframes ripple-expand {
            0% { width: 0; height: 0; opacity: 0.8; }
            100% { width: 500px; height: 500px; opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Theme Shockwave
function initThemeShockwave() {
    const toggle = document.querySelector('.theme-toggle-nav') || document.querySelector('.theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', (e) => {
            const shockwave = document.createElement('div');
            shockwave.className = 'theme-shockwave';
            shockwave.style.left = `${e.clientX}px`;
            shockwave.style.top = `${e.clientY}px`;
            const isVoid = document.body.classList.contains('theme-void');
            shockwave.style.background = isVoid ? '#9333ea' : '#e2b340';
            document.body.appendChild(shockwave);
            setTimeout(() => shockwave.remove(), 1000);
        });
        const style = document.createElement('style');
        style.innerHTML = `
            .theme-shockwave {
                position: fixed; width: 0; height: 0; border-radius: 50%; transform: translate(-50%, -50%);
                pointer-events: none; z-index: 9999; opacity: 0.5; animation: shockwave-expand 0.8s ease-out forwards; mix-blend-mode: overlay;
            }
            @keyframes shockwave-expand { to { width: 300vmax; height: 300vmax; opacity: 0; } }
        `;
        document.head.appendChild(style);
    }
}

// Magnetic Buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-tab');
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0)');
    });
}

// Parallax Icons
function initParallaxIcons() {
    const container = document.createElement('div');
    Object.assign(container.style, { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '-1' });
    document.body.appendChild(container);
    const icons = ['🔒', '🔑', '🛡️', '⚡', '🌌', '💻'];
    // Reduced count from 15 to 6 for performance
    for (let i = 0; i < 6; i++) {
        const el = document.createElement('div');
        el.innerText = icons[Math.floor(Math.random() * icons.length)];
        Object.assign(el.style, {
            position: 'absolute', left: `${Math.random() * 100}vw`, top: `${Math.random() * 100}vh`,
            fontSize: `${Math.random() * 2 + 1}rem`, opacity: '0.05', filter: 'blur(2px)'
        });
        el.dataset.speed = Math.random() * 0.5 + 0.1;
        container.appendChild(el);
    }

    let ticking = false;
    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const x = (window.innerWidth - e.clientX * 5) / 100;
                const y = (window.innerHeight - e.clientY * 5) / 100;
                Array.from(container.children).forEach(el => {
                    const speed = parseFloat(el.dataset.speed);
                    el.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* 21. TAB NAVIGATION */
/* 21. TAB NAVIGATION */
window.switchTab = function (tabId) {
    // Update Nav Tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('href') === `#${tabId}`) {
            tab.classList.add('active');
        }
    });

    // Update Tab Content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none'; // Ensure hidden
    });

    const targetContent = document.getElementById(`${tabId}-tab`);
    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block'; // Ensure visible

        // Scroll to top to prevent "scrolling down" feeling
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Re-trigger animations for the new tab
        const animations = targetContent.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        animations.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; /* trigger reflow */
            el.style.animation = '';
        });
    }
};
