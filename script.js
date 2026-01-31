
let currentInput = '0';
let previousInput = '';
let operation = null;

const currentOperandText = document.getElementById('current-operand');
const previousOperandText = document.getElementById('previous-operand');

function updateScreen() {
    currentOperandText.innerText = currentInput;
    if (operation != null) {
        previousOperandText.innerText = previousInput + ' ' + operation;
    } else {
        previousOperandText.innerText = '';
    }
}

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' && button.innerText !== '.') {
            currentInput = button.innerText;
        } else {
            currentInput = currentInput + button.innerText;
        }
        updateScreen();
    });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operation = button.getAttribute('data-op');
        previousInput = currentInput;
        currentInput = '';
        updateScreen();
    });
});

const equalsButton = document.getElementById('equal');
equalsButton.addEventListener('click', () => {
    calculate();
    updateScreen();
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateScreen();
});

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', () => {
    if (currentInput === '0') return;
    currentInput = currentInput.toString().slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateScreen();
});


function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    if (operation === '+') {
        result = prev + current;
    } else if (operation === '-') {
        result = prev - current;
    } else if (operation === '*') {
        result = prev * current;
    } else if (operation === '/') {
        if (current === 0) {
            alert("Cannot divide by zero");
            return;
        }
        result = prev / current;
    } else {
        return;
    }

    currentInput = result;
    operation = null;
    previousInput = '';
}
