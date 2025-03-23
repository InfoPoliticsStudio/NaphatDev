document.addEventListener("DOMContentLoaded", function () {
    const submenuParents = document.querySelectorAll("[data-has-submenu]");
    
    submenuParents.forEach(parent => {
        const submenu = parent.querySelector(".submenu");

        parent.addEventListener("click", function (event) {
            // ป้องกันลิงก์ทำงาน
            event.preventDefault();

            // ถ้าหน้าจอเล็กกว่า 768px ให้เปิดเมนูเฉพาะที่คลิก
            if (window.innerWidth < 768) {
                submenu.classList.toggle("open");
            }

            // ปิดเมนูอื่น ๆ ที่ไม่ใช่อันที่คลิก
            submenuParents.forEach(el => {
                if (el !== parent) el.classList.remove("active");
            });

            // เปิด/ปิดเมนูที่คลิก
            parent.classList.toggle("active");
        });
    });

    // ปิดเมนูเมื่อคลิกข้างนอก
    document.addEventListener("click", function (event) {
        if (!event.target.closest("[data-nav-links]")) {
            submenuParents.forEach(el => el.classList.remove("active"));
        }
    });

    // ตรวจสอบขนาดหน้าจอและอัปเดตเมนู
    function checkScreenSize() {
        const nav = document.querySelector("ul[data-nav-links-active]");
        const icon = document.querySelector("[data-icon='1']");

        if (nav && window.innerWidth > 768) {
            nav.setAttribute("data-nav-links", "");
            nav.removeAttribute("data-nav-links-active");
        }

        if (icon && window.innerWidth > 768) {
            icon.setAttribute("data-icon", "0");
        }
    }

    // เรียกใช้งานตอนโหลดและเปลี่ยนขนาดหน้าจอ
    window.addEventListener("load", checkScreenSize);
    window.addEventListener("resize", checkScreenSize);
});
