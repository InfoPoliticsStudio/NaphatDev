async function fetchUsers() {
    try {
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error('Failed to fetch users.json');
        }
        return await response.json();
    } catch (error) {
        Swal.fire('Error', 'Unable to load user data', 'error');
        return null;
    }
}

async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        Swal.fire('Error', 'Please enter both username and password', 'error');
        return false;
    }

    const users = await fetchUsers();
    if (!users) return false;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        Swal.fire('Success', `Welcome, ${user.name_th}!`, 'success').then(() => {
            window.location.href = 'dashboard.html';
        });
    } else {
        Swal.fire('Error', 'Invalid username or password', 'error');
    }

    return false;
}
