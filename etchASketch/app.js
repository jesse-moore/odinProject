class grid {
  constructor() {
    this._defaultGridSize = 16;
  }
  createGrid(size = this._defaultGridSize) {
    const numNodes = Math.pow(size, 2);
    const nodes = [];
    for (let i = 0; i < numNodes; i++) {
      const newDiv = document.createElement("div");
      newDiv.className = "pixel";
      newDiv.style.opacity = 0;
      newDiv.addEventListener("mouseover", ({ target }) => {
        return this.changeOpacity(target);
      });
      nodes.push(newDiv);
    }
    const mainDiv = document.querySelector("#main");
    mainDiv.append(...nodes);
    mainDiv.style.gridTemplateColumns = "auto ".repeat(size);
  }
  removeGrid() {
    const mainDiv = document.querySelector("#main");
    while (mainDiv.firstChild) {
      mainDiv.removeChild(mainDiv.lastChild);
    }
  }
  resetGrid(size = this._defaultGridSize) {
    this.removeGrid();
    this.createGrid(size);
  }
  changeOpacity(node) {
    const currentOpacity = Number.parseFloat(
      document.defaultView
        .getComputedStyle(node, null)
        .getPropertyValue("opacity")
    );
    const newOpacity =
      currentOpacity < 1 ? currentOpacity + 0.1 : currentOpacity;
    node.style.opacity = newOpacity;
  }
  changeColor(node) {
    const currentColor = getComputedStyle(node).getPropertyValue(
      "background-color"
    );
    const currentOpacity = Number.parseInt(currentColor.substr(-2, 1));
    const newOpacity =
      currentOpacity < 100 ? currentOpacity + 10 : currentOpacity;
    const newColor = currentColor.replace(
      `${currentOpacity})`,
      `${newOpacity})`
    );
    console.log(newColor);
    node.style.backgroundColor = newColor;
  }
}

document.querySelector(".clearButton").addEventListener("click", () => {
  const response = prompt("Enter New Grid Size");
  if (response === null) return;
  const newSize = Number.parseInt(response);
  if (!Number.isInteger(newSize) || newSize <= 0) return;
  console.log(!Number.isInteger(newSize));
  console.log(newSize <= 0);
  gridApp.resetGrid(newSize);
});

const gridApp = new grid();
gridApp.createGrid();
