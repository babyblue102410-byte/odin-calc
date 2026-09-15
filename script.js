let firstNumber;
let secondNumber;
let operator;
let waitingForSecondNumber = false;
let lastSecondNumber;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const operatorButtons = document.querySelectorAll(
    ".plus, .minus, .multiply, .divide"
);
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".decimal");

clearButton.addEventListener("click", () => {
    display.textContent = 0;
    firstNumber = null; 
    secondNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    lastSecondNumber = null;
});

buttons.forEach(button => {
    button.addEventListener("click", () => {

        if (button === clearButton ||
            button === deleteButton ||
            button === equalButton ||
            button === decimalButton) {
                return;
            }

        if (button.classList.contains("plus") ||
            button.classList.contains("minus") ||
            button.classList.contains("multiply") ||
            button.classList.contains("divide")) {
                return;
            }

        if (waitingForSecondNumber) {
            display.textContent = button.textContent
            waitingForSecondNumber = false;
            return
        }

        if (display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
    });
});

decimalButton.addEventListener("click", () => {
    if (display.textContent === "0") {
        display.textContent = "0.";
        } else if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        operator = button.textContent;
        firstNumber = Number(display.textContent);
        waitingForSecondNumber = true;
    });
});

function operate(firstNumber, operator, secondNumber) {
    if (operator === "/" && secondNumber === 0) {
        return "The laws of mathematics said no.";
    }

    if (operator === "+") {
        return firstNumber + secondNumber;
    } else if (operator === "-") {
        return firstNumber - secondNumber;
    } else if (operator === "*") {
        return firstNumber * secondNumber;
    } else if (operator === "/") {
        return firstNumber / secondNumber;
    }
}

equalButton.addEventListener("click", () => {
    if (operator === null) {
        return;
    }

    if (waitingForSecondNumber) {
        secondNumber = lastSecondNumber;
    } else {
        secondNumber = Number(display.textContent);
        lastSecondNumber = secondNumber;
    } 

    const result = operate(firstNumber, operator, secondNumber);

    display.textContent = result;

    firstNumber = result;
    waitingForSecondNumber = true;
});

deleteButton.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);

    if (display.textContent === "") {
        display.textContent = "0";
    }
});