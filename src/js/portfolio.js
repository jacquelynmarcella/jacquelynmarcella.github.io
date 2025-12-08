document.addEventListener('DOMContentLoaded', function () {

    let colorToggle = document.querySelector(".theme-toggle");
    //On Load
    let colorTheme = document.documentElement.getAttribute('data-theme');
    if (colorTheme == "dark") {
        colorToggle.classList.add("theme-toggle--toggled");
    }

    function setColorMode() {
        let newTheme = document.documentElement.getAttribute('data-theme') == "dark" ? "light" : "dark";
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('jm-color-mode', newTheme);
        if (colorToggle) {
            if (newTheme === "dark") {
                colorToggle.classList.add("theme-toggle--toggled");
            } else {
                colorToggle.classList.remove("theme-toggle--toggled");
            }
        }
    }

    let hasClicked = false;

    if (colorToggle) {
        colorToggle.addEventListener("click", function () {
            hasClicked = true;
            setColorMode();
        });

        colorToggle.addEventListener('mouseenter', () => {
            hasClicked = false;
            colorToggle.classList.toggle('theme-toggle--toggled');
        });

        colorToggle.addEventListener('mouseleave', () => {
            if (!hasClicked) {
                colorToggle.classList.toggle('theme-toggle--toggled');
            }
        });
    }


    let navbarToggle = document.getElementById("navbar--toggle");
    let navbarDropdown = document.getElementById("navbar--dropdown");
    let navBarLinks = document.querySelectorAll(".navbar a");

    if (navbarToggle) {
        navbarToggle.addEventListener("click", function () {
            if (window.innerWidth <= 800) {
                if (navbarDropdown.classList.contains("js-open")) {
                    navbarDropdown.classList.remove("js-open");
                    navbarDropdown.classList.add("js-closed");
                    navbarToggle.setAttribute("aria-expanded", "false");
                    navbarToggle.classList.remove("is-active");
                    document.body.classList.remove("js-nav-open");
                } else {
                    navbarDropdown.classList.remove("js-closed");
                    navbarDropdown.classList.add("js-open");
                    navbarToggle.setAttribute("aria-expanded", "true");
                    navbarToggle.classList.add("is-active");
                    document.body.classList.add("js-nav-open");
                }
            }
        });
    }

    function moveThemeToggle() {
        const themeToggleBtn = document.querySelector('.theme-toggle');
        const mobileContainer = document.querySelector('.mobile.theme-toggle--container');
        const desktopContainer = document.querySelector('.desktop.theme-toggle--container');

        if (themeToggleBtn) {
            if (window.innerWidth <= 800) {
                if (mobileContainer && !mobileContainer.contains(themeToggleBtn)) {
                    mobileContainer.appendChild(themeToggleBtn);
                }
            } else {
                if (desktopContainer && !desktopContainer.contains(themeToggleBtn)) {
                    desktopContainer.appendChild(themeToggleBtn);
                }
            }
        }
    }

    navBarLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (navbarDropdown) {
                navbarDropdown.classList.remove("js-open");
                navbarDropdown.classList.add("js-closed");
                navbarToggle.setAttribute("aria-expanded", "false");
                navbarToggle.classList.remove("is-active");
                document.body.classList.remove("js-nav-open");
            }
            if (navbarToggle) {
                navbarToggle.setAttribute("aria-expanded", "false");
            }
            document.body.classList.remove("js-nav-open");
        });
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            if (navbarDropdown) {
                navbarDropdown.classList.remove("js-open");
                navbarDropdown.classList.add("js-closed");
                navbarToggle.classList.remove("is-active");
            }
            if (navbarToggle) {
                navbarToggle.setAttribute("aria-expanded", "false");
            }
            document.body.classList.remove("js-nav-open");
        }
        moveThemeToggle();
    });

    // Initial check
    moveThemeToggle();

    const motionAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (motionAllowed) {
        const projectSection = document.querySelectorAll('.projects-section .tile-grid > li, .article-body figure, #carousel-slide-1 blockquote');
        if (projectSection) {
            projectSection.forEach(section => {
                section.classList.add('js-animate');
                window.addEventListener('scroll', () => {
                    const rect = section.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const triggerPoint = windowHeight * 0.90;
                    if (rect.top < triggerPoint) {
                        section.classList.add('js-fade-in');
                    }
                });
            })
        }
        // const highlight = document.querySelectorAll('.article-body .highlight');
        // if (highlight.length > 0) {
        //     highlight.forEach(b => {
        //         window.addEventListener('scroll', () => {
        //             const rect = b.getBoundingClientRect();
        //             const windowHeight = window.innerHeight;
        //             const triggerPoint = windowHeight * 0.66;
        //             if (rect.top < triggerPoint) {
        //                 b.classList.add('js-active');
        //             }
        //         });

        //     });
        // }

        /* Move to projects */
        let stats = gsap.utils.toArray(".stats--number");
        if (stats.length > 0) {
            ScrollTrigger.batch(stats, {
                onEnter: batch => {
                    gsap.from(batch, {
                        scale: .75,
                        delay: .25,
                        duration: .5,
                        // opacity: .75,
                        transformOrigin: "left bottom",
                        stagger: 0.5, // This will stagger the animations even if they are triggered at the same time
                    });
                },
            });
        }


        // A11y block links - ensure clicking on <a> tag clicks entire element
        // https://css-tricks.com/block-links-the-search-for-a-perfect-solution/
        const cards = document.querySelectorAll(".projects-section .tile-grid li");
        const cardLinks = document.querySelectorAll('.tile-content a');

        function handleCardClick(event) {
            const isTextSelected = window.getSelection().toString();
            if (!isTextSelected) {
                event.currentTarget.querySelector('a').click();
            }
        }
        cards.forEach(card => {
            card.addEventListener("click", handleCardClick);
        });

        cardLinks.forEach(link => {
            link.addEventListener("click", (e) => e.stopPropagation());
        });


        // Fix GSAP issue
        ScrollTrigger.refresh();

    }
});