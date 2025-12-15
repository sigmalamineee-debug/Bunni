document.addEventListener('DOMContentLoaded', () => {
    // Inject HTML structure
    const paletteHTML = `
        <div class="cmd-palette-overlay" id="cmdPalette">
            <div class="cmd-palette-modal">
                <div class="cmd-palette-header">
                    <input type="text" class="cmd-palette-input" placeholder="Type a command or search..." id="cmdInput">
                </div>
                <div class="cmd-palette-body" id="cmdResults">
                    <!-- Results injected here -->
                </div>
                <div class="cmd-palette-footer">
                    <div class="key-hint"><span class="key-badge">↵</span> to select</div>
                    <div class="key-hint"><span class="key-badge">↑↓</span> to navigate</div>
                    <div class="key-hint"><span class="key-badge">esc</span> to close</div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', paletteHTML);

    const overlay = document.getElementById('cmdPalette');
    const input = document.getElementById('cmdInput');
    const resultsContainer = document.getElementById('cmdResults');

    let isOpen = false;
    let selectedIndex = 0;

    // Define Commands
    const commands = [
        { icon: '<i class="fa-solid fa-house"></i>', label: 'Go to Home', action: () => switchTab('home'), tags: ['home', 'dashboard'] },
        {
            icon: '<i class="fa-solid fa-star"></i>', label: 'Go to Features', action: () => {
                switchTab('home');
                setTimeout(() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }, tags: ['features', 'info']
        },
        {
            icon: '<i class="fa-solid fa-code"></i>', label: 'Go to Script Hub', action: () => {
                switchTab('scripts');
                setTimeout(() => { document.getElementById('scripts-tab')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
            }, tags: ['scripts', 'hacks', 'lua']
        },
        {
            icon: '<i class="fa-solid fa-cart-shopping"></i>', label: 'Go to Resellers', action: () => {
                switchTab('resellers');
                setTimeout(() => { document.getElementById('resellers-tab')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
            }, tags: ['buy', 'shop', 'store']
        },
        {
            icon: '<i class="fa-solid fa-envelope"></i>', label: 'Go to Contact', action: () => {
                switchTab('contact');
                setTimeout(() => { document.getElementById('contact-tab')?.scrollIntoView({ behavior: 'smooth' }); }, 100);
            }, tags: ['support', 'discord', 'help']
        },
        { icon: '<i class="fa-brands fa-discord"></i>', label: 'Join Discord', action: () => window.open('https://discord.gg/bunnilol', '_blank'), tags: ['community', 'chat'] },
        { icon: '<i class="fa-solid fa-download"></i>', label: 'Download Bunni', action: () => window.open(config.downloadLink, '_blank'), tags: ['get', 'install'] },
        {
            icon: '<i class="fa-solid fa-terminal"></i>', label: 'Run Injection', action: () => {
                document.querySelector('.terminal-container')?.scrollIntoView({ behavior: 'smooth' });
                // Simulate typing 'inject' in terminal if possible, or just focus it
                const termInput = document.getElementById('terminal-input');
                if (termInput) { termInput.focus(); termInput.value = 'inject'; }
            }, tags: ['hack', 'attach']
        },
        {
            icon: '<i class="fa-solid fa-eraser"></i>', label: 'Clear Terminal', action: () => {
                const termOut = document.getElementById('terminal-output');
                if (termOut) termOut.innerHTML = '';
            }, tags: ['clean', 'wipe']
        }
    ];

    // Open/Close Logic
    function togglePalette() {
        isOpen = !isOpen;
        if (isOpen) {
            overlay.classList.add('active');
            input.value = '';
            renderResults(commands);
            setTimeout(() => input.focus(), 50);
        } else {
            overlay.classList.remove('active');
        }
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            togglePalette();
        }
        if (e.key === 'Escape' && isOpen) {
            togglePalette();
        }
    });

    // Navigation & Selection
    input.addEventListener('keydown', (e) => {
        const items = resultsContainer.querySelectorAll('.cmd-item');
        if (items.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % items.length;
            updateSelection(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + items.length) % items.length;
            updateSelection(items);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            items[selectedIndex].click();
        }
    });

    // Filtering
    input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = commands.filter(cmd =>
            cmd.label.toLowerCase().includes(query) ||
            cmd.tags.some(tag => tag.includes(query))
        );
        renderResults(filtered);
    });

    function renderResults(items) {
        resultsContainer.innerHTML = '';
        selectedIndex = 0;

        if (items.length === 0) {
            resultsContainer.innerHTML = '<div style="padding:12px; color:rgba(255,255,255,0.4); text-align:center;">No results found</div>';
            return;
        }

        items.forEach((cmd, index) => {
            const el = document.createElement('div');
            el.className = `cmd-item ${index === 0 ? 'selected' : ''}`;
            el.innerHTML = `
                <div class="cmd-icon">${cmd.icon}</div>
                <div class="cmd-content">
                    <span class="cmd-label">${cmd.label}</span>
                </div>
            `;
            el.addEventListener('click', () => {
                cmd.action();
                togglePalette();
            });
            el.addEventListener('mouseenter', () => {
                selectedIndex = index;
                updateSelection(document.querySelectorAll('.cmd-item'));
            });
            resultsContainer.appendChild(el);
        });
    }

    function updateSelection(items) {
        items.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('selected');
            }
        });
    }

    // Close on click outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) togglePalette();
    });
});
