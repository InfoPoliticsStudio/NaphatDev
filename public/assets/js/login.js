document.querySelector("[data-form]").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (result.success) {
        sessionStorage.setItem("token", result.token);  // เก็บ token
        window.location.href = "/dashboard.html";  // ไปยังหน้าหลัก
    } else {
        document.getElementById("message").textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!";
    }
});
