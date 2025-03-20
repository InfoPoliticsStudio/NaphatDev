document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll("li[data-home], li[data-meeting], li[data-info]");
    const mainContainer = document.body;

    const mainContent = {
        home: "เนื้อหาหน้าหลัก",
        meeting: "เนื้อหาประชุมงาน",
        info: "
          <img src="/public/assets/images/dash.png" width="100%">
            <h2>ข้อมูลสมาชิก</h2>
            <div data-flex-gap-width>
                <div id="userInfo"></div>
                <!-- นับถอยหลังเหตุการณ์สำคัญ -->
                <div data-countdown="">
                    <div data-sub-countdown="">
                        <h3>นับถอยหลัง</h3>
                        <p data-flex-1="">วันรายงานตัว
                            <span id="kmitl1-countdown"></span>
                        </p>
                        <p data-flex-1="">วันเปิดภาคเรียน
                            <span id="kmitl-open-countdown"></span>
                        </p>
                    </div>
                </div>
            </div>"
    };

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const dataKey = Object.keys(this.dataset)[0]; // ดึงชื่อ data-* เช่น "home", "meeting", "info"

            // ลบ main เดิมออก ถ้ามีอยู่
            const existingMain = document.querySelector("main[data-ml]");
            if (existingMain) existingMain.remove();

            // สร้าง main ใหม่
            const newMain = document.createElement("main");
            newMain.setAttribute("data-ml", "");
            newMain.setAttribute(`data-main-${dataKey}`, "");
            newMain.textContent = mainContent[dataKey]; // ใส่เนื้อหา

            // เพิ่ม main ใหม่เข้าไปในหน้า
            mainContainer.appendChild(newMain);
        });
    });
});
