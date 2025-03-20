// ดึงข้อมูลผู้ใช้จาก localStorage
const loggedInUser = localStorage.getItem("loggedInUser");

if (!loggedInUser) {
    alert("กรุณาเข้าสู่ระบบ");
    window.location.href = "/public/login.html"; // ถ้ายังไม่ได้ล็อกอิน ให้กลับไปหน้า Login
} else {
    const user = JSON.parse(loggedInUser);
    displayUserInfo(user);
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
    window.location.href = "/public/login.html"; // กลับไปหน้าล็อกอิน
});
