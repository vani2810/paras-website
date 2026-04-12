// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Fade In Animation on Scroll
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

// Observe elements for animation
document.querySelectorAll('.about, .services, .gallery, .testimonials, .contact, .faq, .service-card, .feature-item, .testimonial-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Gallery Filter
const categoryBtns = document.querySelectorAll('.category-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter gallery items
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.opacity = '1';
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const projectTypeSelect = document.getElementById('projectType');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validation
    let isValid = true;
    const errors = {};

    // Name validation
    if (!nameInput.value.trim()) {
        errors.name = 'Name is required';
        isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value.trim())) {
        errors.phone = 'Valid phone number is required (10 digits starting with 6-9)';
        isValid = false;
    }

    // Project type validation
    if (!projectTypeSelect.value) {
        errors.projectType = 'Please select project type';
        isValid = false;
    }

    // Message validation
    if (!messageInput.value.trim()) {
        errors.message = 'Message is required';
        isValid = false;
    }

    // Show errors or submit
    if (isValid) {
        // Simulate form submission
        alert('Thank you! Your message has been sent. We will contact you soon.');
        contactForm.reset();
    } else {
        // Show validation errors
        Object.keys(errors).forEach(key => {
            const input = document.getElementById(key);
            input.style.borderColor = '#e74c3c';
            setTimeout(() => {
                input.style.borderColor = '#e8e8e8';
            }, 3000);
        });
        alert('Please fill all fields correctly.');
    }
});

// Real-time form validation
[nameInput, phoneInput, projectTypeSelect, messageInput].forEach(input => {
    input.addEventListener('blur', () => {
        input.style.borderColor = '#e8e8e8';
    });
    
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            input.style.borderColor = '#d4a574';
        }
    });
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Testimonials Auto Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function nextTestimonial() {
    testimonials.forEach(t => t.style.opacity = '0.5');
    testimonials[currentTestimonial].style.opacity = '1';
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

setInterval(nextTestimonial, 5000);

// WhatsApp floating button (already in HTML but enhanced)
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const message = `Hi, I'm interested in your services for ${projectTypeSelect.value || 'a project'}.`;
        const url = `https://wa.me/919623750228?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

// Preloader (Optional - remove if not needed)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
