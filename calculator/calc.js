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
  static negate(a) {
    return Number.parseFloat(a) * -1;
  }
  static calculate({ firstNumber, secondNumber, operator }) {
    switch (operator) {
      case "+":
        return this.add(firstNumber, secondNumber).toString();
      case "-":
        return this.subtract(firstNumber, secondNumber).toString();
      case "x":
        return this.multiply(firstNumber, secondNumber).toString();
      case "/":
        return this.divide(firstNumber, secondNumber).toString();
      default:
        return firstNumber;
    }
  }
}
