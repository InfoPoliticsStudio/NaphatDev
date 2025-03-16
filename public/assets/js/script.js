document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".fas");
    const navLinks = document.querySelector(".nav-links");
    const icon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("nav-active");
        navLinks.classList.toggle("fa-times");
    });
});
