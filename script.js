// DOM Elements
const preloader = document.getElementById('preloader');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const statsNumbers = document.querySelectorAll('.stat-number');
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 1500);

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Active nav link on scroll
    window.addEventListener('scroll', handleActiveNavLink);

    // Stats counter animation
    window.addEventListener('scroll', handleStatsAnimation);

    // Testimonial slider
    let currentTestimonial = 0;
    prevBtn.addEventListener('click', () => changeTestimonial(-1));
    nextBtn.addEventListener('click', () => changeTestimonial(1));
    setInterval(() => changeTestimonial(1), 8000);

    // Gallery filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', handleGalleryFilter);
    });

    // Contact form
    contactForm.addEventListener('submit', handleContactForm);

    // Newsletter form
    newsletterForm.addEventListener('submit', handleNewsletterForm);

    // Scroll animations
    window.addEventListener('scroll', handleScrollAnimations);

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});

// Navbar scroll effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// Close mobile menu
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Smooth scrolling
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const targetPosition = targetSection.offsetTop - 80;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        closeMobileMenu();
    }
}

// Active nav link on scroll
function handleActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Stats counter animation
function handleStatsAnimation() {
    const statsSection = document.querySelector('.stats');
    const statsTop = statsSection.offsetTop;
    const statsBottom = statsTop + statsSection.clientHeight;
    
    if (window.scrollY > statsTop - window.innerHeight / 2) {
        statsNumbers.forEach(stat => animateStats(stat));
        window.removeEventListener('scroll', handleStatsAnimation);
    }
}

function animateStats(stat) {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 200;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            stat.textContent = target + '+';
            clearInterval(timer);
        } else {
            stat.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Testimonial slider
function changeTestimonial(direction) {
    testimonials.forEach(test => test.classList.remove('active'));
    
    currentTestimonial += direction;
    if (currentTestimonial >= testimonials.length) currentTestimonial = 0;
    if (currentTestimonial < 0) currentTestimonial = testimonials.length - 1;
    
    testimonials[currentTestimonial].classList.add('active');
}

// Gallery filter
function handleGalleryFilter(e) {
    const filterValue = e.target.getAttribute('data-filter');
    
    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('fade-in-up'), 100);
        } else {
            item.style.display = 'none';
        }
    });
}

// Contact form handler
function handleContactForm(e) {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = e.target.querySelector('.contact-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you! Your message has been sent. We\'ll get back to you within 24 hours.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Newsletter form handler
function handleNewsletterForm(e) {
    e.preventDefault();
    
    const emailInput = e.target.querySelector('input[type="email"]');
    const btn = e.target.querySelector('.newsletter-btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
}

// Scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Back to top button (optional enhancement)
function createBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-gold);
        color: var(--dark);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(btn);
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
}

// Initialize back to top
createBackToTop();

// Prevent body scroll when mobile menu is open
document.body.addEventListener('touchmove', (e) => {
    if (document.body.classList.contains('menu-open')) {
        e.preventDefault();
    }
}, { passive: false });

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
