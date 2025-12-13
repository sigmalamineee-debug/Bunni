// ===== GOD-TIER UI LOGIC =====

document.addEventListener('DOMContentLoaded', () => {
    initAurora();
    initScrollJacking();
    initSpotlight();
    initMarquee();
    initGlitchText();
});

/* 1. AURORA BACKGROUND */
function initAurora() {
    const auroraContainer = document.createElement('div');
    auroraContainer.className = 'aurora-container';

    const blobs = ['aurora-1', 'aurora-2', 'aurora-3'];
    blobs.forEach(blobClass => {
        const blob = document.createElement('div');
        blob.className = `aurora-blob ${blobClass}`;
        auroraContainer.appendChild(blob);
    });

    document.body.prepend(auroraContainer);
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
        if (progress < 0.1) {
            scale = 0.8 + (progress * 2);
        } else if (progress > 0.9) {
            scale = 1 - ((progress - 0.9) * 2);
        }

        const rotateX = (progress - 0.5) * 20;

        if (windowEl) {
            windowEl.style.transform = `scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`;
        }

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

    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

/* 5. INFINITE MARQUEE */
function initMarquee() {
    const track = document.querySelector('.marquee-track');
    if (!track) return;

    // Clone items to ensure seamless loop
    const items = Array.from(track.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });

    // Double clone for wide screens
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
}

/* 6. GLITCH TEXT REVEAL (RECURSIVE DOM PRESERVATION) */
function initGlitchText() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

    // Helper to process a text node and return a fragment with glitch spans
    function glitchTextNode(node) {
        const text = node.textContent;
        // If it's just whitespace, return it as is to preserve spacing
        if (!text.trim() && !text.includes('\n')) return document.createTextNode(text);

        const fragment = document.createDocumentFragment();
        // Split by whitespace but keep delimiters to preserve spaces/newlines
        const parts = text.split(/(\s+)/);

        parts.forEach(part => {
            // If it's whitespace, just append it
            if (part.match(/^\s+$/)) {
                fragment.appendChild(document.createTextNode(part));
                return;
            }

            // Otherwise it's a word, wrap it
            const wordSpan = document.createElement('span');
            wordSpan.className = 'glitch-word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';

            part.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'glitch-char';
                charSpan.textContent = char;
                charSpan.dataset.char = char;
                wordSpan.appendChild(charSpan);
            });

            fragment.appendChild(wordSpan);
        });

        return fragment;
    }

    // Recursive function to traverse DOM
    function traverseAndGlitch(element) {
        const children = Array.from(element.childNodes);

        children.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const newContent = glitchTextNode(child);
                // Only replace if we actually created a fragment (not just returned the node)
                if (newContent !== child) {
                    element.replaceChild(newContent, child);
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                // Recurse into elements (like <span class="text-gradient">)
                traverseAndGlitch(child);
            }
        });
    }

    glitchElements.forEach(el => {
        traverseAndGlitch(el);

        // Apply animation to all created chars
        const spans = el.querySelectorAll('.glitch-char');
        spans.forEach((span, index) => {
            let iterations = 0;
            const maxIterations = 10 + (index * 2);

            const interval = setInterval(() => {
                span.innerText = chars[Math.floor(Math.random() * chars.length)];
                span.classList.add('scramble');
                iterations++;
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    span.innerText = span.dataset.char;
                    span.classList.remove('scramble');
                }
            }, 50);
        });
    });
}
