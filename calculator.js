var calculatorTotal = 0;
var calculatorOperand = 0;
var calculatorOperation = "default";

var calculatorScreenBottomText = document.getElementById("calc-screen-bot-text");

var clearButton = document.getElementById("clear-button");
var negateButton = document.getElementById("negate-button");
var percentageButton = document.getElementById("percentage-button");

var divideButton = document.getElementById("divide-button");
var multiplyButton = document.getElementById("multiply-button");
var subtractButton = document.getElementById("subtract-button");
var additionButton = document.getElementById("addition-button");
var equalsButton = document.getElementById("equals-button");

var numberNineButton = document.getElementById("number-nine-button");
var numberEightButton = document.getElementById("number-eight-button");
var numberSevenButton = document.getElementById("number-seven-button");
var numberSixButton = document.getElementById("number-six-button");
var numberFiveButton = document.getElementById("number-five-button");
var numberFourButton = document.getElementById("number-four-button");
var numberThreeButton = document.getElementById("number-three-button");
var numberTwoButton = document.getElementById("number-two-button");
var numberOneButton = document.getElementById("number-one-button");
var numberZeroButton = document.getElementById("number-zero-button");

var decimalButton = document.getElementById("decimal-button");
var startDecimal = false;

// Assign functions to onclick events for all calculator buttons

clearButton.onclick = clearButtonClick;
negateButton.onclick = negateButtonClick;
percentageButton.onclick = percentageButtonClick;

divideButton.onclick = divideButtonClick;
multiplyButton.onclick = multiplyButtonClick;
subtractButton.onclick = subtractButtonClick;
additionButton.onclick = additionButtonClick;
equalsButton.onclick = equalsButtonClick;

numberNineButton.onclick = function(){ numberButtonClick(9); };
numberEightButton.onclick = function(){ numberButtonClick(8); };
numberSevenButton.onclick = function(){ numberButtonClick(7); };
numberSixButton.onclick = function(){ numberButtonClick(6); };
numberFiveButton.onclick = function(){ numberButtonClick(5); };
numberFourButton.onclick = function(){ numberButtonClick(4); };
numberThreeButton.onclick = function(){ numberButtonClick(3); };
numberTwoButton.onclick = function(){ numberButtonClick(2); };
numberOneButton.onclick = function(){ numberButtonClick(1); };
numberZeroButton.onclick = function(){ numberButtonClick(0); };

decimalButton.onclick = decimalButtonClick;


// Calculator button functions

// Top row buttons
function updateCalculatorDisplay() {
    if(calculatorOperation == "default")
        calculatorScreenBottomText.innerHTML = calculatorTotal.toString();
    else
        calculatorScreenBottomText.innerHTML = calculatorOperand.toString();

    if(startDecimal) {
        calculatorScreenBottomText.innerHTML += '.';
    }
}

function clearButtonClick() {
    calculatorTotal = 0;
    calculatorOperand = 0;
    calculatorOperation = "default";

    updateCalculatorDisplay();
}

function negateButtonClick() {
    calculatorTotal *= -1;
    updateCalculatorDisplay();
}

function percentageButtonClick() {
    calculatorTotal = calculatorTotal / 100;
    updateCalculatorDisplay();
}

// Operation buttons
function divideButtonClick() {
    calculatorOperation = "divide";
}

function multiplyButtonClick() {
    calculatorOperation = "multiply";
}

function subtractButtonClick() {
    calculatorOperation = "subtract";
}

function additionButtonClick() {
    calculatorOperation = "addition";
}

function equalsButtonClick() {
    switch(calculatorOperation) {
        case "addition":
            calculatorTotal += calculatorOperand;
            break;
        case "subtract":
            calculatorTotal -= calculatorOperand;
            break;
        case "multiply":
            calculatorTotal *= calculatorOperand;
            break;
        case "divide":
            if(calculatorOperand != 0) {
                calculatorTotal /= calculatorOperand;
                break;
            }
            else {
                divideByZero();
                break;
            }
    }

    calculatorOperand = 0;
    calculatorOperation = "default";

    updateCalculatorDisplay();
}

function divideByZero()
{
    calculatorScreenBottomText.innerHTML = "Divide by 0";
    calculatorTotal = 0;
}

// Number button

function numberButtonClick(number) {
    if(startDecimal) {  // If starting a new decimal
        if(calculatorOperation == "default") {
            calculatorTotal = Number(calculatorTotal.toString() + '.' + number.toString());
            startDecimal = false;
        }
        else {
            calculatorOperand = Number(calculatorOperand.toString() + '.' + number.toString());
            startDecimal = false;
        }
    }
    else {  // If not starting a new decimal
        if(calculatorOperation == "default")    // If no operation has been assigned, only change the total
            calculatorTotal = Number(calculatorTotal.toString() + number.toString());
        else if(calculatorOperand == 0) // If an operation has been assigned but
            calculatorOperand = number;         // the operand is 0, replace the operand with the first number pressed.
        else    // If an operation has been assigned and the operand is not zero, append new numbers to the operand.
           calculatorOperand = Number(calculatorOperand.toString() + number.toString());
    }
    updateCalculatorDisplay();
}

// Decimal button

function decimalButtonClick() {
    if(!(calculatorTotal.toString().includes('.')))
    {
        calculatorTotal = Number(calculatorTotal.toString() + '.');
        startDecimal = true;
    }

    updateCalculatorDisplay();
}