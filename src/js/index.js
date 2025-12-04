document.addEventListener('DOMContentLoaded', function () {

    const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (motionAllowed) {

        // Header - sticky and code animation timing
        const headerContainer = document.querySelector('.header--hero');
        const headerCode = document.querySelector('.header--hero code');
        const stickyHeader = document.getElementById('sticky-header');
        const main = document.querySelector('main');
        window.addEventListener('scroll', () => {
            if (!stickyHeader) return;
            let headerHeight = stickyHeader.offsetHeight;
            let codeHeight = headerCode.getBoundingClientRect();
            let codeTop = codeHeight.top;
            let mainPos = main.getBoundingClientRect();
            let mainTop = mainPos.top;
            // Typing effect
            if (codeTop > 0 && codeTop <= mainTop) {
                headerContainer.classList.add("js-typing");
            } else {
                headerContainer.classList.remove("js-typing");
            }
            // Sticky header 
            if (window.scrollY > 1) {
                headerContainer.classList.add('js-sticky');
                // 2.5x header height is how we compute 100% translate
                let percentage = window.scrollY / (headerHeight * 2);
                percentage = Math.min(1, Math.max(0, percentage));
                headerContainer.style.setProperty('--stickyHeaderPosition', (percentage * 100) + '%');
                // Update opacity from 1 to 0.75
                let opacity = 1 - (percentage * 0.75);
                headerContainer.style.setProperty('--stickyHeaderOpacity', opacity);

            } else {
                headerContainer.classList.remove('js-sticky');
                headerContainer.style.removeProperty('--stickyHeaderPosition');
                headerContainer.style.removeProperty('--stickyHeaderOpacity');
            }
        });

        // Skills - bounce in tag set on scroll
        const tagSet = gsap.utils.toArray("ul.tags");
        tagSet.forEach(tagSet => {
            let tags = gsap.utils.toArray(tagSet.querySelectorAll("li"));
            ScrollTrigger.batch(tags, {
                onEnter: batch => {
                    gsap.from(batch, {
                        y: "1em",
                        duration: .33,
                        stagger: 0.15, // This will stagger the animations even if they are triggered at the same time
                    });
                },
            });
        });






        // Timeline progress bar animation
        const timelineProgress = document.querySelector('.timeline--progress');
        const timelineItems = document.querySelectorAll('.timeline--item:not(.timeline--current-role) .timeline--text-container');
        const progressBar = document.querySelector('.timeline--progress-bar');
        const polaroid = document.querySelector('.polaroid--2');

        function updateTimelineProgress() {
            if (!timelineProgress || !progressBar) return;
            const rect = timelineProgress.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calculate the target position (75% down the viewport)
            const targetY = windowHeight * 0.75;
            // Calculate the height of the bar needed to reach the target position
            const height = targetY - rect.top;
            let percentage = (height / rect.height) * 100;
            percentage = Math.max(0, Math.min(100, percentage));
            if (polaroid) {
                const delay = 25;
                let opacity = (percentage - delay) / (100 - delay);
                opacity = Math.max(0, Math.min(1, opacity));
                polaroid.style.setProperty('--polaroidOpacity', opacity);
            }
            percentage = (percentage < 10) ? 10 : percentage;
            progressBar.style.setProperty('--timelineProgressHeight', percentage + '%');
        }
        if (timelineProgress && progressBar) {
            window.addEventListener('scroll', updateTimelineProgress);
            window.addEventListener('resize', updateTimelineProgress);
            updateTimelineProgress();
        }

        function updateTimelineItems() {
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.75;
            timelineItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                if (rect.top < triggerPoint) {
                    item.classList.add('js-active');
                } else {
                    item.classList.remove('js-active');
                }
            });
        }

        if (timelineItems.length > 0) {
            window.addEventListener('scroll', updateTimelineItems);
            window.addEventListener('resize', updateTimelineItems);
            updateTimelineItems();
        }

    }

    // Experience - open/close on mobile
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

    // Carousel recommendations slider controls
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
