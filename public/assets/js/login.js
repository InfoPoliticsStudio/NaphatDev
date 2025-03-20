async function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("");
        const employees = await response.json();

        const employee = employees.find(t => t.username === username && t.password === password);

        if (employee) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(employee));
            window.location.href = "dashboard.html";  
        } else {
            document.getElementById("error").textContent = "";
        }
    } catch (error) {
        console.error("", error);
    }
}
