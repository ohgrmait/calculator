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

function enableButtons() {
  for (const button of buttons) {
    if (button.disabled === true) {
      button.disabled = false;
      button.style.color = "white";
    }
  }
}

function disableButtons() {
  for (const button of buttons) {
    button.disabled = true;
    button.style.color = "#cc313e5f";
  }
}

function commenceExplosion() {
  disableButtons();
  countdown.play();
  minorDisplay.textContent = "Staring explosion sequence..";
  majorDisplay.textContent = "";
  setTimeout(() => {
    minorDisplay.textContent = "Get ready to explode..";
    majorDisplay.textContent = 3;
  }, 1.0 * 1000);
  setTimeout(() => {
    minorDisplay.textContent = "Get up and run..";
    majorDisplay.textContent = 2;
  }, 2.0 * 1000);
  setTimeout(() => {
    minorDisplay.textContent = "Too late now..";
    majorDisplay.textContent = 1;
  }, 3.0 * 1000);
  setTimeout(() => {
    blastoff.play();
    minorDisplay.textContent = "";
    majorDisplay.textContent = "BOOOOOOOOM!";
  }, 4.0 * 1000);
  setTimeout(() => {
    enableButtons();
    handleAllClear();
  }, 5.0 * 1000);
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
  errorAudio.play();
  return words[getRandomIntInclusive(0, words.length - 1)];
}

function handleClearEntry() {
  if (!isNaN(minorDisplay.textContent)) {
    if (currNumber === null) {
      disableButtons();
      minorDisplay.textContent = "";
      majorDisplay.textContent = getRandomWords();
      setTimeout(() => {
        enableButtons();
        handleAllClear();
      }, 0.75 * 1000);
      return;
    }
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
    disableButtons();
    minorDisplay.textContent = "";
    majorDisplay.textContent = getRandomWords();
    setTimeout(() => {
      enableButtons();
      handleAllClear();
    }, 0.75 * 1000);
    return;
  }
  if (operator !== null) {
    result = operate(+prevNumber, operator, +currNumber);
    if (isNaN(result) || result === Infinity) {
      commenceExplosion();
      return;
    }
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
  if (currNumber === null) {
    disableButtons();
    minorDisplay.textContent = "";
    majorDisplay.textContent = getRandomWords();
    setTimeout(() => {
      enableButtons();
      handleAllClear();
    }, 0.75 * 1000);
    return;
  }
  if (currNumber.includes(".")) {
    return;
  }
  minorDisplay.textContent += arg;
  currNumber += arg;
}

function handleOperators(arg) {
  if (prevNumber == null && currNumber == null) {
    disableButtons();
    majorDisplay.textContent = getRandomWords();
    setTimeout(() => {
      enableButtons();
      handleAllClear();
    }, 0.75 * 1000);
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
    if (isNaN(result) || result === Infinity) {
      commenceExplosion();
      return;
    }
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
    case "CE":
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

const errorAudio = document.querySelector("#error");
const blastoff = document.querySelector("#blastoff");
const countdown = document.querySelector("#countdown");

const minorDisplay = document.querySelector(".minor-display");
const majorDisplay = document.querySelector(".major-display");

document.querySelector("html").addEventListener("keyup", handleEvent);
buttons.forEach(button => button.addEventListener("click", handleEvent));