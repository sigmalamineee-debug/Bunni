// ===== ULTRA-PREMIUM FEATURES =====

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initDecryptEffect();
    initCustomCursor();
    initSoundDesign();
});

/* 1. Interactive Particle Network Background */
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 60; // Number of dots
    const connectionDistance = 150; // Max distance to draw line
    const mouseDistance = 200; // Mouse interaction radius

    // Mouse position
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
            this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
            this.size = Math.random() * 2 + 1;
            this.color = 'rgba(226, 179, 64, ' + (Math.random() * 0.5 + 0.1) + ')'; // Gold tint
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const directionX = forceDirectionX * force * 0.6;
                    const directionY = forceDirectionY * force * 0.6;

                    this.vx += directionX;
                    this.vy += directionY;
                }
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Draw connections
            for (let j = i; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    let opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = 'rgba(226, 179, 64, ' + (opacity * 0.15) + ')';
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        init();
    });

    resize();
    init();
    animate();
}

/* 2. Decrypting Text Effect */
function initDecryptEffect() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const targetElement = document.querySelector('h1 span.text-gradient') || document.querySelector('h1');

    if (!targetElement) return;

    // Store original text
    const originalText = targetElement.innerText;
    // Set a fixed width to prevent layout jumping
    targetElement.style.width = targetElement.offsetWidth + 'px';
    targetElement.style.display = 'inline-block';

    let iteration = 0;
    let interval = null;

    clearInterval(interval);

    interval = setInterval(() => {
        targetElement.innerText = originalText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= originalText.length) {
            clearInterval(interval);
            // Reset style
            targetElement.style.width = '';
            targetElement.style.display = '';
        }

        iteration += 1 / 3;
    }, 30);
}

/* 3. Custom Glow Cursor */
function initCustomCursor() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.id = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);

    // Movement logic
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, .feature-card, .hub-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/* 4. UI Sound Design */
function initSoundDesign() {
    // Create audio context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();

    let isMuted = false;

    // Sound Generators (Synthesized to avoid external files)

    // 1. Hover Sound (High pitch, short blip)
    function playHoverSound() {
        if (isMuted) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime); // Very quiet
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    }

    // 2. Click Sound (Lower pitch, soft thud)
    function playClickSound() {
        if (isMuted) return;
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    }

    // Add mute toggle button
    const muteBtn = document.createElement('button');
    muteBtn.className = 'sound-toggle';
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    muteBtn.title = "Toggle UI Sounds";
    document.body.appendChild(muteBtn);

    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.innerHTML = isMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
        muteBtn.classList.toggle('muted');

        // Resume audio context if suspended (browser policy)
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    });

    // Attach listeners
    const interactiveElements = document.querySelectorAll('a, button, .btn, .feature-card, .hub-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            playHoverSound();
        });

        el.addEventListener('click', () => {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            playClickSound();
        });
    });
}
