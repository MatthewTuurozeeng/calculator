function add(x,y) {
    let sum  = 0;
    for(let i  = 0; i<y; i++){
        sum++;
    }
    return x + sum - y; // shows addition logic
}
function multiply(x,y){
    let product = 0;
    for( let i = 0; i<Math.abs(y); i++){
        product  = product + x;
    }
    return y < 0 ? -product : product;
}

function subtract(x,y){
    return x - y;
}

function divide(x,y){
    if(y == 0){
        return "Cannot dvivide by zero"
    }
    let count = 0;
    let sum = Math.abs(x);
    while(sum > Math.abs(y)){
        sum = sum - Math.abs(b);
        count++;
    }
    return (x < 0) !== (b < 0) ? -count: count;
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



function appendNumber(number) {
  if (display.textContent === '0' || reset_display) {
    resetDisplay();
  }
  display.textContent += number;
}


function evaluate() {
  if (current_operator === null || reset_display) {
    return;
  }
  if (current_operator === '/' && display.textContent === '0') {
    display.textContent = "Error! Division by 0";
    return;
  }
  second_number = display.textContent;
  const result = operate(current_operator, parseFloat(first_number),parseFloat(second_number));
  display.textContent = Math.round(result * 1000) / 1000;
  current_operator = null;
}

function setOperation(operator){
    if(current_operator !== null){
        evaluate();
    }
    first_number  = display.textContent;
    current_operator = operator;
    reset_display = true;
}


function appendDecimal(){
    if(!display.textContent.includes('.')){
        display.textContent += '.'
    }  
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
}

function backspace(){
    display.textContent = display.textContent.slice(0,-1) || '0';
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

