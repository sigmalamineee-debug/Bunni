// ===== PREMIUM QUICK WINS JAVASCRIPT =====

// Magnetic Button Effect
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-discord');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Magnetic effect - button follows cursor within bounds
            const moveX = x * 0.3;
            const moveY = y * 0.3;

            button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.feature-card, .hub-card, .platform-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // Smooth scroll reveal for headings
    const headings = document.querySelectorAll('h1, h2, h3');
    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    headings.forEach(heading => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateY(20px)';
        heading.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        headingObserver.observe(heading);
    });
});

// Enhanced navbar floating effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.style.transform = 'translateY(0) scale(0.98)';
    } else {
        navbar.style.transform = 'translateY(0) scale(1)';
    }
});

// Card tilt effect on hover (subtle 3D)
document.querySelectorAll('.feature-card, .platform-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Subtle tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
