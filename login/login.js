// d-login.js

async function fetchUsers() {
    try {
        const response = await fetch('/login/users.json'); // Fetch the JSON file
        if (!response.ok) {
            throw new Error(`Error fetching users.json: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Could not load user data.',
        });
        return null;
    }
}

async function login() {
    // Get input values
    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    // Validate inputs
    if (!usernameInput || !passwordInput) {
        Swal.fire({
            icon: 'error',
            title: 'Missing Information',
            text: 'Please enter both email and password.',
        });
        return false; // Prevent form submission
    }

    // Fetch users from the JSON file
    const users = await fetchUsers();
    if (!users) {
        return false; // Prevent form submission if users can't be fetched
    }

    // Find matching user
    const user = users.find(
        (u) => u.username === usernameInput && u.password === passwordInput
    );

    if (user) {
        Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            html: `
                <p>Welcome, <strong>${user.name_th}</strong>!</p>
                <p>Email: ${user.email}</p>
                <p>Joined on: ${user.joined_on}</p>
            `,
            imageUrl: user.pic_url,
            imageAlt: 'User Picture',
        }).then(() => {
            // Redirect to another page or perform other actions
            window.location.href = "/login/dashboard.html";
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password.',
        });
    }

    return false; // Prevent default form submission behavior
}
if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user data
    Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome, ${user.name_th}!`,
    }).then(() => {
        window.location.href = "/login/dashboard.html"; // Redirect to dashboard
    });
}
