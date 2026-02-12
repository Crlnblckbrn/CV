const mainFig = document.getElementById('figure');
const navFig = document.getElementById('nav-figure');
const startDisplay = document.getElementById('day-start-display');
const incBtn = document.getElementById('increaseBtn');
const resBtn = document.getElementById('resetBtn');
const statusText = document.getElementById('status-text');
const timerBox = document.getElementById('timer-box');
const countdownEl = document.getElementById('countdown');

let timerInterval;

function updateUI() {
    let currentBalance = parseFloat(localStorage.getItem('figure')) || 1000;
    let dayStartBalance = parseFloat(localStorage.getItem('dayStartBalance')) || 1000;
    let clickData = JSON.parse(localStorage.getItem('clickData')) || { count: 0, date: "" };
    
    const now = new Date();
    const todayStr = now.toDateString();

    // Daily Reset Logic
    if (clickData.date !== todayStr) {
        dayStartBalance = currentBalance; 
        clickData = { count: 0, date: todayStr };
        localStorage.setItem('dayStartBalance', dayStartBalance);
        localStorage.setItem('clickData', JSON.stringify(clickData));
    }

    const format = (num) => num.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    mainFig.innerText = format(currentBalance);
    navFig.innerText = format(currentBalance);
    startDisplay.innerText = format(dayStartBalance);

    if (clickData.count >= 2) {
        incBtn.disabled = true;
        timerBox.style.display = "block";
        statusText.innerHTML = "<strong>Limit Reached!</strong> Advice: Wait for tomorrow.";
        startCountdown();
    } else {
        incBtn.disabled = false;
        timerBox.style.display = "none";
        statusText.innerText = `Increments used today: ${clickData.count}/2`;
        clearInterval(timerInterval);
    }
    
    return { currentBalance, clickData };
}

function startCountdown() {
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setHours(24, 0, 0, 0); // Sets to 00:00:00 of the next day

        const diff = tomorrow - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            updateUI(); // Refresh UI to unlock button
            return;
        }

        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdownEl.innerText = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

incBtn.addEventListener('click', () => {
    let { currentBalance, clickData } = updateUI();
    if (clickData.count < 2) {
        localStorage.setItem('figure', currentBalance * 1.10);
        clickData.count++;
        localStorage.setItem('clickData', JSON.stringify(clickData));
        updateUI();
    }
});

resBtn.addEventListener('click', () => {
    if(confirm("Full system reset to $1,000?")) {
        localStorage.clear();
        clearInterval(timerInterval);
        updateUI();
    }
});

updateUI();
