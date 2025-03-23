async function fetchCertificate() {
    try {
        // ดึงข้อมูลจาก API
        const response = await fetch('https://script.google.com/macros/s/AKfycbyhakX9jMyeMHT-mv74JsJxaY8aCHJNmmCNoZKa3hiHXbvYNev_n9OGGtM9v7foXdAX/exec');
        const data = await response.json();

        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (data.length > 0) {
            renderCertificate(data); // เรียกฟังก์ชันแสดงข้อมูล
        } else {
            console.error('ไม่มีข้อมูลเกียรติบัตร');
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    }
}

function renderCertificate(data) {
    // เลือกตารางที่ต้องการแสดงข้อมูล
    const tableBody = document.getElementById('data-certificate');

    // เคลียร์ข้อมูลเก่า
    tableBody.innerHTML = '';

    // สร้างแถวสำหรับแต่ละรายการ
    data.forEach(item => {
        const row = document.createElement('tr');

        // สร้างเซลล์แต่ละคอลัมน์
        row.innerHTML = `
            <td>${item.index}</td>
            <td>
                <a href="${item.url}" target="_blank">
                    <img src="${item.image}" width="100px">
                </a>
            </td>
            <td>${item.certificate}</td>
            <td>${item.yearReceived}</td>
        `;

        // เพิ่มแถวลงในตาราง
        tableBody.appendChild(row);
    });
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', fetchCertificate);
