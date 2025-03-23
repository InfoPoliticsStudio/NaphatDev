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
