// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('heroParticles');

function createParticles() {
    if (!particlesContainer || window.innerWidth < 992) return;

    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';

        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        const colors = ['#d4af37', '#1e3a8a', '#1d4ed8'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCount);
    });
}

// ===== SCROLL REVEAL =====
function addRevealClass() {
    const elements = document.querySelectorAll(
        '.service-card, .solutions-main, .solutions-item, .solutions-cta, ' +
        '.process-step, .testimonial-card, .about-content, .about-visual, ' +
        '.contact-info, .contact-form-wrapper, .section-header'
    );
    elements.forEach(el => el.classList.add('reveal'));
}

addRevealClass();

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Start counter animation when hero stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// Service card tilt removed for cleaner corporate interaction

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('formName').value;
        const phone = document.getElementById('formPhone').value;
        const email = document.getElementById('formEmail').value;
        const service = document.getElementById('formService').value;
        const message = document.getElementById('formMessage').value;

        // Construct WhatsApp message
        const whatsappMsg = encodeURIComponent(
            `Hello AIMS Management Consultancy,\n\n` +
            `My name is ${name}.\n` +
            `I'm interested in: ${service}\n` +
            `Phone: ${phone}\n` +
            `${email ? 'Email: ' + email + '\n' : ''}` +
            `${message ? '\nProject details:\n' + message : ''}\n\n` +
            `Please contact me regarding consultancy support in Dubai.`
        );

        // Show success state on button
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span>Message Sent! ✓</span>
        `;
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        submitBtn.disabled = true;

        // Open WhatsApp (use same-tab on phones for better reliability)
        const waUrl = `https://wa.me/971585187889?text=${whatsappMsg}`;
        if (window.matchMedia('(max-width: 768px)').matches) {
            window.location.href = waUrl;
        } else {
            window.open(waUrl, '_blank');
        }

        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INPUT FOCUS ANIMATIONS =====
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===== PRELOAD IMAGES =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('AIMS Management Consultancy website loaded successfully.');
console.log('Contact: info@aimsmanagementconsultancy.com | +971 58 518 7889');
