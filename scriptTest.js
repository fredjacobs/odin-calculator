const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');
const clearBtn = document.getElementById('clear');

let firstNum = '';
let secondNum = '';
let operator = '';
let answer = '';

function calculate(calcType, num1, num2){
    

}


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
    console.log(answer);
    return answer;
    

}

function getInput(inputValue){
    let input = inputValue.target.innerText;

    console.log(input);

    if(input === 'C'){
        firstNum = '';
        secondNum = '';
        operator = '';
        answer = '';
        display.innerText = '';
    }

    if (inputValue.target.classList.contains('num-field')){
        if (operator == ''){
            firstNum += input;
            display.innerText = firstNum;
            
        }else if (firstNum != '') {
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

buttons.forEach(el => el.addEventListener('click', getInput));
