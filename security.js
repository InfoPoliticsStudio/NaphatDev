// ฟังก์ชันรับ IP ผ่าน API
async function getIP() {
    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        let data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("ไม่สามารถดึง IP ได้", error);
        return null;
    }
}

// ฟังก์ชันแบน IP
async function banIP() {
    let ip = await getIP();
    if (!ip) return;

    let bannedIPs = JSON.parse(localStorage.getItem("bannedIPs")) || {};
    let now = new Date().getTime();

    // แบน IP เป็นเวลา 24 ชั่วโมง (86400000 มิลลิวินาที)
    bannedIPs[ip] = now + 86400000;
    localStorage.setItem("bannedIPs", JSON.stringify(bannedIPs));

    // แจ้งเตือนและบล็อกเว็บ
    alert("🚨 ระบบตรวจพบพฤติกรรมต้องสงสัย คุณถูกแบน 24 ชั่วโมง 🚨");
    document.body.innerHTML = "<h1>🚫 คุณถูกแบน 24 ชั่วโมง 🚫</h1>";
}

// ฟังก์ชันตรวจสอบว่า IP ถูกแบนหรือไม่
async function checkBanStatus() {
    let ip = await getIP();
    if (!ip) return;

    let bannedIPs = JSON.parse(localStorage.getItem("bannedIPs")) || {};
    let now = new Date().getTime();

    if (bannedIPs[ip] && now < bannedIPs[ip]) {
        // แสดงข้อความแบน
        document.body.innerHTML = "<h1>🚫 คุณถูกแบน 24 ชั่วโมง 🚫</h1>";
        return true;
    }
    return false;
}

// ปิดคลิกขวา
document.addEventListener("contextmenu", (e) => e.preventDefault());

// ปิดใช้ปุ่มลัด DevTools
document.addEventListener("keydown", function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
    ) {
        e.preventDefault();
        banIP();
    }
});

// ป้องกัน Console Hack
(function () {
    function detectDevTools() {
        console.clear();
        setInterval(async function () {
            let before = new Date().getTime();
            debugger; // บังคับให้หยุดถ้าเปิด Console
            let after = new Date().getTime();
            if (after - before > 100) {
                await banIP();
            }
        }, 500);
    }
    detectDevTools();
})();

// ตรวจสอบสถานะแบนเมื่อโหลดเว็บ
window.onload = async function () {
    await checkBanStatus();
};
