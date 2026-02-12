function login() {
    const user = document.getElementById("log-username").value;
    const pass = document.getElementById("log-password").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(u => u.username === user && u.password === pass);

    if (foundUser) {
        // Store only the current logged-in username for the next page
        sessionStorage.setItem("loggedInUser", foundUser.username);
        
        // Redirect to your dashboard page
        window.location.href = "dashboard.html"; 
    } else {
        alert("Invalid credentials!");
    }
}
