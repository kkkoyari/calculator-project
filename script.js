const display = document.querySelector(".display");
const keys = document.querySelector(".keys");
// Add keyboard support

let firstOperand = null;
let operator = null;
let secondOperand = null;

let displayValue = "0";
display.textContent = displayValue;

let waitingForFirstOperand = true;
let waitingForSecondOperand = false;
let replaceOnNextDigit = false;
let negativeNumber = true
let justEvaluated = false;

keys.addEventListener("click", (e) => {
	if (!e.target.matches("button")) return;

  	const button = e.target;

	if (button.dataset.digit) {
		display.classList.remove("error");

		if (displayValue === "0" && waitingForFirstOperand) {
			displayValue = button.dataset.digit;
			display.textContent = button.textContent;
			firstOperand = displayValue;

			negativeNumber = false;

		} else if (justEvaluated && operator === null) {
			firstOperand = null;
			secondOperand = null;

			waitingForFirstOperand = true;
			waitingForSecondOperand = false;
			replaceOnNextDigit = false;
			justEvaluated = false;

			displayValue = button.dataset.digit;
			display.textContent = button.textContent;
			firstOperand = displayValue;

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
		display.classList.remove("error");

		if (button.dataset.operator === "-" && displayValue === "0" && negativeNumber) {
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
			justEvaluated = false;

		} else if (waitingForSecondOperand && !replaceOnNextDigit) {

			let result = operate(firstOperand, operator, secondOperand);

			if (result === "Oops! You can't divide by 0.") {
				display.classList.add("error");
			}

			firstOperand = result;
			displayValue = result;
			display.textContent = result;
			operator = button.dataset.operator;
			secondOperand = null;

			replaceOnNextDigit = true;
			justEvaluated = false;

		}
	}

	if (button.dataset.action === "clear") {
		display.classList.remove("error");

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
		display.classList.remove("error");
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
		display.classList.remove("error");
		displayValue = displayValue.toString();

		if (display.textContent === "Oops! You can't divide by 0.") {

			displayValue = "0";
			display.textContent = displayValue;
			firstOperand = null;
			operator = null;
			secondOperand = null;

			waitingForFirstOperand = true;
			waitingForSecondOperand = false;
			negativeNumber = true;
			replaceOnNextDigit = false;

		} else if (displayValue !== "0") {
			displayValue = displayValue.substring(0, displayValue.length - 1);
			display.textContent = displayValue;
		
			if (displayValue === "") {
				displayValue = "0";
				display.textContent = displayValue;

				negativeNumber = true;

			}
		}
	}

	if (button.dataset.action === "equals" && (secondOperand !== null)) {
		display.classList.remove("error");

		let result = operate(firstOperand, operator, secondOperand);

		if (result === "Oops! You can't divide by 0.") {
			display.classList.add("error");
		}

		firstOperand = result;
		displayValue = result;
		display.textContent = result;
		operator = null;
		secondOperand = null;

		waitingForFirstOperand = false;
		waitingForSecondOperand = true;
		replaceOnNextDigit = true;
		justEvaluated = true;

	}

});

function add (a, b) {
	let result = a + b;
	return Number.isInteger(result)
    ? result
    : Number(result.toFixed(2));
}

function subtract (a, b) {
	let result = a - b;
	return Number.isInteger(result)
    ? result
    : Number(result.toFixed(2));
}

function multiply (a, b) {
	let result = a * b;
	return Number.isInteger(result)
    ? result
    : Number(result.toFixed(2));
}

function divide (a, b) {
	if (b === 0) return "Oops! You can't divide by 0.";

  	let result = a / b;
	return Number.isInteger(result)
    ? result
    : Number(result.toFixed(2));
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