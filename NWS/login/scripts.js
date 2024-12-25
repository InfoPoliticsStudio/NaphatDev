const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('users.json');
            const users = await response.json();

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                errorMessage.textContent = 'Invalid username or password';
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            errorMessage.textContent = 'An error occurred. Please try again later.';
        }
    });
}

if (window.location.pathname.includes('dashboard.html')) {
    const userNameElement = document.getElementById('user-name');
    const userImgElement = document.getElementById('user-img');
    const logoutButton = document.getElementById('logout-button');

    try {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!user || !user.name) {
            console.error('User data not found in localStorage or user is invalid.');
            window.location.href = 'index.html';
        } else {
            userNameElement.textContent = user.name;
            userImgElement.src = user.img || '';
        }
    } catch (error) {
        console.error('Error parsing user data:', error);
        window.location.href = 'index.html';
    }

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}

// เมื่อคลิกปุ่มทำข้อสอบ
document.getElementById('start-exam').addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
        // ส่งข้อมูลชื่อผู้ใช้ไปยัง testing.html ผ่าน query string
        window.location.href = `testing.html?name=${encodeURIComponent(user.name)}`;
    } else {
        alert('กรุณาเข้าสู่ระบบก่อนทำข้อสอบ');
        window.location.href = 'index.html';
    }
});
