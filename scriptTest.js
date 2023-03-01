const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('delete');

let firstNum = '';
let secondNum = '';
let operator = '';
let answer = '';

let isAddingToFirstStr = false;
let isAddingToSecondStr = false;

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
            answer = num1 / num2;
            break;
    
        default:
            break;
    }
 
    return answer;
    

}

function getInput(inputValue){
    let input = inputValue.target.innerText;

    if(input === 'C'){
        firstNum = '';
        secondNum = '';
        operator = '';
        answer = '';
        display.innerText = '';
    }

    if (inputValue.target.classList.contains('num-field')){
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
    }
      
}

function deleteChar(){
   // isAddingToFirstStr ? firstNum = firstNum.slice(0, -1) : secondNum = secondNum.slice(0, -1);
   if(isAddingToFirstStr){
    firstNum = firstNum.slice(0,-1);
    display.innerText = firstNum;
   }else if(isAddingToSecondStr){
    secondNum = secondNum.slice(0,-1);
    display.innerText = secondNum;
   }
    
}

delBtn.addEventListener('click', deleteChar);
buttons.forEach(el => el.addEventListener('click', getInput));
