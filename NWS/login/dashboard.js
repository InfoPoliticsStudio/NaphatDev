
    document.addEventListener('DOMContentLoaded', () => {
        // ดึงข้อมูลจาก localStorage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (loggedInUser) {
            // แสดงข้อมูลใน header
            document.getElementById('user-name').textContent = loggedInUser.name || 'Guest';
            const userImage = document.getElementById('user-img');
            userImage.src = loggedInUser.img || 'https://via.placeholder.com/40'; // Placeholder รูปภาพ
            userImage.alt = `รูปโปรไฟล์ของ ${loggedInUser.name || 'ผู้ใช้งาน'}`;
        } else {
            // หากไม่มีข้อมูลผู้ใช้ ให้เปลี่ยนหน้าไปยังหน้า login
            window.location.href = 'index.html';
        }

        // ตั้งค่า Logout
        const logoutButton = document.getElementById('logout-button');
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
        
        // -------------------------------------------------------------
        
        const userContainer = document.getElementById('user-container');
        const userImg = document.getElementById('user-img');
    
        // แสดงหรือซ่อนทั้ง container เมื่อคลิกที่รูปภาพ
        userImg.addEventListener('click', (event) => {
            event.stopPropagation(); // หยุด Event ไหลไปยัง document
            userContainer.style.display = userContainer.style.display === 'grid' ? 'none' : 'grid';
        });
    
        // ซ่อน container เมื่อคลิกพื้นที่อื่น
        document.addEventListener('click', () => {
            userContainer.style.display = 'none';
        });
    
        // หยุดการซ่อน container เมื่อคลิกภายใน container
        userContainer.addEventListener('click', (event) => {
            event.stopPropagation(); // หยุด Event ไหลไปยัง document
        });
    
        // ซ่อน container เมื่อหน้าต่างเบราว์เซอร์สูญเสียโฟกัส
        window.addEventListener('blur', () => {
            userContainer.style.display = 'none';
        });
    });
