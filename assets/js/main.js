/**
 * QU QR Reader - Website JavaScript
 * Minimal JavaScript for enhanced user experience
 */

(function() {
    'use strict';

    // ==================== SMOOTH SCROLLING ==================== 
    function initSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==================== NAVBAR BACKGROUND ==================== 
    function initNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            function updateNavbar() {
                if (window.scrollY > 50) {
                    navbar.classList.add('bg-white', 'shadow-sm');
                    navbar.classList.remove('bg-transparent');
                } else {
                    navbar.classList.remove('bg-white', 'shadow-sm');
                    navbar.classList.add('bg-transparent');
                }
            }

            // Update on scroll
            window.addEventListener('scroll', updateNavbar);
            
            // Initial check
            updateNavbar();
        }
    }

    // ==================== SCROLL ANIMATIONS ==================== 
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe cards and sections
        document.querySelectorAll('.card, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    // ==================== COPY TO CLIPBOARD ==================== 
    function initCopyButtons() {
        // Add copy functionality for email addresses
        document.querySelectorAll('[href^="mailto:"]').forEach(emailLink => {
            emailLink.addEventListener('click', function(e) {
                const email = this.textContent.trim();
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        showToast('Email address copied: ' + email);
                    }).catch(() => {
                        // Fallback for older browsers
                        copyToClipboardFallback(email);
                    });
                } else {
                    copyToClipboardFallback(email);
                }
            });
        });
    }

    // Fallback copy function for older browsers
    function copyToClipboardFallback(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Email address copied: ' + text);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    // ==================== TOAST NOTIFICATIONS ==================== 
    function showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `custom-toast alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed`;
        toast.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            border-radius: 0.75rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, 4000);
    }

    // ==================== FORM HANDLING ==================== 
    function initFormHandling() {
        // Handle any contact forms (future enhancement)
        const contactForms = document.querySelectorAll('.contact-form');
        
        contactForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('is-invalid');
                    } else {
                        field.classList.remove('is-invalid');
                    }
                });
                
                if (isValid) {
                    showToast('Message sent! We will contact you shortly.');
                    form.reset();
                } else {
                    showToast('Please fill in all required fields.', 'error');
                }
            });
        });
    }

    // ==================== KEYBOARD NAVIGATION ==================== 
    function initKeyboardNavigation() {
        // Improve keyboard navigation for accordions
        document.querySelectorAll('.accordion-button').forEach(button => {
            button.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // ==================== MOBILE MENU ==================== 
    function initMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // Close mobile menu when clicking on a link
            navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        hide: true
                    });
                });
            });
        }
    }

    // ==================== SCROLL TO TOP ==================== 
    function initScrollToTop() {
        // Create scroll to top button
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
        scrollBtn.className = 'btn btn-primary position-fixed';
        scrollBtn.id = 'scrollToTop';
        scrollBtn.style.cssText = `
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0,122,255,0.3);
        `;
        
        document.body.appendChild(scrollBtn);
        
        // Show/hide scroll button
        function toggleScrollButton() {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        }
        
        window.addEventListener('scroll', toggleScrollButton);
        
        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== PERFORMANCE MONITORING ==================== 
    function initPerformanceMonitoring() {
        // Basic performance monitoring
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log('Page load time:', loadTime + 'ms');
                
                // If load time is too slow, show a gentle notification
                if (loadTime > 3000) {
                    console.log('Slow loading detected. Consider optimizing assets.');
                }
            }
        });
    }

    // ==================== ERROR HANDLING ==================== 
    function initErrorHandling() {
        // Global error handler
        window.addEventListener('error', function(e) {
            console.error('JavaScript error:', e.error);
            // In production, you might want to send this to a logging service
        });

        // Handle offline/online status
        window.addEventListener('offline', () => {
            showToast('Internet connection lost. Some functions may be unavailable.', 'error');
        });

        window.addEventListener('online', () => {
            showToast('Internet connection restored.');
        });
    }

    // ==================== ACCESSIBILITY ENHANCEMENTS ==================== 
    function initAccessibility() {
        // Skip link for keyboard users
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'visually-hidden-focusable position-absolute';
        skipLink.style.cssText = `
            top: 10px;
            left: 10px;
            z-index: 10000;
            background: var(--primary-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            text-decoration: none;
        `;
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Announce page changes to screen readers
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'visually-hidden';
        document.body.appendChild(announcer);
    }

    // ==================== INITIALIZATION ==================== 
    function init() {
        // Check if Bootstrap is loaded
        if (typeof bootstrap === 'undefined') {
            console.warn('Bootstrap JavaScript not loaded');
            return;
        }

        // Initialize all modules
        initSmoothScrolling();
        initNavbarScrollEffect();
        initScrollAnimations();
        initCopyButtons();
        initFormHandling();
        initKeyboardNavigation();
        initMobileMenu();
        initScrollToTop();
        initPerformanceMonitoring();
        initErrorHandling();
        initAccessibility();

        console.log('QU QR Reader website initialized successfully');
    }

    // ==================== DOM READY ==================== 
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ==================== UTILS (Global) ==================== 
    // Make some functions globally available
    window.QUWebsite = {
        showToast: showToast,
        version: '1.0.0'
    };

})();