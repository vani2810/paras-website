// DOM Elements
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const faqItems = document.querySelectorAll('.faq-item');
const contactForm = document.getElementById('contact-form');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);

    // Navbar scroll
    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);

    // Smooth scroll
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));

    // Active nav link
    window.addEventListener('scroll', handleActiveNav);

    // FAQ toggle
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Contact form
    contactForm.addEventListener('submit', handleContactForm);

    // Scroll animations
    window.addEventListener('scroll', handleScrollAnimations);

    // Back to top
    createBackToTop();
});

// Navbar scroll effect
function handleNavbarScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
}

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Smooth scrolling
function smoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const offsetTop = target.offsetTop - 80;
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
    
    toggleMobileMenu();
}

// Active nav link
function handleActiveNav() {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

// Scroll animations
function handleScrollAnimations() {
    document.querySelectorAll('.fade-in-up').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
}

// Contact form
function handleContactForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const original = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you! We will contact you within 24 hours on your phone number.');
        e.target.reset();
        btn.innerHTML = original;
        btn.disabled = false;
    }, 2000);
}

// Back to top button
function createBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 500);
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
