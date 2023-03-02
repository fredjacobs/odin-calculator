const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('delete');

let firstNum = '';
let secondNum = '';
let operator = '';
let answer = '';
let keyboardInput = '';

let isAddingToFirstStr = false;
let isAddingToSecondStr = false;
let isKeyNumber = false;
let isKeyOperator = false;

function operate(operator, num1, num2){
    switch (operator) {
        case '+':
            answer = num1 + num2;
            break;
        case '-':
            answer = num1 - num2;
            break;

        case 'x':
            answer = num1 * num2;
            break;

        case '÷':
           if(num1 == '0' || num2 == '0' ){
            clearFields();
            return answer = 'Rabbit Hole :)';

           } 
            answer = num1 / num2;
            break;
    
        default:
            break;
    }
 
    return answer;
    

}

function getKeyboardInput(input){
        
    if(input === 'Delete'){
        clearFields();
    }

    if (isKeyNumber){
        if (operator == ''){
            isAddingToFirstStr = true;
            isAddingToSecondStr = false;
            firstNum += input;
            display.innerText = firstNum;
            
        }else if (firstNum != '') {
            isAddingToFirstStr = false;
            isAddingToSecondStr = true;
            display.innerText = '';
            secondNum += input;
            display.innerText = secondNum;
        } 
        
        
    }
    if (isKeyOperator){
        console.log(`Operator: ${input}`);
        
        if(firstNum != '' && secondNum != '' && operator != ''){
            
            answer = operate(operator, +firstNum, +secondNum);
            display.innerText = answer;
            firstNum = answer;
            secondNum = '';
        }
        operator = input;

        
        
    }

    if(input === 'Enter')
    {
        if(operator == '' || firstNum == '' || secondNum == ''){
            return;
        }

        display.innerText = operate(operator, +firstNum, +secondNum);
    }

    if(input === 'Backspace'){deleteChar();}
      
}

function getInput(inputValue){
        
    let = input = inputValue.target.innerText;
    
    if(input === 'C'){
        clearFields();
    }

    if (inputValue.target.classList.contains('num-field') ){
        if (operator == ''){
            isAddingToFirstStr = true;
            isAddingToSecondStr = false;
            firstNum += input;
            display.innerText = firstNum;
            
        }else if (firstNum != '') {
            isAddingToFirstStr = false;
            isAddingToSecondStr = true;
            display.innerText = '';
            secondNum += input;
            display.innerText = secondNum;
        } 
        
    }
    if (inputValue.target.classList.contains('operator-field')){
        
        if(firstNum != '' && secondNum != '' && operator != ''){
            
            answer = operate(operator, +firstNum, +secondNum);
            display.innerText = answer;
            firstNum = answer;
            secondNum = '';
        }
        operator = input;
        
    }

    if(input === '=')
    {
        if(operator == '' || firstNum == '' || secondNum == ''){
            return;
        }

        display.innerText = operate(operator, +firstNum, +secondNum);
        display.innerText = answer;
        firstNum = answer;
        secondNum = '';
    }
      
}

function clearFields(){
        firstNum = '';
        secondNum = '';
        operator = '';
        answer = '';
        display.innerText = '0';
}

function deleteChar(){
   
   if(isAddingToFirstStr){
     firstNum = firstNum.slice(0,-1);
    display.innerText = firstNum;
   }else if(isAddingToSecondStr){
     secondNum = secondNum.slice(0,-1);
    display.innerText = secondNum;
   }
    
}

function sortKeyboardInput(keyInput){

    /* console.log(keyInput.key); */
    
    let input = keyInput.key;

    let numbers = ['0','1','2','3','4','5','6','7','8','9'];
    let operators = ['/','*','+','-'];

    if (numbers.includes(input)){
        isKeyNumber = true;
        isKeyOperator = false;
        getKeyboardInput(input);
        
    }else if(operators.includes(input)){
        isKeyOperator = true;
        isKeyNumber = false;
        getKeyboardInput(input);
    }else{
        isKeyOperator = false;
        isKeyNumber = false;
        getKeyboardInput(input);
        console.log(input);
    }


}

delBtn.addEventListener('click', deleteChar);
buttons.forEach(el => el.addEventListener('click', getInput));

document.addEventListener('keyup', sortKeyboardInput);
