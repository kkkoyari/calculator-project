const display = document.querySelector(".display > .display");
const keys = document.querySelector(".keys");

let firstOperand = null;
let operator = null;
let secondOperand = null;

let displayValue = "0";
display.textContent = displayValue;

keys.addEventListener("click", (e) => {
	if (!e.target.matches("button")) return;

  	const button = e.target;

	if (button.dataset.digit) {
		if (displayValue === "0") {
			displayValue = button.dataset.digit;
			display.textContent = button.textContent;
		} else {
			displayValue += button.dataset.digit;
			display.textContent += button.textContent;
		}
	}

	if (button.dataset.operator) {
		if (displayValue === "0") {
			displayValue = button.dataset.operator;
			display.textContent = button.textContent;
		} else {
			displayValue += button.dataset.operator;
			display.textContent += button.textContent;
		}
	}

	if (button.dataset.action === "clear") {
		displayValue = "0";
		display.textContent = displayValue;
	}

	if (button.dataset.action === "decimal") {
		if (displayValue === "0") {
			displayValue = button.textContent;
			display.textContent = button.textContent;
		} else {
			displayValue += button.textContent;
			display.textContent += button.textContent;
		}
	}

});

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