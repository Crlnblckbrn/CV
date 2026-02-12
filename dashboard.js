// Run this when the dashboard page loads
window.onload = function() {
    const user = sessionStorage.getItem("loggedInUser");

    if (user) {
        document.getElementById("welcome-message").innerText = `Hello, ${user}!`;
    } else {
        // Redirect back if they try to access dashboard without logging in
        window.location.href = "login.html";
    }
};

function logout() {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
