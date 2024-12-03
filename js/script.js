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

function handleEvent(e) {
  let arg = null;
  if (e.type === "click") {
    arg = e.target.textContent;
  }
  calculate(arg);
}

let result = null
let operator = null;
let firstNumber = null;
let secondNumber = null;

const buttons = document.querySelectorAll(".btn");
const minorDisplay = document.querySelector(".minor-display");
const majorDisplay = document.querySelector(".major-display");

buttons.forEach(button => button.addEventListener("click", handleEvent));