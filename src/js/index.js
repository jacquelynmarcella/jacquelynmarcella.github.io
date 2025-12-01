document.addEventListener('DOMContentLoaded', function () {

    // Define a function to get and log the element's height
    const headerContainer = document.querySelector('.header--hero');
    let headerContentHeight = 500; //default value

    function getHeaderHeight() {
        let stickyHeader = document.getElementById('sticky-header');
        if (stickyHeader) {
            let headerHeight = stickyHeader.offsetHeight;
            headerContentHeight = headerHeight;
            let tripleHeight = headerHeight * 3;
            headerContainer.classList.add('js-sticky');
            headerContainer.style.setProperty('--headerContainerHeight', tripleHeight + 'px');
            headerContainer.style.setProperty('--headerContentHeight', headerHeight + 'px');
        }
    }
    // Add an event listener to the window for the 'resize' event
    window.addEventListener('resize', getHeaderHeight);
    getHeaderHeight();

    window.addEventListener('scroll', () => {
        if (window.scrollY <= (headerContentHeight * .90)) {
            headerContainer.classList.add("js-typing");
        } else {
            headerContainer.classList.remove("js-typing");
        }
        if (window.scrollY <= 0) {
            headerContainer.classList.remove("js-animate");
        } else {
            headerContainer.classList.add("js-animate");
        }
    });


    let timelineItem = document.querySelectorAll('#timeline li');
    let timelineToggle = document.querySelector("#timeline--toggle");
    let timeline = document.querySelector("#timeline");

    if (timelineToggle) {
        timelineToggle.addEventListener("click", function () {
            if (timeline.classList.contains("js-mobile-collapsed")) {
                timeline.classList.remove("js-mobile-collapsed");
                timeline.classList.add("js-mobile-open");
            } else {
                timeline.classList.add("js-mobile-collapsed");
                timeline.classList.remove("js-mobile-open");
            }
        });
    }

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
        carousel.setAttribute('data-slide-visible', index + 1);

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

    prevButton.addEventListener('click', function () {
        let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('js-active'));
        if (currentIndex === -1) currentIndex = 0;

        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = slides.length - 1;
        }
        scrollToSlide(newIndex);
    });

    nextButton.addEventListener('click', function () {
        let currentIndex = Array.from(slides).findIndex(slide => slide.classList.contains('js-active'));
        if (currentIndex === -1) currentIndex = 0;

        let newIndex = currentIndex + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        scrollToSlide(newIndex);
    });

    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', function () {
            scrollToSlide(index);
        });
    });
});
