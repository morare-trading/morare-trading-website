/* =========================================
   MORARE TRADING AND LOGISTICS
   Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

    // ---- Preloader Fix (Guaranteed to hide) ----
    const preloader = document.getElementById('preloader');
    
    function hidePreloader() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    }

    // Attempt to hide when page fully loads
    window.addEventListener('load', hidePreloader);
    
    // FAILSAFE: Force hide after 1.5 seconds no matter what
    setTimeout(hidePreloader, 1500);

    // ---- Initialize AOS Animations ----
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            disable: window.innerWidth < 768
        });
    }

    // ---- Mobile Navigation Fixes ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside or on a link
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ---- Navbar Background on Scroll ----
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(26, 26, 110, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // ---- Current Year in Footer ----
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(el => el.textContent = new Date().getFullYear());

    // ---- Formspree AJAX Submission ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Change button text while sending
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none';
                    if (formSuccess) formSuccess.style.display = 'block';
                } else {
                    alert('Oops! There was a problem submitting your form.');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                alert('Network error. Please try again.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }
});
