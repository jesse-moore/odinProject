console.log(calc.add(1, 2));

const state = { output: "" };

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
  prevOutput = state.output;
  state.output = `${prevOutput}${value}`;
  updateDisplay();
  return console.log(name, value);
};

const updateDisplay = () => {
  document.querySelector("#display").innerHTML = state.output;
};

const handleFunction = (value) => {
  if (value === "clear") return handleClear();
  if (value === "back") return handleClear();
};

const handleClear = () => {
  state.output = "";
  updateDisplay();
};

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
