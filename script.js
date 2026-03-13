function add(x, y) {
  return x + y;
}
function multiply(x, y) {
  return x * y;
}

function subtract(x,y){
    return x - y;
}

function divide(x, y) {
  return x / y;
}

function operate(operator, x, y) {
  switch (operator) {
    case '+': return add(x, y);
    case '-': return subtract(x, y);
    case '*': return multiply(x, y);
    case '/': return divide(x, y);
    default: return null;
  }
}


let first_number = '';
let second_number = '';
let current_operator = null;
let reset_display = false; // a flag to tel the calculator to clear th display screen after a new numbr is typed


const display  = document.getElementById('display');
const expression_display = document.getElementById('expression-display');
const number_buttons = document.querySelectorAll('[data-number]');
const operator_buttons = document.querySelectorAll('[data-operator]');
const clear_button = document.getElementById('clear');
const equals_button = document.getElementById('equals');
const decimal_button = document.querySelector('[data-decimal]');
const backspace_button = document.getElementById('backspace');


function resetDisplay() {
  display.textContent = '';
  reset_display = false;
}


function updateExpressionPreview() {
  if (!expression_display) {
    return;
  }
  if (current_operator === null) {
    expression_display.textContent = display.textContent || '0';
    return;
  }
  if (reset_display) {
    expression_display.textContent = `${first_number} ${current_operator}`;
    return;
  }
  expression_display.textContent = `${first_number} ${current_operator} ${display.textContent}`;
}


function appendNumber(number) {
  if (display.textContent === '0' || reset_display) {
    resetDisplay();
  }
  display.textContent += number;
  updateExpressionPreview();
}


function evaluate() {
  if (current_operator === null || reset_display) {
    return;
  }
  const operator_for_display = current_operator;
  if (operator_for_display === '/' && parseFloat(display.textContent) === 0) {
    if (expression_display) {
      expression_display.textContent = `${first_number} ${operator_for_display} ${display.textContent}`;
    }
    display.textContent = "Error! Division by 0";
    reset_display = true;
    return;
  }
  second_number = display.textContent;
  const result = operate(current_operator, parseFloat(first_number),parseFloat(second_number));
  display.textContent = Math.round(result * 1000) / 1000;
  if (expression_display) {
    expression_display.textContent = `${first_number} ${operator_for_display} ${second_number} =`;
  }
  first_number = display.textContent;
  current_operator = null;
  reset_display = true;
}

function setOperation(operator){
    if(current_operator !== null){
        evaluate();
    }
    first_number  = display.textContent;
    current_operator = operator;
    reset_display = true;
  updateExpressionPreview();
}


function appendDecimal(){
  if(reset_display){
    resetDisplay();
  }
  if(display.textContent === ''){
    display.textContent = '0';
  }
  if(!display.textContent.includes('.')){
    display.textContent += '.'
  }  
  updateExpressionPreview();
}

// append digit to display
number_buttons.forEach(button =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);
// operator
operator_buttons.forEach(button => 
    button.addEventListener('click', () => setOperation(button.textContent))
);

function clear() {
  display.textContent = '0';
  first_number = '';
  second_number = '';
  current_operator = null;
  reset_display = false;
  if (expression_display) {
    expression_display.textContent = '0';
  }
}

function backspace(){
    display.textContent = display.textContent.slice(0,-1) || '0';
    updateExpressionPreview();
}

equals_button.addEventListener('click', evaluate);
clear_button.addEventListener('click', clear);
decimal_button.addEventListener('click', appendDecimal);
backspace_button.addEventListener('click', backspace);


// keyboard support

function handleKeyboardInput(input) {
  if (input.key >= 0 && input.key <= 9) appendNumber(input.key);
  if (input.key === '.') appendDecimal();
  if (input.key === '=' ||input.key === 'Enter') evaluate();
  if (input.key === 'Backspace') backspace();
  if (input.key === 'Escape') clear();
  if (['+', '-', '*', '/'].includes(input.key)) setOperation(input.key);
}

window.addEventListener('keydown', handleKeyboardInput); 

