// API ตรวจสอบ IP และตำแหน่งที่ตั้ง
async function getIPInfo() {
    try {
        let response = await fetch("https://ipapi.co/json/");
        let data = await response.json();
        if (!data.ip) throw new Error("ไม่พบข้อมูล IP");
        return { ip: data.ip, city: data.city, region: data.region, country: data.country };
    } catch (error) {
        console.error("❌ ไม่สามารถดึงข้อมูล IP ได้", error);
        return null;
    }
}

// ฟังก์ชันบันทึกข้อมูลไปหน้า admin.html
function sendToAdmin(ipInfo) {
    let adminLogs = JSON.parse(localStorage.getItem("adminLogs")) || [];
    adminLogs.push(ipInfo);
    localStorage.setItem("adminLogs", JSON.stringify(adminLogs));
}

// ฟังก์ชันเพิ่มเวลาแบน 24 ชั่วโมง และบันทึกข้อมูล
async function banIP() {
    let ipInfo = await getIPInfo();

    // ❌ ถ้า IP หาไม่เจอ
    if (!ipInfo) {
        let confirmAccess = confirm("🚨 ระบบไม่สามารถตรวจสอบ IP ของคุณได้!\nหากคุณอยู่ในเชียงใหม่ กรุณากด 'ตกลง'\nหากไม่ใช่ ระบบจะทำการแบน");
        if (confirmAccess) return; // ✅ อนุญาตให้เข้า
        document.body.innerHTML = `<h1>🚫 ไม่สามารถตรวจสอบ IP ได้ - คุณถูกแบน 🚫</h1>`;
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
    let logData = {
        ip: ip,
        city: city,
        region: region,
        country: country,
        time: new Date().toLocaleString(),
        reason: "กดปุ่มต้องห้าม"
    };
    sendToAdmin(logData);

    // แจ้งเตือนและบล็อกเว็บ
    let hoursLeft = Math.ceil((bannedIPs[ip] - now) / 3600000);
    alert(`🚨 ระบบตรวจพบพฤติกรรมต้องสงสัย คุณถูกแบน ${hoursLeft} ชั่วโมง 🚨`);
    document.body.innerHTML = `<h1>🚫 คุณถูกแบน ${hoursLeft} ชั่วโมง 🚫</h1>`;
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

// ตรวจสอบสถานะแบนเมื่อโหลดเว็บ
window.onload = async function () {
    let ipInfo = await getIPInfo();

    // ❌ ถ้า IP หาไม่เจอ → ให้คนที่อยู่เชียงใหม่เข้าได้
    if (!ipInfo) {
        let confirmAccess = confirm("🚨 ระบบไม่สามารถตรวจสอบ IP ของคุณได้!\nหากคุณอยู่ในเชียงใหม่ กรุณากด 'ตกลง'\nหากไม่ใช่ ระบบจะทำการแบน");
        if (!confirmAccess) {
            document.body.innerHTML = `<h1>🚫 ไม่สามารถตรวจสอบ IP ได้ - คุณถูกแบน 🚫</h1>`;
        }
        return;
    }

    let { ip, city, region, country } = ipInfo;
    let bannedIPs = JSON.parse(localStorage.getItem("bannedIPs")) || {};
    let now = new Date().getTime();

    if (bannedIPs[ip] && now < bannedIPs[ip]) {
        let hoursLeft = Math.ceil((bannedIPs[ip] - now) / 3600000);
        document.body.innerHTML = `<h1>🚫 คุณถูกแบน ${hoursLeft} ชั่วโมง 🚫</h1>`;
    }
};
