// document.addEventListener("DOMContentLoaded", function () {
//     const menuItems = document.querySelectorAll("li[data-home], li[data-meeting], li[data-info]");
//     const mainContainer = document.body; 

//     const mainContent = {
//         home: "เนื้อหาหน้าหลัก",
//         meeting: "เนื้อหาประชุมงาน",
//         info: `
//             <img src="/public/assets/images/dash.png" width="100%">
//             <h2>ข้อมูลสมาชิก</h2>
//             <div data-flex-gap-width>
//                 <div id="userInfo"></div>
//                 <!-- นับถอยหลังเหตุการณ์สำคัญ -->
//                 <div data-countdown="">
//                     <div data-sub-countdown="">
//                         <h3>นับถอยหลัง</h3>
//                         <p data-flex-1="">วันรายงานตัว
//                             <span id="kmitl1-countdown"></span>
//                         </p>
//                         <p data-flex-1="">วันเปิดภาคเรียน
//                             <span id="kmitl-open-countdown"></span>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         `
//     };

//     menuItems.forEach(item => {
//         item.addEventListener("click", function () {
//             const dataKey = Object.keys(this.dataset)[0];

//             const existingMain = document.querySelector("main[data-ml]");
//             if (existingMain) existingMain.remove();

//             const newMain = document.createElement("main");
//             newMain.setAttribute("data-ml", "");
//             newMain.setAttribute(`data-main-${dataKey}`, "");
//             newMain.innerHTML = mainContent[dataKey]; 

//             mainContainer.appendChild(newMain);
//         });
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll("li[data-home], li[data-meeting], li[data-info]");
    const container = document.querySelector(".container"); // เพิ่ม main ใน .container

    const mainContent = {
        home: "เนื้อหาหน้าหลัก",
        meeting: "เนื้อหาประชุมงาน",
        info: `
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
            </div>
        `
    };

    // ✅ สร้าง main เริ่มต้น (info)
    let currentMain = document.createElement("main");
    currentMain.setAttribute("data-ml", "");
    currentMain.setAttribute("data-main-info", "");
    currentMain.innerHTML = mainContent.info;
    container.appendChild(currentMain);

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            const dataKey = Object.keys(this.dataset)[0]; // ดึงชื่อ data-* เช่น "home", "meeting", "info"

            // ✅ ถ้าเป็นครั้งแรกที่กด -> ลบ main ที่มี data-main-info
            if (currentMain && currentMain.hasAttribute("data-main-info")) {
                currentMain.remove();
            } else {
                // ✅ ลบ main ปัจจุบัน (ถ้ามี)
                if (currentMain) currentMain.remove();
            }

            // ✅ สร้าง main ใหม่
            currentMain = document.createElement("main");
            currentMain.setAttribute("data-ml", "");
            currentMain.setAttribute(`data-main-${dataKey}`, "");
            currentMain.innerHTML = mainContent[dataKey]; // ใช้ innerHTML

            // ✅ เพิ่ม main ใหม่เข้าไปที่ .container
            container.appendChild(currentMain);
        });
    });
});
