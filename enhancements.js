// Phase 1: Parallax Scroll Effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const bgGlow = document.querySelector('.bg-glow');
    const bgGrid = document.querySelector('.bg-grid');
    
    if (bgGlow) {
        bgGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
    }
    if (bgGrid) {
        bgGrid.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}

// Phase 1: Navbar Scroll Effect
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            updateNavbar();
            ticking = false;
        });
        ticking = true;
    }
});

// Phase 1: Enhanced Stat Counter with Pulse
document.addEventListener('DOMContentLoaded', () => {
    // Add pulse effect to stats when they complete
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                const target = mutation.target.parentElement || mutation.target;
                if (target.classList && target.classList.contains('stat-value')) {
                    const currentValue = target.innerText.replace(/[^0-9.]/g, '');
                    const targetValue = target.getAttribute('data-target');
                    
                    if (currentValue && targetValue && parseFloat(currentValue) === parseFloat(targetValue)) {
                        target.classList.add('pulse');
                        setTimeout(() => target.classList.remove('pulse'), 600);
                        observer.disconnect();
                    }
                }
            }
        });
    });

    document.querySelectorAll('.stat-value').forEach(stat => {
        observer.observe(stat, { characterData: true, childList: true, subtree: true });
    });
});
