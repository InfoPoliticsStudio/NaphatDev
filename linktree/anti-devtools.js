// document.addEventListener("keydown", function(event) {
//     if (event.keyCode === 123 || // F12
//         (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74)) || // Ctrl+Shift+I หรือ Ctrl+Shift+J
//         (event.ctrlKey && event.keyCode === 85)) { // Ctrl+U
//         event.preventDefault();
//         alert("ไม่อนุญาตให้เปิด Developer Tools!");
//         return false;
//     }
// });

// function detectDevTools() {
//     setInterval(() => {
//         const devtools = window.outerHeight - window.innerHeight > 160 || window.outerWidth - window.innerWidth > 160;
//         if (devtools) {
//             alert("ตรวจพบ Developer Tools! หน้าจะถูกรีโหลด");
//             location.reload(); // รีโหลดหน้าเว็บ
//         }
//     }, 500); // ตรวจสอบทุก 500ms
// }
// detectDevTools();

// // ป้องกันคลิกขวา
// document.addEventListener("contextmenu", function(event) {
//     event.preventDefault();
// });

// // ป้องกันการเปิด Console ผ่าน console.clear()
// console.clear = function() {
//     console.log("Console ถูกป้องกันแล้ว!");
// };
