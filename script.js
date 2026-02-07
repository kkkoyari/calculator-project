const display = document.querySelector(".display > .display");
const keys = document.querySelector(".keys");

let firstOperand = null;
let operator = null;
let secondOperand = null;

let displayValue = "0";
display.textContent = displayValue;

let waitingForFirstOperand = true;
let waitingForSecondOperand = false;
let replaceOnNextDigit = false;
let negativeNumber = true

keys.addEventListener("click", (e) => {
	if (!e.target.matches("button")) return;

  	const button = e.target;

	if (button.dataset.digit) {
		if (displayValue === "0" && waitingForFirstOperand) {
			displayValue = button.dataset.digit;
			display.textContent = button.textContent;
			firstOperand = displayValue;
			
			negativeNumber = false;

		} else if (waitingForFirstOperand) {
			displayValue += button.dataset.digit;
			display.textContent += button.textContent;
			firstOperand = displayValue;

		} else if (waitingForSecondOperand && replaceOnNextDigit) {
			displayValue = button.dataset.digit;
			display.textContent = button.textContent;
			secondOperand = displayValue;

			replaceOnNextDigit = false;

		} else if (waitingForSecondOperand && !replaceOnNextDigit) {
			displayValue += button.dataset.digit;
			display.textContent += button.textContent;
			secondOperand = displayValue;
			
		}
	}

	if (button.dataset.operator) {
		if (displayValue === "0" && negativeNumber) {
			displayValue = button.dataset.operator;
			display.textContent = button.textContent;

			negativeNumber = false;

		} else if (waitingForFirstOperand) {
			operator = button.dataset.operator;

			waitingForFirstOperand = false;
			waitingForSecondOperand = true;
			replaceOnNextDigit = true;

		} else if (waitingForSecondOperand && replaceOnNextDigit) {
			operator = button.dataset.operator;

		} else if (waitingForSecondOperand && !replaceOnNextDigit) {
			// also should work if user enters negative number after division or multiply operators

			let result = operate(firstOperand, operator, secondOperand);

			firstOperand = result;
			displayValue = result;
			display.textContent = result;
			operator = button.dataset.operator;

			replaceOnNextDigit = true;

		}
	}

	if (button.dataset.action === "clear") {
		displayValue = "0";
		display.textContent = displayValue;
		firstOperand = null;
		operator = null;
		secondOperand = null;

		waitingForFirstOperand = true;
		waitingForSecondOperand = false;
		negativeNumber = true;
		replaceOnNextDigit = false;

	}

	if (button.dataset.action === "decimal") {
		displayValue = displayValue.toString();

		if (displayValue === "0") {
			displayValue += button.textContent;
			display.textContent += button.textContent;

		} else if (displayValue.includes(".") !== true) {
			displayValue += button.textContent;
			display.textContent += button.textContent;

		}
	}

	if (button.dataset.action === "delete") {
		displayValue = displayValue.toString();

		if (displayValue !== "0") {
			displayValue = displayValue.substring(0, displayValue.length - 1);
			display.textContent = displayValue;
		
			if (displayValue === "") {
				displayValue = "0";
				display.textContent = displayValue;

				negativeNumber = true;

			}
		}
	}

	if (button.dataset.action === "equals") {
		let result = operate(firstOperand, operator, secondOperand);

		firstOperand = result;
		displayValue = result;
		display.textContent = result;

		waitingForFirstOperand = true;
		waitingForSecondOperand = false;
		replaceOnNextDigit = true;

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