// ดึงข้อมูลผู้ใช้ที่ล็อกอินจาก LocalStorage
const loggedInUser = localStorage.getItem("loggedInUser");

if (!loggedInUser) {
    alert("กรุณาเข้าสู่ระบบ");
    window.location.href = "/public/login"; // ถ้ายังไม่ได้ล็อกอิน ให้กลับไปหน้า Login
} else {
    fetch("/public/data/employees.json")
        .then(response => response.json())
        .then(data => {
            // ค้นหาข้อมูลของผู้ใช้ที่ล็อกอินอยู่
            const user = data.find(emp => emp.username === loggedInUser);

            if (user) {
                displayUserInfo(user);
            } else {
                alert("ไม่พบข้อมูลผู้ใช้");
                window.location.href = "login.html";
            }
        })
        .catch(error => console.error("เกิดข้อผิดพลาดในการโหลดข้อมูล:", error));
}

// ฟังก์ชันแสดงข้อมูลผู้ใช้
function displayUserInfo(user) {
    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `
        <img src="${user.img}" alt="Profile Picture">
        <div class="user-details">
            <h3>${user.fname} ${user.lname}</h3>
            <p>ตำแหน่ง: ${user.position}</p>
            <p>การศึกษา: ${user.education}</p>
        </div>
    `;
}

// ปุ่มออกจากระบบ
document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("loggedInUser"); // ลบข้อมูลผู้ใช้
    alert("ออกจากระบบเรียบร้อย");
    window.location.href = "login.html"; // กลับไปหน้าล็อกอิน
});
