// API ตรวจสอบ IP และตำแหน่งที่ตั้ง
async function getIPInfo() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();
        if (!data || !data.ip) throw new Error("IP Not Found");
        return { ip: data.ip, city: data.city, region: data.region, country: data.country };
    } catch (error) {
        console.error("❌ ไม่สามารถดึงข้อมูล IP ได้", error);
        return null;
    }
}

// ฟังก์ชันเพิ่มเวลาแบน 24 ชั่วโมง และบันทึกข้อมูล
async function banIP(reason = "พฤติกรรมต้องห้าม") {
    let ipInfo = await getIPInfo();
    
    // ถ้าหา IP ไม่เจอ → แบนทันที
    if (!ipInfo) {
        document.body.innerHTML = `<h1>🚫 คุณถูกแบนเนื่องจากไม่สามารถตรวจสอบ IP ได้ 🚫</h1>`;
        return;
    }

    let { ip, city, region, country } = ipInfo;

    // ❌ ยกเว้นถ้าอยู่ใน "เชียงใหม่"
    if (city === "Chiang Mai" || region === "Chiang Mai" || country !== "Thailand") {
        console.log(`✅ ยกเว้นการแบน IP: ${ip} (จังหวัด ${city}, ${region})`);
        return;
    }

    let bannedIPs = JSON.parse(localStorage.getItem("bannedIPs")) || {};
    let now = new Date().getTime();

    if (bannedIPs[ip] && now < bannedIPs[ip]) {
        bannedIPs[ip] += 86400000; // +24 ชั่วโมง
    } else {
        bannedIPs[ip] = now + 86400000; // แบนครั้งแรก 24 ชั่วโมง
    }

    localStorage.setItem("bannedIPs", JSON.stringify(bannedIPs));

    // 📌 บันทึก IP ลงใน LocalStorage
    let logData = JSON.parse(localStorage.getItem("ipLogs")) || [];
    logData.push({
        ip: ip,
        city: city,
        region: region,
        country: country,
        time: new Date().toLocaleString(),
        reason: reason
    });
    localStorage.setItem("ipLogs", JSON.stringify(logData));

    // แจ้งเตือนและบล็อกเว็บ
    let hoursLeft = Math.ceil((bannedIPs[ip] - now) / 3600000);
    alert(`🚨 ระบบตรวจพบพฤติกรรมต้องสงสัย คุณถูกแบน ${hoursLeft} ชั่วโมง 🚨`);
    document.body.innerHTML = `<h1>🚫 คุณถูกแบน ${hoursLeft} ชั่วโมง 🚫</h1>`;
}

// ตรวจสอบ IP เมื่อเข้าเว็บ
window.onload = async function () {
    let ipInfo = await getIPInfo();
    
    // ❌ หา IP ไม่เจอ → แบนเลย
    if (!ipInfo) {
        document.body.innerHTML = `<h1>🚫 คุณถูกแบนเนื่องจากไม่สามารถตรวจสอบ IP ได้ 🚫</h1>`;
        return;
    }

    let { ip, city, region, country } = ipInfo;
    let bannedIPs = JSON.parse(localStorage.getItem("bannedIPs")) || {};
    let now = new Date().getTime();

    // ❌ ตรวจสอบว่า IP นี้ถูกแบนหรือไม่
    if (bannedIPs[ip] && now < bannedIPs[ip]) {
        let hoursLeft = Math.ceil((bannedIPs[ip] - now) / 3600000);
        document.body.innerHTML = `<h1>🚫 คุณถูกแบน ${hoursLeft} ชั่วโมง 🚫</h1>`;
    }
};

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
        banIP("กดปุ่มต้องห้าม");
    }
});
