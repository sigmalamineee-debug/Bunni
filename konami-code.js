// ===== KONAMI CODE EASTER EGG =====

document.addEventListener('DOMContentLoaded', () => {
    initKonamiCode();
});

function initKonamiCode() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    let cursor = 0;
    let typedBuffer = "";

    document.addEventListener('keydown', (e) => {
        // 1. Check Konami Code
        if (e.key.toLowerCase() === konamiCode[cursor].toLowerCase() || e.key === konamiCode[cursor]) {
            cursor++;

            // If sequence is complete
            if (cursor === konamiCode.length) {
                activateMatrixMode();
                cursor = 0; // Reset
            }
        } else {
            cursor = 0; // Reset if wrong key pressed
        }

        // 2. Check for "matrix" keyword
        if (e.key.length === 1) { // Only track printable characters
            typedBuffer += e.key.toLowerCase();
            if (typedBuffer.length > 10) {
                typedBuffer = typedBuffer.slice(-10); // Keep buffer small
            }

            if (typedBuffer.includes("matrix")) {
                activateMatrixMode();
                typedBuffer = ""; // Reset buffer
            }
        }
    });
}

function activateMatrixMode() {
    const body = document.body;
    const isMatrix = body.classList.contains('matrix-mode');

    if (isMatrix) {
        // Deactivate
        body.classList.remove('matrix-mode');
        showToast("System Restored. Matrix Mode Deactivated.");
        removeMatrixCanvas();
    } else {
        // Activate
        body.classList.add('matrix-mode');
        showToast("ACCESS GRANTED. WELCOME TO THE MATRIX.");
        initMatrixRain();

        // Play sound if available
        if (typeof playClickSound === 'function') {
            // Simulate a "hack" sound
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioContext();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, audioCtx.currentTime);
            osc.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        }
    }
}

function showToast(message) {
    let toast = document.getElementById('konami-toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'konami-toast';
        document.body.appendChild(toast);
    }

    toast.innerText = message;
    toast.classList.add('visible');

    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3000);
}

function initMatrixRain() {
    if (document.getElementById('matrix-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        if (!document.body.classList.contains('matrix-mode')) return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    const interval = setInterval(draw, 30);

    // Store interval to clear it later
    canvas.dataset.intervalId = interval;
}

function removeMatrixCanvas() {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        clearInterval(canvas.dataset.intervalId);
        canvas.remove();
    }
}
