// API ตรวจสอบ IP และตำแหน่งที่ตั้ง
async function getIPInfo() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();
        return { ip: data.ip, city: data.city, region: data.region, country: data.country_name };
    } catch (error) {
        console.error("❌ ไม่สามารถดึงข้อมูล IP ได้", error);
        return null;
    }
}

// ฟังก์ชันเพิ่มเวลาแบน 24 ชั่วโมง
async function banIP() {
    let ipInfo = await getIPInfo();
    if (!ipInfo) return;

    let { ip, city, region, country } = ipInfo;

    // ❌ ยกเว้นถ้าอยู่ใน "เชียงใหม่"
    if (city === "Chiang Mai" || region === "Chiang Mai" || country !== "Thailand") {
        console.log(`✅ ยกเว้นการแบน IP: ${ip} (จังหวัด ${city}, ${region})`);
        return;
    }

    let bannedIPs = JSON.parse(localStorage.getItem("bannedIPs")) || {};
    let now = new Date().getTime();

    // ถ้า IP ถูกแบนแล้ว ให้เพิ่มเวลาแบนไปอีก 24 ชั่วโมง
    if (bannedIPs[ip] && now < bannedIPs[ip]) {
        bannedIPs[ip] += 86400000; // +24 ชั่วโมง
    } else {
        bannedIPs[ip] = now + 86400000; // แบนครั้งแรก 24 ชั่วโมง
    }

    localStorage.setItem("bannedIPs", JSON.stringify(bannedIPs));

    // แจ้งเตือนและบล็อกเว็บ
    let hoursLeft = Math.ceil((bannedIPs[ip] - now) / 3600000);
    alert(`🚨 ระบบตรวจพบพฤติกรรมต้องสงสัย คุณถูกแบน ${hoursLeft} ชั่วโมง 🚨`);
    document.body.innerHTML = `<h1>🚫 คุณถูกแบน ${hoursLeft} ชั่วโมง 🚫</h1>`;
}

// ฟังก์ชันตรวจสอบสถานะแบน
async function checkBanStatus() {
    let ipInfo = await getIPInfo();
    if (!ipInfo) return;

    let { ip, city, region, country } = ipInfo;

    // ❌ ถ้าอยู่เชียงใหม่ ให้ข้ามการแบน
    if (city === "Chiang Mai" || region === "Chiang Mai" || country !== "Thailand") {
        console.log(`✅ ไม่แบน IP: ${ip} (เชียงใหม่)`);
        return;
    }

    let bannedIPs = JSON.parse(localStorage.getItem("bannedIPs")) || {};
    let now = new Date().getTime();

    if (bannedIPs[ip] && now < bannedIPs[ip]) {
        let hoursLeft = Math.ceil((bannedIPs[ip] - now) / 3600000);
        document.body.innerHTML = `<h1>🚫 คุณถูกแบน ${hoursLeft} ชั่วโมง 🚫</h1>`;
        return true;
    }
    return false;
}

// ปิดคลิกขวา
document.addEventListener("contextmenu", (e) => e.preventDefault());

// ปิดใช้ปุ่มลัด DevTools และ Save Page As
document.addEventListener("keydown", function (e) {
    if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.ctrlKey && e.keyCode === 83) // Ctrl+S
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
