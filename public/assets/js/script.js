document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const icon = menuToggle.querySelector("i");

    if (!menuToggle || !navLinks || !icon) {
        console.error("Element not found!");
        return;
    }

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("nav-active");
        
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");

        console.log("Icon class:", icon.classList);
    });
});
document.querySelector('.btn').addEventListener('click', function() {if (this.hasAttribute('data-log-in')) {window.location.href = '/public/login';}});
