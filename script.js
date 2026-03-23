/**
 * script.js - Interactive capabilities for the portfolio
 * Includes mobile menu, scroll effects, smooth animations
 */

document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Navigation & Mobile Menu
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');
    const navbar = document.querySelector('.navbar');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent body scrolling when menu is open on mobile
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       Dynamic Footer Year
       ========================================= */
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /* =========================================
       Skills Animation (Intersection Observer)
       ========================================= */
    const skillBars = document.querySelectorAll('.progress');
    
    // Setup observer to trigger animations when scrolled into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // Store the original width
                const targetWidth = el.style.width;
                // Start from 0
                el.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    el.style.transition = 'width 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
                    el.style.width = targetWidth;
                }, 100);
                
                // Stop observing after animating once
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    skillBars.forEach(skill => {
        skillObserver.observe(skill);
    });


    /* =========================================
       Smooth Scrolling for Anchor Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Offset for fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
