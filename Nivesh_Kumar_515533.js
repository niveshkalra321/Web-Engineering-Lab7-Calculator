let screen = document.getElementById("calcScreen");
let menuBtn = document.getElementById("menuBtn");
let subMenu = document.getElementById("subMenu");

let standardKeypad = document.getElementById("standardKeypad");
let scientificPanel = document.getElementById("scientificPanel");
let unitPanel = document.getElementById("unitPanel");
let currencyPanel = document.getElementById("currencyPanel");

// Toggle the three-dots sub-menu visibility
menuBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    subMenu.style.display = (subMenu.style.display === "block") ? "none" : "block";
});

// Hide sub-menu when clicking outside
window.addEventListener("click", function () {
    subMenu.style.display = "none";
});

// Append values for standard calculator
function appendValue(value) {
    if (screen.value === "0" || screen.value === "Error") {
        screen.value = value;
    } else {
        screen.value += value;
    }
}

// Clear screen
function clearScreen() {
    screen.value = "0";
}

// Calculate standard arithmetic expressions safely
function calculateResult() {
    try {
        screen.value = eval(screen.value);
    } catch (error) {
        screen.value = "Error";
    }
}

// Switch between calculator modes via the sub-menu
function switchMode(mode) {
    subMenu.style.display = "none";

    // Hide all panels first
    standardKeypad.style.display = "none";
    scientificPanel.style.display = "none";
    unitPanel.style.display = "none";
    currencyPanel.style.display = "none";

    // Show selected panel
    if (mode === "standard") {
        standardKeypad.style.display = "grid";
    } else if (mode === "scientific") {
        scientificPanel.style.display = "block";
    } else if (mode === "unit") {
        unitPanel.style.display = "block";
    } else if (mode === "currency") {
        currencyPanel.style.display = "block";
    }
}

// Scientific Calculator Operations
function sciCalc(operation) {
    let val = parseFloat(screen.value);
    if (isNaN(val)) {
        screen.value = "Error";
        return;
    }
    switch (operation) {
        case 'sqrt':
            screen.value = Math.sqrt(val);
            break;
        case 'sqr':
            screen.value = Math.pow(val, 2);
            break;
        case 'sin':
            screen.value = Math.sin(val * (Math.PI / 180)); // degrees to radians
            break;
        case 'cos':
            screen.value = Math.cos(val * (Math.PI / 180));
            break;
        case 'tan':
            screen.value = Math.tan(val * (Math.PI / 180));
            break;
    }
}

// Unit Conversion Logic (Meters to Feet)
function convertUnits() {
    let meters = document.getElementById("unitInput").value;
    let resultP = document.getElementById("unitResult");
    if (meters === "") {
        resultP.innerText = "Please enter a value.";
        return;
    }
    let feet = meters * 3.28084;
    resultP.innerText = `${meters} Meters = ${feet.toFixed(2)} Feet`;
}

// Currency Conversion Logic (USD to PKR estimation)
function convertCurrency() {
    let usd = document.getElementById("currInput").value;
    let resultP = document.getElementById("currResult");
    if (usd === "") {
        resultP.innerText = "Please enter an amount.";
        return;
    }
    // Estimated conversion rate example
    let exchangeRate = 278.5;
    let pkr = usd * exchangeRate;
    resultP.innerText = `$${usd} USD = Rs. ${pkr.toFixed(2)} PKR`;
}