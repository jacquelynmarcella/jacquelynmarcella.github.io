let colorToggle = document.querySelectorAll(".toggle--scheme");
let drawerToggle = document.querySelector(".drawer--toggle");
let drawerContainer = document.querySelector(".drawer--container");
//TODO - remove lorde-icon triggers for prefers reduced motion
// Need fallbacks for browser dark settings
//On Load
let isDark = localStorage.getItem('jm-color-mode');
if (isDark == "dark") {
    document.body.classList.add("dark");
}

function setColorMode() {
    if (!document.body.classList.contains("dark")) {
        document.body.classList.add("dark");
        localStorage.setItem('jm-color-mode', "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem('jm-color-mode', "light");
    }
}

colorToggle.forEach(function (toggle) {
    toggle.addEventListener("click", function () {
        setColorMode();
    });
});

// const targetElement = document.querySelector('.polaroid--background'); // Replace with your element selector
// const classNameToToggle = 'js-animating'; // The CSS class to add/remove

// function checkVisibility() {
//   const rect = targetElement.getBoundingClientRect();
//   const isVisible = (rect.top >= 0 && rect.bottom + 300 <= window.innerHeight);
//   console.log(rect.top, rect.bottom, window.innerHeight);
//   // Need: only on scroll down
//   // dont jump back to green so quickly, different range for rect
//   if (isVisible) {
//     targetElement.classList.add(classNameToToggle);
// //   } else if (rect.top >= 0) {
//   }
//   else if ( targetElement.classList.contains(classNameToToggle)) {
//     // if ( rect.top >= window.innerHeight || rect.bottom <= 0 ) {
//     //     targetElement.classList.remove(classNameToToggle);
//     // }
//     if ( rect.top >= window.innerHeight ) {
//         targetElement.classList.remove(classNameToToggle);
//     }
//   }


// }

// Initial check on page load
// checkVisibility();

// Add event listener for scroll
// window.addEventListener('scroll', checkVisibility);

// TODO - aria states here, unset for mobile vs desktop



// Define a function to get and log the element's height
const headerContainer = document.querySelector('.header--hero');
let headerContentHeight = 500; //default value

function getHeaderHeight() {
    let stickyHeader = document.getElementById('sticky-header');
    let headerHeight = stickyHeader.offsetHeight;
    headerContentHeight = headerHeight;
    let tripleHeight = headerHeight * 3;
    headerContainer.style.setProperty('--headerContainerHeight', tripleHeight + 'px');
    headerContainer.style.setProperty('--headerContentHeight', headerHeight + 'px');
}
// Add an event listener to the window for the 'resize' event
window.addEventListener('resize', getHeaderHeight);
getHeaderHeight();

window.addEventListener('scroll', () => {
    if (window.scrollY <= (headerContentHeight * .90)) {
        console.log("Now at the top!", headerContentHeight, scrollY);
        headerContainer.classList.add("js-typing");
    } else {
        console.log("not at top", headerContentHeight, scrollY)
        headerContainer.classList.remove("js-typing");
    }
});

const viewportHeight = window.innerHeight;
const topBottomMargin = (viewportHeight / 2.75) - .5; // Half of the viewport minus half of the 1px line

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
    rootMargin: `${-topBottomMargin}px 0px ${-topBottomMargin}px 0px`, // Shrink the root to a 1px line in the middle
    threshold: 0 // Trigger when any part of the element intersects the 1px line
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

window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
        navbarDropdown.classList.remove("js-open");
        navbarDropdown.classList.add("js-closed");
        navbarToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("js-nav-open");
    }
});
