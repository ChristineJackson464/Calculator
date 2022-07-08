const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// CALCULATE FIRST AND SECOND VALUES DEPENDING ON OPERATOR
const calculate = {
    '/' : (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*' : (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+' : (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-' : (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=' : (firstNumber, secondNumber) => secondNumber,
}

// GLOBAL VARIABLE
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // REPLACE CURRENT DISPLAY VALUE IF FIRST VALUE IS ENTERED
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // IF CURRENT DISPLAY = 0, REPLACE, IF NOT, ADD NUMBER;
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // IF OPERATOR PRESSED, DON'T ADD DECIMAL
    if (awaitingNextValue) return;
    // IF NO DECIMAL, ADD ONE
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // PREVENT MULTIPLE OPERATORS
    if (operatorValue &&  awaitingNextValue) {
        operatorValue = operator;
       return; 
    } 
    // ASSIGN FIRST VALuE IF NO VALUE
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // READY FOR NEXT VALUE, STORE OPERATOR
    awaitingNextValue = true;
    operatorValue = operator;
}

// RESET DISPLAY
function resetAll()  {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent ="0";
}

// ADD EVENT LISTENERS FOR NUMBERS, OPERATORS, DECIMAL BTNS
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// EVENT LISTENER 
clearBtn.addEventListener('click', resetAll);