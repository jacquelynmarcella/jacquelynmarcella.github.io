let colorToggle = document.getElementById("color-mode-button");
let drawerToggle = document.querySelector(".drawer--toggle");
let drawerContainer = document.querySelector(".drawer--container");
//TODO - remove lorde-icon triggers for prefers reduced motion
// Need fallbacks for browser dark settings
//On Load
// let isDark = localStorage.getItem('jm-color-mode');
// if (isDark == "dark") {
//     document.body.classList.add("dark");
// }

// function setColorMode() {
//     if (!document.body.classList.contains("dark")) {
//         document.body.classList.add("dark");
//         localStorage.setItem('jm-color-mode', "dark");
//     } else {
//         document.body.classList.remove("dark");
//         localStorage.setItem('jm-color-mode', "light");
//     }
// }

// colorToggle.addEventListener("click", function() {
//     setColorMode();
// });

drawerToggle.addEventListener("click", function() {
    if (drawerToggle.classList.contains("js-closed")) {
      drawerToggle.classList.remove("js-closed");
        drawerContainer.classList.remove("display-none");
    } else {
        drawerToggle.classList.add("js-closed");
        drawerContainer.classList.add("display-none");
    }
});