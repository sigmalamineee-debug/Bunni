// ===== PHASE 2: ENHANCED COMPONENTS =====

// Enhanced Script Hub Cards with Skeleton Loading
function showSkeletonCards() {
    const grid = document.querySelector('.scripts-grid-dense');
    if (!grid) return;

    grid.querySelectorAll('.hub-card').forEach(card => {
        card.classList.add('skeleton');
    });

    setTimeout(() => {
        grid.querySelectorAll('.hub-card').forEach(card => {
            card.classList.remove('skeleton');
        });
    }, 300);
}

// Override existing filterScripts to add skeleton loading
const originalFilterScripts = window.filterScripts;
if (typeof originalFilterScripts === 'function') {
    window.filterScripts = function (input) {
        showSkeletonCards();
        setTimeout(() => originalFilterScripts(input), 100);
    };
}

// Download Button Ripple Effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// FAQ Section Polish - Improved Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const item = this.parentElement;
        const wasActive = item.classList.contains('active');

        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });

        // Toggle current FAQ
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// Footer Enhancements - Back to Top Button
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PHASE 3: ADVANCED FEATURES =====

// Enhanced Typing Animation with Syntax Highlighting
function enhancedTypeWriter() {
    const typeWriterElement = document.getElementById('typewriter');
    if (!typeWriterElement) return;

    const tokens = [
        { text: 'print', class: 'code-function' },
        { text: '(', class: '' },
        { text: '"Hello Bunni User!"', class: 'code-string' },
        { text: ')', class: '' },
        { text: '\n', class: '' },
        { text: 'local', class: 'code-keyword' },
        { text: ' api = ', class: '' },
        { text: 'loadstring', class: 'code-function' },
        { text: '(', class: '' },
        { text: 'game', class: 'code-global' },
        { text: ':', class: '' },
        { text: 'HttpGet', class: 'code-method' },
        { text: '("...")', class: 'code-string' },
        { text: ')()\n', class: '' },
        { text: 'api', class: 'code-variable' },
        { text: ':', class: '' },
        { text: 'Init', class: 'code-method' },
        { text: '()\n', class: '' },
        { text: '-- Executing...', class: 'code-comment' }
    ];

    let tokenIndex = 0;
    let charIndex = 0;

    function type() {
        if (tokenIndex >= tokens.length) {
            setTimeout(() => {
                typeWriterElement.innerHTML = '';
                tokenIndex = 0;
                charIndex = 0;
                type();
            }, 3000);
            return;
        }

        const token = tokens[tokenIndex];

        if (charIndex < token.text.length) {
            let currentSpan = typeWriterElement.lastElementChild;
            if (!currentSpan || currentSpan.className !== token.class) {
                currentSpan = document.createElement('span');
                currentSpan.className = token.class;
                typeWriterElement.appendChild(currentSpan);
            }

            const char = token.text.charAt(charIndex);
            if (char === '\n') {
                typeWriterElement.appendChild(document.createElement('br'));
            } else {
                currentSpan.textContent += char;
            }

            charIndex++;
            const speed = Math.random() * 40 + 30;
            setTimeout(type, speed);
        } else {
            tokenIndex++;
            charIndex = 0;
            setTimeout(type, 50);
        }
    }

    type();
}

// Loading Screen
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();

                // Signal that loading is complete
                window.loadingComplete = true;

                // Trigger animations for elements already in view
                document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-text-line, .scroll-indicator').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });

            }, 500);
        }, 1500);
    }

    // Start enhanced typing animation
    enhancedTypeWriter();
});

// Cursor Trail Effect (Hero Section Only)
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    let trailTimeout;
    heroSection.addEventListener('mousemove', (e) => {
        clearTimeout(trailTimeout);
        trailTimeout = setTimeout(() => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            heroSection.appendChild(trail);

            setTimeout(() => trail.remove(), 1000);
        }, 50);
    });
}
