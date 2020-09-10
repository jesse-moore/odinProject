class calc {
  static add(a, b) {
    return Number.parseFloat(a) + Number.parseFloat(b);
  }
  static subtract(a, b) {
    return Number.parseFloat(a) - Number.parseFloat(b);
  }
  static multiply(a, b) {
    return Number.parseFloat(a) * Number.parseFloat(b);
  }
  static divide(a, b) {
    return Number.parseFloat(a) / Number.parseFloat(b);
  }
  static calculate({ firstNumber, secondNumber, operator }) {
    switch (operator) {
      case "+":
        return this.add(firstNumber, secondNumber);
      case "-":
        return this.subtract(firstNumber, secondNumber);
      case "x":
        return this.multiply(firstNumber, secondNumber);
      case "/":
        return this.divide(firstNumber, secondNumber);
      default:
        return firstNumber;
    }
  }
}
