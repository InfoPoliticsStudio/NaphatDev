document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector("#menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("nav-active");
        if (navLinks.classList.contains("nav-active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });
});
