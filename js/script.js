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

function getRandomIntInclusive(min, max) {
  // Taken from https://shorturl.at/TSjlB
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getRandomWords() {
  const words = [
    "NOOO!", "WHAT?", "Serious?",
    "Holy Moly!", "Buhbye!", "Sleeping?"
  ]
  return words[getRandomIntInclusive(0, words.length - 1)];
}

function handleClearEntry() {
  if (!isNaN(minorDisplay.textContent)) {
    currNumber = currNumber.slice(0, -1);
    minorDisplay.textContent = currNumber;
  } else {
    if (!minorDisplay.textContent.includes("ANS")) {
      if (isNaN(minorDisplay.textContent.at(-1))) {
        return;
      }
      if (currNumber === null) {
        minorDisplay.textContent = "ANS";
        return;
      }
      currNumber = currNumber.slice(0, -1);
      minorDisplay.textContent = prevNumber.concat(operator).concat(currNumber);
    } else {
      if (minorDisplay.textContent.at(-1) === "S") {
        return;
      }
      currNumber = currNumber.slice(0, -1);
      minorDisplay.textContent = "ANS".concat(operator).concat(currNumber);
    }
  }
}

function handleAllClear() {
  result = null;
  operator = null;
  prevNumber = null;
  currNumber = null;
  minorDisplay.textContent = "";
  majorDisplay.textContent = "0";
}

function handleEquals(arg) {
  equalsPressed = true;
  if (currNumber === null) {
    minorDisplay.textContent = "";
    majorDisplay.textContent = getRandomWords();
    setTimeout(() => { handleAllClear(); }, 0.75 * 1000);
    return;
  }
  if (operator !== null) {
    result = operate(+prevNumber, operator, +currNumber);
    if (result.toString().length > 10) {
      result = result.toPrecision(4);
    }
    majorDisplay.textContent = result
    prevNumber = result;
    currNumber = null;
  } else {
    majorDisplay.textContent = currNumber;
    minorDisplay.textContent = "";
  }
}

function handleDecimals(arg) {
  if (currNumber.includes(".")) {
    return;
  }
  minorDisplay.textContent += arg;
  currNumber += arg;
}

function handleOperators(arg) {
  if (prevNumber == null && currNumber == null) {
    majorDisplay.textContent = getRandomWords();
    setTimeout(() => { handleAllClear(); }, 0.75 * 1000);
    return;
  }
  if (operator === null) {
    if (equalsPressed) {
      equalsPressed = false;
      minorDisplay.textContent = "ANS";
    }
    prevNumber = currNumber;
    currNumber = null;
  } else if (currNumber !== null) {
    minorDisplay.textContent = "ANS";
    result = operate(+prevNumber, operator, +currNumber);
    if (result.toString().length > 10) {
      result = result.toPrecision(4);
    }
    majorDisplay.textContent = result;
    prevNumber = result;
    currNumber = null;
  } else if (currNumber === null) {
    if (equalsPressed) {
      equalsPressed = false;
      if (!majorDisplay.textContent.includes("ANS")) {
        minorDisplay.textContent = "ANS";
      }
    } else {
      minorDisplay.textContent = (
        minorDisplay.textContent.slice(0, minorDisplay.textContent.length - 1)
      );
    }
  }
  minorDisplay.textContent += arg;
  operator = arg;
}

function handleNumbers(arg) {
  if (equalsPressed) {
    equalsPressed = false;
    handleAllClear();
  }
  minorDisplay.textContent += arg;
  if (currNumber === null) {
    currNumber = "";
  }
  currNumber += arg;
}

function handleCalculation(arg) {
  switch (arg) {
    case "0": case "1":
    case "2": case "3":
    case "4": case "5":
    case "6": case "7":
    case "8": case "9":
      handleNumbers(arg);
      break;
    case "/": case "*":
    case "-": case "+":
      handleOperators(arg);
      break;
    case ".":
      handleDecimals(arg);
      break;
    case "=":
      handleEquals(arg);
      break;
    case "AC":
    case "Delete":
      handleAllClear();
      break;
    case "DEL":
    case "Backspace":
      handleClearEntry();
      break;
  }
}

function handleEvent(e) {
  let arg = null;
  if (e.type === "click") {
    arg = e.target.textContent;
  } else if (e.type === "keyup") {
    arg = e.key;
  }
  handleCalculation(arg);
}

let result = null;
let operator = null;
let prevNumber = null;
let currNumber = null;

let equalsPressed = false;

const buttons = document.querySelectorAll(".btn");
const minorDisplay = document.querySelector(".minor-display");
const majorDisplay = document.querySelector(".major-display");

document.querySelector("html").addEventListener("keyup", handleEvent);
buttons.forEach(button => button.addEventListener("click", handleEvent));