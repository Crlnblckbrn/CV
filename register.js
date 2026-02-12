function register() {
    const user = document.getElementById("reg-username").value;
    const pass = document.getElementById("reg-password").value;

    // 1. Get existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 2. Check if username already exists
    if (users.find(u => u.username === user)) {
        alert("Username already taken!");
        return;
    }

    // 3. Add new user object and save back to localStorage
    users.push({ username: user, password: pass });
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Registration Successful!");
}
