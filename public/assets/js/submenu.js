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
    const icon = document.querySelector("[data-icon='1']");

    // ถ้าหน้าจอใหญ่กว่า 768px ให้เปลี่ยน data-nav-links-active -> data-nav-links
    if (nav && window.innerWidth > 768) {
        nav.setAttribute("data-nav-links", ""); // เปลี่ยนเป็น data-nav-links
        nav.removeAttribute("data-nav-links-active"); // ลบ data-nav-links-active
    }

    // ถ้าพบ data-icon="1" และหน้าจอใหญ่กว่า 768px ให้เปลี่ยนเป็น data-icon="0"
    if (icon && window.innerWidth > 768) {
        icon.setAttribute("data-icon", "0");
    }
}

// เรียกใช้เมื่อโหลดหน้า
window.addEventListener("load", checkScreenSize);

// เรียกใช้เมื่อปรับขนาดหน้าจอ
window.addEventListener("resize", checkScreenSize);

document.querySelectorAll("[data-nav-links-active]").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll("[data-has-submenu]").forEach(submenu => {
            submenu.toggleAttribute("active");
        });
    });
});
