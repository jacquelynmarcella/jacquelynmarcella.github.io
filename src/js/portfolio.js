let colorToggle = document.getElementById("color-mode-button");
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

colorToggle.addEventListener("click", function() {
    setColorMode();
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
let timelineToggle = document.querySelector("#timeline--toggle");
let timeline = document.querySelector("#timeline");
timelineToggle.addEventListener("click", function() {
    if (timeline.classList.contains("js-mobile-collapsed")) {
        timeline.classList.remove("js-mobile-collapsed");
        timeline.classList.add("js-mobile-open");
    } else {
        timeline.classList.add("js-mobile-collapsed");
        timeline.classList.remove("js-mobile-open");

    }
});


// Define a function to get and log the element's height
function getHeaderHeight() {
    let stickyHeader = document.getElementById('sticky-header'); 
    let headerContainer = document.querySelector('.header--hero');
    let headerHeight = stickyHeader.offsetHeight; 
    console.log('Sticky header height:', headerHeight);
    let tripleHeight = headerHeight * 3;
    headerContainer.style.setProperty('--headerContainerHeight', tripleHeight + 'px');
    headerContainer.style.setProperty('--headerContentHeight', headerHeight + 'px');
}
// Add an event listener to the window for the 'resize' event
window.addEventListener('resize', getHeaderHeight);
getHeaderHeight();



let targetElement = document.querySelectorAll('.slider--slide'); // Replace with your element's ID

const viewportHeight = window.innerHeight;
const topBottomMargin = (viewportHeight / 2.75) - .5; // Half of the viewport minus half of the 1px line

const options = {
    rootMargin: `${-topBottomMargin}px 0px ${-topBottomMargin}px 0px`, // Shrink the root to a 1px line in the middle
    threshold: 0 // Trigger when any part of the element intersects the 1px line
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('js-active');
            entry.target.playerInstance.play();
            // Perform actions when the element is in view
        } else {
            // Perform actions when the element is out of view
            entry.target.classList.remove('js-active');
            entry.target.playerInstance.pause();
        }
    });
}, options);

Array.from(targetElement).forEach(function(item, index) {
    let icon = item.querySelector("lord-icon");
    console.log(icon);
    icon.addEventListener("ready", () => {
        observer.observe(icon);
    });
});