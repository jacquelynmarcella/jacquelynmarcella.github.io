document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel.quote');
    const slides = document.querySelectorAll('.carousel.quote [role="tabpanel"]');
    const paginationButtons = document.querySelectorAll('.carousel--pagination-button');
    const prevButton = document.getElementById('carousel-prev');
    const nextButton = document.getElementById('carousel-next');

    // Observer to update UI when slide becomes visible (handles scroll/swipe)
    const observerOptions = {
        root: carousel,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(slides).indexOf(entry.target);
                updateUI(index);
            }
        });
    }, observerOptions);

    slides.forEach(slide => observer.observe(slide));

    function updateUI(index) {
        // Update carousel attribute
        carousel.setAttribute('data-slide-visible', index + 1);

        // Update slides
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('js-active');
                slide.removeAttribute('tabindex');
                slide.removeAttribute('aria-hidden');
            } else {
                slide.classList.remove('js-active');
                slide.setAttribute('tabindex', '-1');
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // Update pagination
        paginationButtons.forEach((button, i) => {
            if (i === index) {
                button.classList.add('js-active');
                button.setAttribute('aria-selected', 'true');
            } else {
                button.classList.remove('js-active');
                button.setAttribute('aria-selected', 'false');
            }
        });
    }

    function scrollToSlide(index) {
        const slide = slides[index];
        // Use scrollTo with left position to support scroll snapping
        // slide.offsetLeft is relative to the offsetParent (carousel)
        carousel.scrollTo({
            left: slide.offsetLeft,
            behavior: 'smooth'
        });
    }

    // Prev button click
    prevButton.addEventListener('click', function () {
        let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('js-active'));
        if (currentIndex === -1) currentIndex = 0;

        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        scrollToSlide(newIndex);
    });

    // Next button click
    nextButton.addEventListener('click', function () {
        let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('js-active'));
        if (currentIndex === -1) currentIndex = 0;

        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        scrollToSlide(newIndex);
    });

    // Pagination button click
    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            scrollToSlide(index);
        });
    });
});
