function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(firstNumber, operator, secondNumber) {
  let result = null;
  switch (operator) {
    case "+":
      result = add(firstNumber, secondNumber);
      break;
    case "-":
      result = subtract(firstNumber, secondNumber);
      break;
    case "*":
      result = multiply(firstNumber, secondNumber);
      break;
    case "/":
      result = divide(firstNumber, secondNumber);
      break;
  }
  return result;
}

let firstNumber = 3.34;
let operator = "/";
let secondNumber = -23;

const display = document.querySelector(".display");

const clearButton = document.querySelector(".buttons .cls");
const operButtons = document.querySelectorAll(".buttons .oper");
const digitButtons = document.querySelectorAll(".buttons .num");

clearButton.addEventListener("click", () => {
  display.textContent = '';
});

operButtons.forEach((operButton) => {
  operButton.addEventListener("click", () => {
    display.textContent = operButton.textContent;
  });
});

digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", () => {
    if (display.textContent.length > 10) {
      return;
    }
    display.textContent += digitButton.textContent;
  });
});