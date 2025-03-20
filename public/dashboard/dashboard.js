async function checkLogin() {
    // ดึงข้อมูลผู้ใช้จาก localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        alert("กรุณาเข้าสู่ระบบ");
        window.location.href = "/public/login"; // ถ้ายังไม่ได้ล็อกอิน ให้กลับไปหน้า Login
        return;
    }

    const user = JSON.parse(loggedInUser); // แปลงข้อมูลจาก localStorage เป็น Object

    try {
        // โหลดไฟล์ employees.json
        const response = await fetch("/public/data/employees.json");

        if (!response.ok) {
            throw new Error("ไม่สามารถโหลดข้อมูลพนักงานได้");
        }

        const employees = await response.json(); // แปลงไฟล์ JSON

        // เปรียบเทียบ username และ password จาก localStorage กับข้อมูลใน JSON
        const employee = employees.find(emp => emp.username === user.username && emp.password === user.password);

        if (employee) {
            // ถ้าข้อมูลตรงกัน แสดงข้อมูลผู้ใช้
            displayUserInfo(employee);
        } else {
            // ถ้าไม่ตรงกัน ให้ลบข้อมูลจาก localStorage และกลับไปหน้า Login
            localStorage.removeItem("loggedInUser");
            alert("ข้อมูลผู้ใช้ไม่ตรงกัน กรุณาล็อกอินใหม่");
            window.location.href = "/public/login.html";
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูลพนักงาน");
    }
}

// ฟังก์ชันแสดงข้อมูลผู้ใช้
function displayUserInfo(user) {
    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `
        <img src="${user.img}" alt="Profile Picture">
        <div class="user-details">
            <h3>${user.fname} ${user.lname}</h3>
            <p>ตำแหน่ง: ${user.position}</p>
            <p>มหาวิทยาลัย: ${user.education}</p>
        </div>
    `;
}

// ปุ่มออกจากระบบ
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("loggedInUser"); // ลบข้อมูลผู้ใช้
    alert("ออกจากระบบเรียบร้อย");
    window.location.href = "/public/login.html"; // กลับไปหน้าล็อกอิน
});

// เรียกใช้ฟังก์ชันตรวจสอบการล็อกอิน
checkLogin();

function updateLayout() { let content = document.querySelector("[data-ml], [data-ml-240]"); if (window.innerWidth <= 500) { content.removeAttribute("data-ml-240"); content.setAttribute("data-ml", ""); } } document.querySelector("[data-logo]").addEventListener("click", function() { let sidebar = document.querySelector(".sidebar"); sidebar.classList.toggle("active"); let content = document.querySelector("[data-ml], [data-ml-240]"); if (window.innerWidth > 500) { if (content.hasAttribute("data-ml")) { content.removeAttribute("data-ml"); content.setAttribute("data-ml-240", ""); } else { content.removeAttribute("data-ml-240"); content.setAttribute("data-ml", ""); } } }); window.addEventListener("resize", updateLayout); updateLayout();
