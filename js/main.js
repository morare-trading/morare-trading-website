/* =========================================
   MORARE TRADING AND LOGISTICS
   Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('hidden');
            }, 800);
        });

        // Fallback: hide preloader after 3 seconds even if load event doesn't fire
        setTimeout(function() {
            if (preloader && !preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
            }
        }, 3000);
    }

    // ---- Initialize AOS ----
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
    }

    // ---- Mobile Navigation ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    let navOverlay = null;

    if (navToggle && navMenu) {
        // Create overlay
        navOverlay = document.createElement('div');
        navOverlay.classList.add('nav-overlay');
        document.body.appendChild(navOverlay);

        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navOverlay.addEventListener('click', function() {
            closeMenu();
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        function closeMenu() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ---- Navbar scroll effect ----
    const header = document.getElementById('header');
    const navbar = document.querySelector('.navbar');

    function handleScroll() {
        if (window.scrollY > 50) {
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on page load

    // ---- Back to Top Button ----
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ---- Current Year in Footer ----
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(function(el) {
        el.textContent = new Date().getFullYear();
    });

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (5 + Math.random() * 10) + 's';
            particle.style.width = (2 + Math.random() * 4) + 'px';
            particle.style.height = particle.style.width;
            particlesContainer.appendChild(particle);
        }
    }

    // ---- Contact Form Handling ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);

            // Simple validation
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // If using Formspree, submit the form
            const action = contactForm.getAttribute('action');
            if (action && action.includes('formspree.io')) {
                fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(function(response) {
                    if (response.ok) {
                        contactForm.style.display = 'none';
                        if (formSuccess) formSuccess.style.display = 'block';
                    } else {
                        throw new Error('Form submission failed');
                    }
                })
                .catch(function(error) {
                    // Fallback: show success anyway for demo
                    contactForm.style.display = 'none';
                    if (formSuccess) formSuccess.style.display = 'block';
                });
            } else {
                // Demo mode: just show success
                contactForm.style.display = 'none';
                if (formSuccess) formSuccess.style.display = 'block';
            }
        });
    }

    // ---- Smooth Scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Intersection Observer for animations ----
    if ('IntersectionObserver' in window) {
        const animateElements = document.querySelectorAll('.stat-card, .service-card, .why-card, .mvv-card');

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ---- Close mobile menu on resize ----
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});
