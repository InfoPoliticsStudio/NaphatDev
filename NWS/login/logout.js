document.addEventListener('DOMContentLoaded', () => {
    const redirectToLogin = () => {
        alert('Your session has expired. Please login again.');
        // ลบข้อมูลใน localStorage
        localStorage.clear();
        // ลบสถานะการล็อกอินใน sessionStorage
        sessionStorage.removeItem('isLoggedIn');
        // พาไปหน้า login
        window.location.href = 'index.html';
    };

    const resetTimer = () => {
        clearTimeout(logoutTimer); // เคลียร์ timer เก่า
        logoutTimer = setTimeout(redirectToLogin, 5 * 60 * 1000); // ตั้งค่า timeout (5 นาที)
    };

    let logoutTimer;

    // ตรวจสอบสถานะการเข้าสู่ระบบเมื่อโหลดหน้า
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // ถ้ายังไม่ได้ล็อกอินให้พาไปหน้า login ทันที
        window.location.href = 'index.html';
    }

    // ตรวจจับการกระทำต่างๆ เพื่อรีเซ็ตตัวจับเวลา
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'].forEach((event) => {
        document.addEventListener(event, resetTimer);
    });

    // เริ่มต้นจับเวลา
    resetTimer();

    // บล็อกการใช้ปุ่มย้อนกลับ
    window.addEventListener('popstate', () => {
        history.pushState(null, null, location.href);
        alert('Session expired! Redirecting to login page.');
        redirectToLogin(); // บังคับให้ไปหน้า login หากพยายามย้อนกลับ
    });

    // ตั้งค่าหน้าแรกเมื่อโหลดหน้าเว็บ
    history.pushState(null, null, location.href);
});
