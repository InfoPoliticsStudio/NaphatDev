// จำลองฐานข้อมูล JSON
const users = [
    { username: "admin", password: "37698" },
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" }
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // ตรวจสอบข้อมูลผู้ใช้
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById("message").textContent = "Login successful!";
        document.getElementById("message").style.color = "green";

        // เก็บข้อมูล username ไว้ใน localStorage
        localStorage.setItem("loggedInUser", username);

        // เปลี่ยนเส้นทางไปยังหน้าอื่น
        setTimeout(() => {
            window.location.href = "welcome.html";
        }, 1000);
    } else {
        document.getElementById("message").textContent = "Invalid username or password.";
        document.getElementById("message").style.color = "red";
    }
});
