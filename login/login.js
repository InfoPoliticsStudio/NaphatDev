async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        Swal.fire('Error', 'Please enter both username and password', 'error');
        return false; // Prevents form submission
    }

    const users = await fetchUsers(); // Fetch users from `users.json`
    if (!users) return false;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        // Save user data to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Show success message and redirect
        Swal.fire('Success', `Welcome, ${user.name_th}!`, 'success').then(() => {
            window.location.href = 'dashboard.html'; // Redirects to the dashboard
        });
    } else {
        Swal.fire('Error', 'Invalid username or password', 'error');
    }

    return false; // Prevents the default form submission behavior
}
