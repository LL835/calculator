const numberButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const currentOperandDisplay = document.querySelector('.current-operand-display');
const previousOperandDisplay = document.querySelector('.previous-operand-display');

let currentOperand = "";
let previousOperand = "";
let chosenOperator = undefined;

function add(a, b) {
    const answer = a + b;
    return answer;
}

function subtract(a, b) {
    const answer = a - b;
    return answer

}

function multiply(a, b){
    const answer = a * b;
    return answer

}

function divide(a, b) {
    const answer = a / b;
    return answer
}

function operate(operator, num1, num2) {
    if (operator === "+") {
        return add(num1, num2);
    } else if (operator === "-") {
        return subtract(num1, num2);
    } else if (operator === "*") {
        return multiply(num1, num2);
    } else if (operator === "/") {
        return divide(num1, num2);
    }
}


function appendNumber(number){
    if (number === "." && currentOperand.includes(".")) return; // don't let the user enter more than one decimal point per number
    if (number === "." && currentOperand === ""){ // if the user enters a decimal as the first character, turn it into "0."
        number = "0."
    }
    currentOperand += number;
    updateDisplay()

}

function updateDisplay(){
    currentOperandDisplay.textContent = currentOperand;
    previousOperandDisplay.textContent = previousOperand;
    if (chosenOperator != undefined) {
    previousOperandDisplay.textContent = previousOperand + ` ${chosenOperator} `; // adds the selected operator to the top screen
    }
}

function selectOperator(operator){
    if (currentOperand === "") return;
    if (previousOperand != "") {
        calculateAnswer()
    }
    chosenOperator = operator;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay()

}

function calculateAnswer(){
    if(isNaN(parseFloat(previousOperand)) || isNaN(parseFloat(currentOperand))) return;
    let answer = operate(chosenOperator, parseFloat(previousOperand), parseFloat(currentOperand));
    answer =  Math.round(answer * 100000) / 100000 // round answer to five decimal places
    currentOperand = answer;
    previousOperand = ""
    chosenOperator = undefined;
    updateDisplay()
}

function clearDisplay(){
    currentOperand = "";
    previousOperand = "";
    chosenOperator = undefined;
    updateDisplay()

}

function deleteNumber(){
    currentOperand = currentOperand.slice(0, -1)
    updateDisplay()

}

clearButton.addEventListener("click", () => {
    clearDisplay()
})


numberButtons.forEach(button => button.addEventListener("click", () => {
    appendNumber(button.textContent);
}))

operatorButtons.forEach(button => button.addEventListener("click", () => {
    selectOperator(button.textContent);
}))

equalsButton.addEventListener("click", () => {
    calculateAnswer()
})

deleteButton.addEventListener("click", () => {
    deleteNumber();
})