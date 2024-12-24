const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('users.json');
        const users = await response.json();

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
        }
    });
}

if (window.location.pathname.includes('dashboard.html')) {
    const userNameElement = document.getElementById('user-name');
    const logoutButton = document.getElementById('logout-button');

    try {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!user || !user.name) {
            console.error('User data not found in localStorage or user is invalid.');
            window.location.href = 'index.html';
        } else {
            console.log('User logged in:', user);
            userNameElement.textContent = user.name;
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

