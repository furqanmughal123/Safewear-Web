// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navCenter = document.querySelector('.nav-center');

if (hamburger && navCenter) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navCenter.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navCenter.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Animated Counter for Statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (target < 1) {
                    counter.textContent = current.toFixed(2);
                } else if (target < 10) {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.ceil(current);
                }
                setTimeout(updateCounter, 20);
            } else {
                if (target < 1) {
                    counter.textContent = target.toFixed(2);
                } else if (target < 10) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.style.background = '#10b981';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            
            setTimeout(() => {
                submitBtn.style.background = '#fbbf24';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 2000);
    });
}

// Newsletter Signup
const newsletterForm = document.querySelector('.newsletter-signup');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        const submitBtn = newsletterForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }
        
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.style.background = '#10b981';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            
            setTimeout(() => {
                submitBtn.style.background = '#fbbf24';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                newsletterForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Emergency button interaction
const emergencyBtn = document.querySelector('.emergency-btn');
if (emergencyBtn) {
    let pressTimer;
    
    emergencyBtn.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            emergencyBtn.style.transform = 'scale(0.95)';
            emergencyBtn.style.background = 'linear-gradient(135deg, #b91c1c, #991b1b)';
            
            setTimeout(() => {
                alert('Emergency alert would be triggered! (Demo mode)');
                emergencyBtn.style.transform = 'scale(1)';
                emergencyBtn.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
            }, 500);
        }, 3000);
    });
    
    emergencyBtn.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });
    
    emergencyBtn.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });
}

// Floating Emergency Button
const floatingEmergency = document.querySelector('.floating-emergency');
if (floatingEmergency) {
    floatingEmergency.addEventListener('click', () => {
        // Create modal-like alert
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 0 20px;
            animation: slideIn 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="color: #dc2626; font-size: 3rem; margin-bottom: 1rem;">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 style="color: #1f2937; margin-bottom: 1rem;">Emergency Alert Demo</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">
                In a real emergency, this would immediately send your location and alert to emergency contacts and services.
            </p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: #2563eb; color: white; border: none; padding: 0.75rem 2rem; border-radius: 10px; cursor: pointer; font-weight: 600;">
                Close Demo
            </button>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .tech-card, .process-card, .use-case-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hero buttons functionality
const learnMoreBtn = document.querySelector('.btn-primary');
const watchDemoBtn = document.querySelector('.btn-secondary');

if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

if (watchDemoBtn) {
    watchDemoBtn.addEventListener('click', () => {
        alert('Demo video would play here! (Prototype demonstration)');
    });
}

// Enhanced navbar with active section highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
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

window.addEventListener('scroll', updateActiveNavLink);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll progress
    updateScrollProgress();
    
    // Initialize active nav link
    updateActiveNavLink();
    
    console.log('Safe Wear System website loaded successfully! 🛡️');
});

// Add loading state to page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});