document.addEventListener('DOMContentLoaded', () => {
    const checkLoginStatus = () => {
        // ตรวจสอบสถานะการล็อกอินใน localStorage หรือ sessionStorage
        const isLoggedIn = sessionStorage.getItem('isLoggedIn') || localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            alert('Please login first.');
            window.location.href = 'index.html'; // หากไม่ได้ล็อกอิน ให้กลับไปหน้า index.html
        }
    };

    const logout = () => {
        alert('Session expired! You have been logged out.');
        sessionStorage.clear(); // รีเซ็ต sessionStorage
        localStorage.clear();   // รีเซ็ต localStorage
        window.location.href = 'index.html'; // เปลี่ยนกลับไปหน้า login
    };

    const resetTimer = () => {
        clearTimeout(logoutTimer); // เคลียร์ timer เก่า
        logoutTimer = setTimeout(logout, 5 * 60 * 1000); // ตั้งค่า timeout (5 นาที)
    };

    let logoutTimer;

    // ตรวจจับสถานะการเข้าสู่ระบบ
    checkLoginStatus();

    // ตรวจจับการเปลี่ยนสถานะของหน้าเว็บ
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            logout(); // Logout หากหน้าเว็บถูกซ่อนไป (เช่น สลับแอปหรือปิดหน้าจอ)
        }
    });

    // ตรวจจับการกระทำต่างๆ เพื่อรีเซ็ตตัวจับเวลา
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach((event) => {
        document.addEventListener(event, resetTimer);
    });

    // เริ่มต้นจับเวลา
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
