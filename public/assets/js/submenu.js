document.addEventListener("DOMContentLoaded", function () {
    const submenuParents = document.querySelectorAll("[data-has-submenu]");

    submenuParents.forEach(parent => {
        const link = parent.querySelector("a");
        const submenu = parent.querySelector("[submenu]");

        // ตรวจสอบว่ามีเมนูย่อยก่อนเพิ่ม Event Listener
        if (submenu) {
            link.addEventListener("click", function (event) {
                // ถ้าจอเล็กกว่า 768px ให้เปิดเมนูย่อยเมื่อคลิก
                if (window.innerWidth < 768) {
                    event.preventDefault(); // ป้องกัน `<a>` โหลดหน้าใหม่
                    submenu.classList.toggle("open");

                    // ปิดเมนูอื่น ๆ ที่ไม่ใช่อันที่คลิก
                    submenuParents.forEach(el => {
                        if (el !== parent) {
                            el.querySelector("[submenu]").classList.remove("open");
                        }
                    });
                }
            });
        }
    });

    // ปิดเมนูเมื่อคลิกข้างนอก
    document.addEventListener("click", function (event) {
        if (!event.target.closest("[data-nav-links-active]")) {
            document.querySelectorAll("[submenu]").forEach(el => el.classList.remove("open"));
        }
    });
});
