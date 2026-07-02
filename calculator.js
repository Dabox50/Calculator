// Get the display element where we show numbers and results
const resultDisplay = document.querySelector('.result');

/**
 * add(value) - Handles when user clicks any number or operator button
 * Works by concatenating values to the display
 */
function add(value) {
    // Prevent multiple leading zeros
    if (value === '0' && resultDisplay.textContent === '0') 
        return;
    
    // Reset display if it shows initial 0
    if (resultDisplay.textContent === '0' && value !== '.') {
        resultDisplay.textContent = value;
    } else {
        resultDisplay.textContent += value;
    }
}

/**
 * del() - Removes the last character (DEL button)
 */
function del() {
    resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
    
    // Show 0 if display is empty
    if (resultDisplay.textContent === '') {
        resultDisplay.textContent = '0';
    }
}

/**
 * resetCalc() - Clears everything and returns to initial state
 */
function resetCalc() {
    resultDisplay.textContent = '0';
}

/**
 * calculate() - Evaluates the math expression and shows result
 * Uses try/catch to handle errors (like division by zero)
 */
function calculate() {
    // Don't calculate if display is empty
    if (resultDisplay.textContent === '' || resultDisplay.textContent === '0') {
        return;
    }

    try {
        // Replace 'x' with '*' because display shows 'x' but JavaScript needs '*'
        let expression = resultDisplay.textContent.replace(/x/g, '*');
        
        // Evaluate the mathematical expression
        let result = eval(expression);
        
        // Round to avoid floating point errors (e.g., 0.1 + 0.2 = 0.30000000000000004)
        result = Math.round(result * 100000000) / 100000000;
        
        // Display the result
        resultDisplay.textContent = result;
    } catch (error) {
        // If there's an error in the expression, show an error message
        resultDisplay.textContent = 'Error';
    }
}

/**
 * THEME SWITCHING FUNCTIONALITY
 * Allows users to switch between 3 different color themes
 */
document.getElementById('theme-selector').addEventListener('click', function(e) {
    // Make sure they clicked a theme button (has 'switch' class)
    if (e.target.classList.contains('switch')) {
        const themeNumber = e.target.value;
        
        // Remove 'active' class from all theme buttons
        document.querySelectorAll('.switch').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add 'active' class only to the clicked button
        e.target.classList.add('active');
        
        // Apply the theme to the entire document
        document.documentElement.setAttribute('data-theme', themeNumber);
        
        // Remember this preference in the browser's storage
        localStorage.setItem('calculator-theme', themeNumber);
    }
});

/**
 * On page load:
 * 1. Check if user has a saved theme preference
 * 2. If not, use their system preference (light or dark mode)
 * 3. Apply that theme
 */
window.addEventListener('DOMContentLoaded', function() {
    let savedTheme = localStorage.getItem('calculator-theme');
    
    // If no saved theme, check system's dark/light mode preference
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = prefersDark ? '1' : '2';  // Dark = Theme 1, Light = Theme 2
    }
    
    // Apply the theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Highlight the active theme button
    document.querySelector(`[value="${savedTheme}"]`).classList.add('active');
    
    // Make sure display shows "0" on load
    if (resultDisplay.textContent === '') {
        resultDisplay.textContent = '0';
    }
});
