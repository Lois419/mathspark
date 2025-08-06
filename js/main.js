document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('testimonial-scroll-container');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const backToTopButton = document.getElementById('back-to-top');
    const currentYearSpan = document.getElementById('current-year');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');

    // Set the current year in the footer
    const currentYear = new Date().getFullYear();
    if (currentYearSpan) {
        currentYearSpan.textContent = currentYear;
    }

    // Testimonial auto-scroll and manual controls (only on index page)
    if (scrollContainer && prevButton && nextButton) {
        let scrollInterval;
        const scrollAmount = 300; // Adjust this value to control scroll distance
        const scrollSpeed = 3000; // Adjust this value to control auto-scroll speed (milliseconds)

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                // Scroll to the right
                scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });

                // If scrolled to the end, reset to the beginning
                if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
                    scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }, scrollSpeed);
        };

        const stopAutoScroll = () => {
            clearInterval(scrollInterval);
        };

        // Start auto-scrolling when the page loads
        startAutoScroll();

        // Manual scrolling with buttons
        prevButton.addEventListener('click', () => {
            stopAutoScroll(); // Stop auto-scroll on manual interaction
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            resetInactivityTimer(); // Reset inactivity timer
        });

        nextButton.addEventListener('click', () => {
            stopAutoScroll(); // Stop auto-scroll on manual interaction
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            resetInactivityTimer(); // Reset inactivity timer
        });

        // Optional: Resume auto-scrolling after a period of inactivity
        let inactivityTimer;
        const resetInactivityTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(startAutoScroll, 10000); // Resume after 10 seconds of inactivity
        };

        scrollContainer.addEventListener('scroll', () => {
            resetInactivityTimer();
        });

        prevButton.addEventListener('click', () => {
            resetInactivityTimer();
        });

        nextButton.addEventListener('click', () => {
            resetInactivityTimer();
        });
    }

    // Back to Top Button functionality (on both pages)
    if (backToTopButton) {
        const scrollVisibilityThreshold = 200; // Pixels to scroll down before showing the button

        const toggleBackToTopButton = () => {
            if (window.scrollY > scrollVisibilityThreshold) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', toggleBackToTopButton);

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Initial check for back to top button visibility on page load
        toggleBackToTopButton();
    }

    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('login-form');
        const passwordInput = document.getElementById('password');
        const loginBtn = document.querySelector('.login-btn');
    
        // Set button to disabled by default
        if (loginBtn) {
            loginBtn.disabled = true;
        }
    
        // Listen for strength changes (if strength bar is updated in real-time)
        passwordInput.addEventListener('input', () => {
            const strength = parseInt(passwordInput.dataset.strength || '0', 10);
            if (strength >= 80) {
                loginBtn.disabled = false;
            } else {
                loginBtn.disabled = true;
            }
        });
    
        // Prevent form submission if password too weak (extra layer of safety)
        if (loginForm && passwordInput) {
            loginForm.addEventListener('submit', function (event) {
                const passwordStrength = parseInt(passwordInput.dataset.strength || '0', 10);
                if (passwordStrength < 80) {
                    event.preventDefault();
                    alert('Password strength must be at least 80% to log in.');
                }
            });
        }
    });    

    const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('toggle-password');
const strengthBar = document.querySelector('.strength-bar');
const loginBtn = document.querySelector('.login-btn');

if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const isVisible = passwordInput.type === 'text';
        passwordInput.type = isVisible ? 'password' : 'text';
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
}

passwordInput.addEventListener('input', function () {
    const password = this.value;
    let strength = 0;

    const criteriaMet = {
        length: password.length >= 8 && password.length <= 16,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^a-zA-Z0-9]/.test(password),
    };

    if (criteriaMet.length && criteriaMet.lowercase && criteriaMet.uppercase && criteriaMet.number && criteriaMet.special) {
        strength += 25;
        strength += 15;
        strength += 15;
        strength += 15;
        strength += 30;
        if (password.length > 12) strength += 10;
        if (password.length > 14) strength += 5;
    } else {
        strength = 0;
    }

    strength = Math.min(strength, 100);
    passwordInput.dataset.strength = strength;

    if (strengthBar) {
        strengthBar.style.width = strength + '%';
        strengthBar.style.backgroundColor =
            strength < 50 ? 'red' : strength < 80 ? 'orange' : 'green';
    }

    // Enable/disable login button
    if (loginBtn) {
        loginBtn.disabled = strength < 80;
    }
});
