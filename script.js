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
    case '+': 
        return add(x, y);
    case '-': 
        return subtract(x, y);
    case '*': 
        return multiply(x, y);
    case '/': 
        return divide(x, y);
    default:
             return null;
  }
}


let first_number = '';
let second_number = '';
let current_operator = null;
let reset_display = false; // a flag to tel the calculator to clear th display screen after a new numbr is typed


const display  = document.getElementById('display');
const number_buttons = document.querySelectorAll(['data-number']);
const operator_buttons = document.querySelectorAll(['data-operator']);
const clear_button = document.getElementById('clear');
const equals_button = document.getElementById('equals');
const decimal_button = document.querySelector(['data-decimal']);
const backspace_button = document.getElementById('backspace');

// append digit to display
number_buttons.forEach(button =>
    button.addEventListener('click', () => append_number(button.textContent))
);
// operator
operator_buttons.forEach(button => 
    button.addEventListener('click', () => set_operation(button.textContent))
);

function clear() {
  display.textContent = '0';
  first_number = '';
  second_number = '';
  current_operator = null;
}

equals_button.addEventListener('click', evalaute);
clear_button.addEventListener('click', clear);
decimal_button.addEventListener('click', append_decimal);
backspace_button.addEventListener('click', backspace);

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



