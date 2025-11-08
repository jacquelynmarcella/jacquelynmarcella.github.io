let colorToggle = document.getElementById("color-mode-button");
let drawerToggle = document.querySelector(".drawer--toggle");
let drawerContainer = document.querySelector(".drawer--container");

colorToggle.addEventListener("click", function() {
    if (document.body.classList.contains("dark")) {
        document.body.classList.remove("dark");
    } else {
        document.body.classList.add("dark");
    }
});

drawerToggle.addEventListener("click", function() {
    if (drawerToggle.classList.contains("js-closed")) {
      drawerToggle.classList.remove("js-closed");
        drawerContainer.classList.remove("display-none");
    } else {
        drawerToggle.classList.add("js-closed");
        drawerContainer.classList.add("display-none");
    }
});