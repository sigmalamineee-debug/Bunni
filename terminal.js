document.addEventListener('DOMContentLoaded', () => {
    const terminalContainer = document.getElementById('terminal-container');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    if (!terminalContainer || !terminalOutput || !terminalInput) return;

    const commands = {
        help: {
            desc: 'List available commands',
            action: () => {
                printOutput('Available commands:', 'cmd-info');
                printOutput('  help      - Show this help message');
                printOutput('  inject    - Inject Bunni into Roblox');
                printOutput('  status    - Show executor status');
                printOutput('  clear     - Clear terminal output');
                printOutput('  whoami    - Show current user');
                printOutput('  echo [txt]- Print text to console');
            }
        },
        clear: {
            desc: 'Clear terminal',
            action: () => {
                terminalOutput.innerHTML = '';
            }
        },
        whoami: {
            desc: 'Show user',
            action: () => {
                printOutput('guest@bunni-user', 'cmd-success');
            }
        },
        status: {
            desc: 'Show status',
            action: () => {
                printOutput('Bunni Executor v2.4.3', 'cmd-info');
                printOutput('Status: Undetected', 'cmd-success');
                printOutput('Byfron: Bypassed', 'cmd-success');
                printOutput('Key System: Active', 'cmd-warning');
            }
        },
        inject: {
            desc: 'Inject executor',
            action: async () => {
                printOutput('Initiating injection sequence...', 'cmd-warning');

                await delay(500);
                printOutput('[*] Scanning for Roblox process...', 'cmd-info');

                await delay(800);
                printOutput('[+] Roblox found (PID: 1337)', 'cmd-success');

                await delay(400);
                printOutput('[*] Bypassing Byfron...', 'cmd-warning');
                createProgressBar(2000);

                await delay(2200);
                printOutput('[+] Byfron bypassed successfully', 'cmd-success');

                await delay(500);
                printOutput('[*] Injecting DLL...', 'cmd-info');

                await delay(800);
                printOutput('Bunni Injected Successfully!', 'cmd-success');

                // Trigger a UI effect if possible (e.g., shake or glow)
                const heroCard = document.querySelector('.dashboard-preview-card');
                if (heroCard) {
                    heroCard.style.boxShadow = '0 0 50px rgba(34, 197, 94, 0.5)';
                    setTimeout(() => {
                        heroCard.style.boxShadow = '';
                    }, 1000);
                }
            }
        },
        echo: {
            desc: 'Echo text',
            action: (args) => {
                printOutput(args.join(' '));
            }
        }
    };

    terminalInput.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim();
            if (!input) return;

            // Add command to history/output
            const promptLine = document.createElement('div');
            promptLine.className = 'terminal-line';
            promptLine.innerHTML = `<span class="terminal-prompt">user@bunni:~$</span> ${escapeHtml(input)}`;
            terminalOutput.appendChild(promptLine);

            // Process command
            const args = input.split(' ');
            const cmd = args.shift().toLowerCase();

            if (commands[cmd]) {
                await commands[cmd].action(args);
            } else {
                printOutput(`Command not found: ${cmd}. Type 'help' for list.`, 'cmd-error');
            }

            terminalInput.value = '';
            scrollToBottom();
        }
    });

    // Focus input when clicking anywhere in terminal
    terminalContainer.addEventListener('click', () => {
        terminalInput.focus();
    });

    function printOutput(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        terminalOutput.appendChild(line);
        scrollToBottom();
    }

    function scrollToBottom() {
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function createProgressBar(duration) {
        const container = document.createElement('div');
        container.className = 'progress-bar-container';

        const fill = document.createElement('div');
        fill.className = 'progress-bar-fill';

        container.appendChild(fill);
        terminalOutput.appendChild(container);
        scrollToBottom();

        // Animate
        setTimeout(() => {
            fill.style.width = '100%';
        }, 50);
    }

    // Initial Message
    printOutput('Welcome to Bunni Terminal v1.0', 'cmd-info');
    printOutput("Type 'help' to get started.", 'cmd-info');
});
