document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');

    if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', function () {
            const password = this.value;
            let strength = 0;
            const criteriaMet = {
                length: false,
                lowercase: false,
                uppercase: false,
                number: false,
                special: false
            };

            // Check required criteria
            criteriaMet.length = password.length >= 8 && password.length <= 16;
            criteriaMet.lowercase = /[a-z]/.test(password);
            criteriaMet.uppercase = /[A-Z]/.test(password);
            criteriaMet.number = /[0-9]/.test(password);
            criteriaMet.special = /[^a-zA-Z0-9]/.test(password);

            // Calculate strength only if all required criteria are met
            if (criteriaMet.length && criteriaMet.lowercase && criteriaMet.uppercase && criteriaMet.number && criteriaMet.special) {
                // Recalculate strength based on criteria met (can adjust point values if needed)
                strength += 25; // Length
                strength += 15; // Lowercase
                strength += 15; // Uppercase
                strength += 15; // Number
                strength += 30; // Special character

                 // Further increase strength for more complex passwords (optional)
                if (password.length > 12) {
                    strength += 10; 
                }
                if (password.length > 14) {
                    strength += 5;
                }

            } else {
                strength = 0; // Set strength to 0 if any required criteria are not met
            }

            // Cap strength at 100
            strength = Math.min(strength, 100);

            // Update the strength bar
            strengthBar.style.width = strength + '%';

            // Change color based on strength
            if (strength < 50) {
                strengthBar.style.backgroundColor = 'red';
            } else if (strength < 80) {
                strengthBar.style.backgroundColor = 'orange';
            } else {
                strengthBar.style.backgroundColor = 'green';
            }

            // Store strength in a data attribute for main.js
            passwordInput.dataset.strength = strength;
        });
    }
});