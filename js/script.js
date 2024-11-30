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

const digitButtons = document.querySelectorAll(".buttons .num");

digitButtons.forEach((digitButton) => {
  digitButton.addEventListener("click", () => {
    display.textContent = digitButton.textContent;
  });
});