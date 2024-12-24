document.addEventListener('DOMContentLoaded', () => {
    let logoutTimer;

    // ฟังก์ชันออกจากระบบ
    const logout = () => {
        alert('Session expired! Please login again.');
        sessionStorage.clear(); // ลบ session
        window.location.href = 'index.html'; // เปลี่ยนกลับไปหน้า login
    };

    // ฟังก์ชันรีเซ็ตตัวจับเวลา
    const resetTimer = () => {
        clearTimeout(logoutTimer); // เคลียร์ timer เก่า
        logoutTimer = setTimeout(logout, 5 * 60 * 1000); // ตั้ง timeout (5 นาที)
    };

    // ตรวจจับการคลิกหรือการเคลื่อนไหว
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach((event) => {
        document.addEventListener(event, resetTimer);
    });

    // เริ่มต้นการจับเวลา
    resetTimer();

    // บล็อกการใช้ปุ่มย้อนกลับ
    window.addEventListener('popstate', () => {
        history.pushState(null, null, location.href);
        alert('Please login again to access this page.');
        logout(); // บังคับ logout หากพยายามย้อนกลับ
    });

    // ตั้งค่าหน้าแรกเมื่อโหลดหน้าเว็บ
    history.pushState(null, null, location.href);
});
