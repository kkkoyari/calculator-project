let firstOperand = null;
let operator = null;
let secondOperand = null;


function add (a, b) {
	let result = a + b;
	return result;
}

function subtract (a, b) {
	let result = a - b;
	return result;
}

function multiply (a, b) {
	let result = a * b;
	return result;
}

function divide (a, b) {
	if (b === 0) return "Oops! You can't divide by 0.";
  	return a / b;
}


function operate(a, operator, b) {
	const x = Number(a);
  	const y = Number(b);

  	if (Number.isNaN(x) || Number.isNaN(y)) return null;

	if (operator === "+") {
		return add(x, y);
	} else if (operator === "-") {
		return subtract(x, y);
	} else if (operator === "*") {
		return multiply(x, y);
	} else if (operator === "/") {
		return divide(x, y);
	}

}

// operate(firstOperand, operator, secondOperand);