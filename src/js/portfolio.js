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

const targetElement = document.querySelector('.polaroid--background'); // Replace with your element selector
const classNameToToggle = 'js-animating'; // The CSS class to add/remove

function checkVisibility() {
  const rect = targetElement.getBoundingClientRect();
  const isVisible = (rect.top >= 0 && rect.bottom + 100 <= window.innerHeight);
  console.log(rect.top, rect.bottom, window.innerHeight);
  // Need: only on scroll down
  // dont jump back to green so quickly, different range for rect
  if (isVisible) {
    targetElement.classList.add(classNameToToggle);
//   } else if (rect.top >= 0) {
  }
  else if ( targetElement.classList.contains(classNameToToggle)) {
    // if ( rect.top >= window.innerHeight || rect.bottom <= 0 ) {
    //     targetElement.classList.remove(classNameToToggle);
    // }
    if ( rect.top >= window.innerHeight ) {
        targetElement.classList.remove(classNameToToggle);
    }
  }

 
}

// Initial check on page load
checkVisibility();

// Add event listener for scroll
window.addEventListener('scroll', checkVisibility);

// drawerToggle.addEventListener("click", function() {
//     if (drawerToggle.classList.contains("js-closed")) {
//       drawerToggle.classList.remove("js-closed");
//         drawerContainer.classList.remove("display-none");
//     } else {
//         drawerToggle.classList.add("js-closed");
//         drawerContainer.classList.add("display-none");
//     }
// });