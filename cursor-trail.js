document.addEventListener('DOMContentLoaded', () => {
    const trailCount = 20;
    const trails = [];
    const mouse = { x: 0, y: 0 };

    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
        const div = document.createElement('div');
        div.className = 'cursor-trail';
        document.body.appendChild(div);
        trails.push({
            element: div,
            x: 0,
            y: 0,
            alpha: 1 - (i / trailCount)
        });
    }

    // Style for trail elements (injected here to avoid another CSS file if possible, or we can move to CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        .cursor-trail {
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--primary-color, #9333ea);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            mix-blend-mode: screen;
            box-shadow: 0 0 10px var(--primary-color, #9333ea);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function animate() {
        let x = mouse.x;
        let y = mouse.y;

        trails.forEach((trail, index) => {
            const nextTrail = trails[index + 1] || trails[0];

            trail.x += (x - trail.x) * 0.3;
            trail.y += (y - trail.y) * 0.3;

            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.opacity = trail.alpha;
            trail.element.style.transform = `translate(-50%, -50%) scale(${trail.alpha})`;

            // Drag effect
            x = trail.x;
            y = trail.y;
        });

        requestAnimationFrame(animate);
    }

    animate();
});
