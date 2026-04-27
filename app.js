// ============================================
// WASAY KHAN 001 - FULL STACK DEVELOPER PORTFOLIO
// Advanced Interactive Features
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');

// Mobile Menu Toggle
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

menuToggle.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});

// Update active navigation on scroll
function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Advanced scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .project-card, .stat, .about-text').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    if (scrollPosition < window.innerHeight) {
        const translateY = scrollPosition * 0.3;
        const scale = 1 + scrollPosition * 0.0005;
        hero.style.transform = `translateY(${translateY}px) scale(${scale})`;
    }
});

// Counter animation for stats
const statNumbers = document.querySelectorAll('.stat-number');
let countersTriggered = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
            animateCounters();
            entry.target.setAttribute('data-counted', 'true');
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat.closest('.stat'));
});

function animateCounters() {
    if (countersTriggered) return;
    countersTriggered = true;

    statNumbers.forEach(statEl => {
        const target = parseInt(statEl.textContent.replace(/[^\d]/g, ''));
        const suffix = statEl.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000; // 2 seconds
        const step = duration / (target / increment);

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                statEl.textContent = target + suffix;
                clearInterval(counter);
            } else {
                statEl.textContent = Math.floor(current) + suffix;
            }
        }, step);
    });
}

// Enhanced ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    });
});

// Contact form handling with enhanced UX
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Create mailto link with form data
        const mailtoLink = `mailto:wasay.adnan15431@gamil.com?subject=${encodeURIComponent('Portfolio Contact: ' + formData.subject)}&body=${encodeURIComponent(`From: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Enhanced success feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;">✓ Message Sent!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        submitBtn.disabled = true;

        // Reset form
        contactForm.reset();

        // Reset button after 4 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 4000);
    });
}

// Typing effect for hero role
const roleElement = document.querySelector('.role');
const roles = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentRole = roles[roleIndex];
    const displayText = isDeleting
        ? currentRole.substring(0, charIndex--)
        : currentRole.substring(0, charIndex++);

    roleElement.textContent = displayText;

    if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(typeWriter, typingSpeed);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeWriter, 2000);
});

// Mouse movement parallax for particles
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Performance optimization - lazy load images if any
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

// Observe any lazy images (if added later)
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Prevent form submission on enter for better UX
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = input.closest('form');
            if (form) {
                const inputs = Array.from(form.querySelectorAll('input, textarea'));
                const currentIndex = inputs.indexOf(input);
                const nextInput = inputs[currentIndex + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Wasay Khan 001 Portfolio Loaded - Extreme Professional Edition');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelector('.hero-content').style.animation = 'slideDown 1s ease';
    }, 300);

    // Add loading class removal
    document.body.classList.add('loaded');
});

// Add CSS for loaded state
const loadStyle = document.createElement('style');
loadStyle.textContent = `
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
    }

    body.menu-open {
        overflow: hidden;
    }

    @media (max-width: 768px) {
        body.menu-open::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            z-index: 999;
        }
    }
`;
document.head.appendChild(loadStyle);
console.log('💻 Full Stack Developer | Building Amazing Web Experiences');