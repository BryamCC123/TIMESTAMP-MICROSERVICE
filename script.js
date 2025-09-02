// DOM elements
const dateInput = document.getElementById('dateInput');
const testButton = document.getElementById('testButton');
const apiResult = document.getElementById('apiResult');
const unixValue = document.getElementById('unixValue');
const utcValue = document.getElementById('utcValue');

// Update current time every second
function updateCurrentTime() {
    const now = new Date();
    unixValue.textContent = now.getTime();
    utcValue.textContent = now.toUTCString();
}

// API function
function getTimestamp(dateString) {
    let date;
    
    // Handle empty parameter
    if (!dateString) {
        date = new Date();
    } 
    // Handle UNIX timestamp (number)
    else if (!isNaN(dateString)) {
        date = new Date(parseInt(dateString));
    }
    // Handle date string
    else {
        date = new Date(dateString);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        return { error: "Invalid Date" };
    }
    
    return {
        unix: date.getTime(),
        utc: date.toUTCString()
    };
}

// Event listener for test button
testButton.addEventListener('click', () => {
    const input = dateInput.value;
    const result = getTimestamp(input);
    apiResult.textContent = JSON.stringify(result, null, 2);
});

// Handle Enter key press
dateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        testButton.click();
    }
});

// Provide some example on load
window.addEventListener('load', () => {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    const exampleResult = getTimestamp("2015-12-25");
    apiResult.textContent = JSON.stringify(exampleResult, null, 2);
});