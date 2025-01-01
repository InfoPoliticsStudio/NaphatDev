document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (username && email && password) {
        document.getElementById('successMessage').classList.remove('hidden');
        console.log('User Registered:', { username, email });
        this.reset(); // Reset the form
    }
});
