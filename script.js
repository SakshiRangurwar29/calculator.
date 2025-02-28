
const display = document.getElementById("display"); 
let currentInput = "";
let previousInput = "";
let operator = "";

// Handle button clicks
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    console.log("Button clicked:", value || action);
    
    if (value !== undefined) {
      if (value === "+" || value === "-" || value === "*" || value === "/"|| value ==="%") {
        handleOperator(value);
      } else {
        handleInput(value);
      }
    } else if (action === "clear") {
      clearDisplay();
    } else if (action === "delete") {
      deleteLast();
    } else if (action === "calculate") {
      calculateResult();
    }
  });
});

function handleInput(value) {
  if (currentInput === "0" && value === "0") return;
  if (currentInput.includes(".") && value === ".") return;
  currentInput += value;
  updateDisplay(currentInput);
}

function handleOperator(value) {
  if (currentInput === "") return;
  if (operator) calculateResult();
  operator = value;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay(`${previousInput} ${operator}`); // Trim spaces
}

function calculateResult() {
  if (!operator || currentInput === "") return;
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "/":
      result = curr !== 0 ? prev / curr : "Error";
      break;
    case "%":
      result = (prev/curr)*100;
      break;
  }
  
  console.log("Previous:", previousInput, "Current:", currentInput, "Operator:", operator);
  
  updateDisplay(`${previousInput} ${operator} ${currentInput}=${result}`); // Trim space
  currentInput = result.toString();
  operator = "";
  previousInput = "";
}

function clearDisplay() {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay("0");
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || "0");
}

function updateDisplay(value) {
  display.textContent = value;
}
  
  
