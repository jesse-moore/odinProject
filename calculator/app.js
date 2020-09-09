const state = {
  currentInput: "",
  firstNumber: null,
  secondNumber: null,
  operator: null,
  output: "",
};

const numberKeys = [
  ".",
  "0",
  "Negate",
  "3",
  "2",
  "1",
  "6",
  "5",
  "4",
  "9",
  "8",
  "7",
].reverse();

const operatorKeys = ["/", "X", "-", "+"];
const functionKeys = ["Clear", "Back"];

const buildCalculator = () => {
  const mainDiv = document.querySelector(".main");

  const numberButtonsDiv = buildKeysFromArray(numberKeys, "number-keys");
  const operatorButtonsDiv = buildKeysFromArray(operatorKeys, "operator-keys");
  const functionButtonsDiv = buildKeysFromArray(functionKeys, "function-keys");
  const equalsButtonDiv = buildKeysFromArray(["="], "equals-button");
  const displayDiv = buildDisplay();

  mainDiv.append(
    displayDiv,
    numberButtonsDiv,
    functionButtonsDiv,
    operatorButtonsDiv,
    equalsButtonDiv
  );
};

const handleClick = ({ name, value }) => {
  if (name === "function") return handleFunction(value);
  if (name === "operator") return handleOperator(value);
  if (name === "equals") return handleOperator(value);
  if (name === "number") return handleNumber(value);
};

const updateDisplay = () => {
  const { firstNumber, secondNumber } = state;
  const newOutput = [firstNumber, secondNumber].reduce((a, b) =>
    b === null ? a : b
  );
  state.output = newOutput;
  document.querySelector("#display").innerHTML = state.output;
  console.log(state);
};

const handleFunction = (value) => {
  if (value === "clear") return handleClear();
  if (value === "back") return handleBack();
};

const handleNumber = (value) => {
  const { firstNumber, secondNumber, operator } = state;
  if (operator === null) {
    const prevNumber = firstNumber === null ? "" : firstNumber;
    const newNumber = `${prevNumber}${value}`;
    state.firstNumber = newNumber;
  } else {
    const prevNumber = secondNumber === null ? "" : secondNumber;
    const newNumber = `${prevNumber}${value}`;
    state.secondNumber = newNumber;
  }
  updateDisplay();
};

const handleOperator = (value) => {
  if (state.firstNumber === null) return;
  if (state.secondNumber !== null) {
    const { firstNumber, secondNumber, operator } = state;
    const result = calc.calculate({
      firstNumber,
      secondNumber,
      operator,
    });
    const newFirstNumber =
      result.toString().length > 10 ? roundNumber(result) : result;
    state.secondNumber = null;
    state.firstNumber = newFirstNumber;
  } else {
    state.operator = value === "=" ? state.operator : value;
  }
  updateDisplay();
};

const roundNumber = (num) => {
  const sign = Math.sign(num);
  const absNum = Math.abs(num);
  if (absNum > Math.pow(10, 10)) {
    return Number.parseFloat(absNum * sign).toExponential(4);
  }
  const base = Math.ceil(Math.log10(absNum));
  return absNum.toPrecision(13 - base) * sign;
};

const handleClear = () => {
  state.output = "";
  state.currentInput = "";
  state.firstNumber = null;
  state.secondNumber = null;
  state.operator = null;
  updateDisplay();
};

const handleBack = () => {};

const buildDisplay = () => {
  const container = document.createElement("div");
  container.className = "display-container";
  const display = document.createElement("span");
  display.id = "display";
  container.append(display);
  return container;
};

const buildKeysFromArray = (arr, className) => {
  const buttons = arr.map((key) => {
    const button = document.createElement("button");
    button.name = className.match(/^\w+/g)[0];
    button.value = key.toLowerCase();
    button.innerHTML = key;
    button.addEventListener("click", ({ target }) => {
      handleClick(target);
    });
    return button;
  });
  const div = document.createElement("div");
  div.className = className;
  div.append(...buttons);
  return div;
};

buildCalculator();
