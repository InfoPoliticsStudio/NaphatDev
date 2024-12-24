// Function to fetch users from users.json
async function fetchUsers() {
    try {
        const response = await fetch('users.json');
        if (!response.ok) {
            throw new Error('Failed to load users');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Select input, meta span, button, and message box elements
const input = document.querySelector('input[type="text"]');
const metaSpan = document.querySelector('.has-meta .meta');
const button = document.querySelector('.btn-main.cursor-pointer');
const messageBox = document.querySelector('.t-box');
const actionAA = document.querySelector('.action.aa');
const tRowPassword = document.querySelector('.t-row:nth-child(2)'); // Password row
const textCenterHeading = document.querySelector('.text-center._heading');
const actionAB = document.querySelector('.action.ab');
const passwordInput = document.querySelector('input[type="password"]');
const loginButton = document.querySelector('.action.ab .btn-main.cursor-pointer');

// Event listener for input change
input.addEventListener('input', async () => {
    const value = input.value.trim();
    const users = await fetchUsers(); // Fetch users
    const student = users.find(student => student.id === value);

    // Enable button if input has value
    if (value) {
        button.classList.remove('disabled');
    } else {
        button.classList.add('disabled');
    }

    // Update meta span based on student data
    if (student) {
        metaSpan.textContent = "(ถูกต้อง)";
        metaSpan.style.color = "#0b9c23"; // Change text color
    } else {
        metaSpan.textContent = "";
    }
});

// Event listener for verifying student ID
button.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const value = input.value.trim();
    const users = await fetchUsers(); // Fetch users
    const student = users.find(student => student.id === value);

    if (student) {
        // If valid ID
        input.value = student.id;
        input.readOnly = true; // Make input read-only
        input.style.backgroundImage = "url(https://student.mytcas.com/assets/img/i/i-yes.svg)";
        input.style.backgroundSize = "30px 20px";
        input.style.backgroundColor = "#fff";
        input.style.backgroundRepeat = "no-repeat";
        input.style.backgroundPosition = "right center";
        input.style.cursor = "not-allowed";

        // Show password login prompt
        actionAA.innerHTML = `
            <div class="text-center">
                <p><a class="_heading cursor-pointer">เข้าสู่ระบบด้วยรหัสผ่าน</a></p>
            </div>
        `;
    } else {
        // If invalid ID
        messageBox.className = 't-box -error -half';
        messageBox.innerHTML = `
            <h2>ผิดพลาด</h2>
            รูปแบบเลขประจำตัวของท่านไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้ง
        `;
    }
});

// Event listener for "Login with Password"
actionAA.addEventListener('click', () => {
    tRowPassword.style.display = 'flex';
    textCenterHeading.style.display = 'block';
    actionAB.style.display = 'block';
    actionAA.style.display = 'none';
});

// Event listener for password verification
loginButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission
    const passwordValue = passwordInput.value.trim();
    const users = await fetchUsers(); // Fetch users
    const student = users.find(student => student.password === passwordValue);

    if (!student) {
        // If invalid password
        messageBox.className = 't-box -error -half';
        messageBox.innerHTML = `
            <h2>ผิดพลาด</h2>
            รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง
        `;
    } else {
        // If valid password
        window.location.href = '/login/dashboard'; // Redirect to profile
        localStorage.setItem('userProfile', JSON.stringify(student)); // Save user profile in localStorage
    }
});

// Event listener for "Enter" key
passwordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        loginButton.click(); // Simulate button click on Enter key
    }
});
