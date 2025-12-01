let colorToggle = document.querySelectorAll(".theme-toggle");
let drawerToggle = document.querySelector(".drawer--toggle");
let drawerContainer = document.querySelector(".drawer--container");
//TODO - remove lorde-icon triggers for prefers reduced motion
// Need fallbacks for browser dark settings
//On Load
let isDark = localStorage.getItem('jm-color-mode');
if (isDark == "dark") {
    document.body.classList.add("dark");
    colorToggle.forEach(function (toggle) {
        toggle.classList.add("theme-toggle--toggled");
    });
}

function setColorMode() {
    if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark");
        localStorage.setItem('jm-color-mode', "dark");
        colorToggle.forEach(function (toggle) {
            toggle.classList.add("theme-toggle--toggled");
        });
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem('jm-color-mode', "light");
        colorToggle.forEach(function (toggle) {
            toggle.classList.remove("theme-toggle--toggled");
        });
    }
}

colorToggle.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
        setColorMode();
    });
});



// Define a function to get and log the element's height
const headerContainer = document.querySelector('.header--hero');
let headerContentHeight = 500; //default value

function getHeaderHeight() {
    let stickyHeader = document.getElementById('sticky-header');
    let headerHeight = stickyHeader.offsetHeight;
    headerContentHeight = headerHeight;
    let tripleHeight = headerHeight * 3;
    headerContainer.classList.add('js-sticky');
    headerContainer.style.setProperty('--headerContainerHeight', tripleHeight + 'px');
    headerContainer.style.setProperty('--headerContentHeight', headerHeight + 'px');
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
    }
    else {
        headerContainer.classList.add("js-animate");
    }
});

let timelineItem = document.querySelectorAll('#timeline li'); // Replace with your element's ID
let timelineToggle = document.querySelector("#timeline--toggle");
let timeline = document.querySelector("#timeline");

timelineToggle.addEventListener("click", function () {
    if (timeline.classList.contains("js-mobile-collapsed")) {
        timeline.classList.remove("js-mobile-collapsed");
        timeline.classList.add("js-mobile-open");
    } else {
        timeline.classList.add("js-mobile-collapsed");
        timeline.classList.remove("js-mobile-open");
    }
});


const timelineOptions = {
    rootMargin: '-20% 0px -20% 0px', // Trigger when element is in the middle 60% of the viewport
    threshold: 0
};
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('js-active');
            entry.target.playerInstance.play();
        } else {
            entry.target.classList.remove('js-active');
            entry.target.playerInstance.pause();
        }
    });
}, timelineOptions);
Array.from(timelineItem).forEach(function (item, index) {
    let icon = item.querySelector("lord-icon");
    icon.addEventListener("ready", () => {
        timelineObserver.observe(icon);
    });
});

let navbarToggle = document.getElementById("navbar--toggle");
let navbarDropdown = document.getElementById("navbar--dropdown");

navbarToggle.addEventListener("click", function () {
    if (window.innerWidth <= 800) {
        if (navbarDropdown.classList.contains("js-open")) {
            navbarDropdown.classList.remove("js-open");
            navbarDropdown.classList.add("js-closed");
            navbarToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("js-nav-open");
        } else {
            navbarDropdown.classList.remove("js-closed");
            navbarDropdown.classList.add("js-open");
            navbarToggle.setAttribute("aria-expanded", "true");
            document.body.classList.add("js-nav-open");
        }
    }
});

function moveThemeToggle() {
    const themeToggleBtn = document.querySelector('.theme-toggle');
    const mobileContainer = document.querySelector('.mobile-only.theme-toggle--container');
    const desktopContainer = document.querySelector('.no-mobile.theme-toggle--container');

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

window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
        navbarDropdown.classList.remove("js-open");
        navbarDropdown.classList.add("js-closed");
        navbarToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("js-nav-open");
    }
    moveThemeToggle();
});

// Initial check
moveThemeToggle();

// document.querySelectorAll('.animate-wavy').forEach(function (link) {
//     if (!link.classList.contains('button')) {
//         let content = link.textContent + link.textContent;
//         link.setAttribute("data-animation", content);
//         // link.classList.add('animate-wavy');
//     }
// });