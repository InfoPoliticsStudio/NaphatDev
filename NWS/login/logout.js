document.addEventListener('DOMContentLoaded', () => {
    const checkLoginStatus = () => {
        // ตรวจสอบสถานะการล็อกอินใน sessionStorage
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            alert('Your session has expired. Please login again.');
            window.location.href = 'index.html'; // เปลี่ยนกลับไปหน้า login
        }
    };

    const redirectToLogin = () => {
        alert('Session expired! Redirecting to login page.');
        sessionStorage.removeItem('isLoggedIn'); // ลบเฉพาะสถานะการล็อกอินใน sessionStorage
        window.location.href = 'index.html'; // เปลี่ยนกลับไปหน้า login
    };

    const resetTimer = () => {
        clearTimeout(logoutTimer); // เคลียร์ timer เก่า
        logoutTimer = setTimeout(redirectToLogin, 5 * 60 * 1000); // ตั้งค่า timeout (5 นาที)
    };

    let logoutTimer;

    // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดหน้า
    checkLoginStatus();

    // ตรวจจับการเปลี่ยนสถานะของหน้าเว็บ
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            redirectToLogin(); // Logout หากหน้าเว็บถูกซ่อนไป
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
        redirectToLogin(); // บังคับให้ไปหน้า login หากพยายามย้อนกลับ
    });

    // ตั้งค่าหน้าแรกเมื่อโหลดหน้าเว็บ
    history.pushState(null, null, location.href);
});
