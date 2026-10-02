/* =========================================
   MORARE TRADING AND LOGISTICS
   Main JavaScript
   ========================================= */

document.addEventListener('DOMContentLoaded', function() {

    // ---- Preloader Fix ----
    const preloader = document.getElementById('preloader');
    function hidePreloader() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }
    }
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 1500);

    // ---- Initialize AOS Animations ----
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 50, disable: window.innerWidth < 768 });
    }

    // ---- Mobile Navigation ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => { navToggle.classList.remove('active'); navMenu.classList.remove('active'); });
        });
    }

    // ---- Navbar Background on Scroll ----
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { navbar.style.boxShadow = '0 4px 6px -1px rgba(26, 26, 110, 0.1)'; } 
        else { navbar.style.boxShadow = 'none'; }
    });

    // ---- Current Year ----
    document.querySelectorAll('#currentYear').forEach(el => el.textContent = new Date().getFullYear());

    // ---- Interactive Quote Slider ----
    const tonnageSlider = document.getElementById('tonnageSlider');
    const tonnageDisplay = document.getElementById('tonnageDisplay');
    
    if (tonnageSlider && tonnageDisplay) {
        tonnageSlider.addEventListener('input', function() {
            let value = Number(this.value).toLocaleString();
            if (this.value == 50000) { value = "50,000+"; }
            tonnageDisplay.textContent = value + " Tons";
        });
    }

    // ---- Formspree AJAX Submission ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            fetch(contactForm.action, {
                method: 'POST', body: formData, headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    contactForm.style.display = 'none';
                    if (formSuccess) formSuccess.style.display = 'block';
                } else {
                    alert('Oops! There was a problem submitting your form.');
                    submitBtn.innerHTML = originalBtnText; submitBtn.disabled = false;
                }
            })
            .catch(error => {
                alert('Network error. Please try again.');
                submitBtn.innerHTML = originalBtnText; submitBtn.disabled = false;
            });
        });
    }
});
