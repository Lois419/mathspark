document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('testimonial-scroll-container');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const backToTopButton = document.getElementById('back-to-top');

    let scrollInterval;
    const scrollAmount = 300; // Adjust this value to control scroll distance
    const scrollSpeed = 3000; // Adjust this value to control auto-scroll speed (milliseconds)
    const scrollVisibilityThreshold = 200; // Pixels to scroll down before showing the button

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

    // Back to Top Button functionality
    const toggleBackToTopButton = () => {
        if (window.scrollY > scrollVisibilityThreshold) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Initial check for back to top button visibility on page load
    toggleBackToTopButton();
});
