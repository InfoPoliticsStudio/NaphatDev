document.addEventListener("keydown", function(event) {
    if (event.keyCode === 123 || // F12
        (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74)) || // Ctrl+Shift+I หรือ Ctrl+Shift+J
        (event.ctrlKey && event.keyCode === 85)) { // Ctrl+U
        event.preventDefault();
        alert("ห้ามเปิด Developer Tools!");
    }
});

// ตรวจจับ DevTools โดยใช้ console.log
(function() {
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get() {
            alert("ตรวจพบการเปิด Developer Tools!");
            window.location.reload(); // รีโหลดหน้าเว็บอัตโนมัติ
        }
    });
    console.log(element);
})();

// ป้องกันคลิกขวา
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
