document.querySelectorAll("[data-has-submenu]").forEach(item => {
    item.addEventListener("click", function (event) {
        // ป้องกันไม่ให้คลิกบน `<a>` ทำให้โหลดหน้าใหม่
        event.preventDefault();

        // ปิดเมนูอื่น ๆ ที่ไม่ใช่อันที่คลิก
        document.querySelectorAll("[data-has-submenu]").forEach(el => {
            if (el !== item) {
                el.classList.remove("active");
            }
        });

        // สลับคลาส active เพื่อเปิด/ปิดเมนูย่อย
        item.classList.toggle("active");
    });
});

// ปิดเมนูย่อยเมื่อคลิกนอกเมนู
document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-nav-links]")) {
        document.querySelectorAll("[data-has-submenu]").forEach(el => {
            el.classList.remove("active");
        });
    }
});
function checkScreenSize() {
    const nav = document.querySelector("ul[data-nav-links-active]");
    
    // ตรวจสอบว่ามี ul[data-nav-links-active] และขนาดหน้าจอเกิน 768px หรือไม่
    if (nav && window.innerWidth > 768) {
        nav.setAttribute("data-nav-links", ""); // เปลี่ยนเป็น data-nav-links
        nav.removeAttribute("data-nav-links-active"); // ลบ data-nav-links-active
    }
}

// เรียกใช้เมื่อโหลดหน้า
window.addEventListener("load", checkScreenSize);

// เรียกใช้เมื่อปรับขนาดหน้าจอ
window.addEventListener("resize", checkScreenSize);
