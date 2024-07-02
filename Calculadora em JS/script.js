const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.buttons button');

let currentNumber = "";
let firstOpe = null;
let operador = null;
let restart = false;

function updateResultado(originClear = false){ 
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit){
    if (addDigit === "," && (currentNumber.includes(",") || !currentNumber))
    return;

    if (restart){ 
        currentNumber = digit;
        restart = false;
    }else{
        currentNumber += digit;
    }

    updateResultado();
}

function setOperador(newOpe){
    if(currentNumber){
        calculate();

        firstOpe = parseFloat(currentNumber.replace(",", "."));
        currentNumber = "";
    }

    operador = newOpe;
}


function calculate(){
    if(operador === null || firstOpe === null) result;
    let secondOpe = parseFloat(currentNumber.replace(",", "."));
    let ValorFinal;

    switch(operador){
        case "+":
            ValorFinal = firstOpe + secondOpe;
            break;

        case "-":
            ValorFinal = firstOpe - secondOpe;
            break;

        case "x":
            ValorFinal = firstOpe * secondOpe;
            break;
        case "÷":
            ValorFinal = firstOpe / secondOpe;
            break;
        default:
            return;
            
    }

    if(ValorFinal.toString().split(".")[1]?.length >5){
        currentNumber = parseFloat(ValorFinal.toFixed(5)).toString();
    }else{
        currentNumber = ValorFinal.toString();
    }
    operador = null;
    firstOpe = null;
    restart = true; 
    updateResultado();
}

function clearCalculator(){
    currentNumber = "";
    firstOpe = null;
    operador = null;
    updateResultado (true);
}

function setPercentage() {
    let result = parseFloat(currentNumber) / 100;
  
    if (["+", "-"].includes(operador)) {
      result = result * (firstOpe || 1);
    }
  
    if (result.toString().split(".")[1]?.length > 5) {
      result = result.toFixed(5).toString();
    }
  
    currentNumber = result.toString();
    updateResultado();
  }

buttons.forEach((button) => { 
    button.addEventListener ("click", () =>{
    const TextoBotao = button.innerText;
    if(/^[0-9]+$/.test(TextoBotao)){
        addDigit(TextoBotao);
    }else if(["+","-","x","÷"].includes(TextoBotao)) {
        setOperador(TextoBotao)
    }else if(TextoBotao === "="){
        calculate();
    }  else if (TextoBotao === "C") {
        clearCalculator();    
    } else if (TextoBotao === "±") {
        currentNumber = (
          parseFloat(currentNumber || firstOpe) * -1
        ).toString();
        updateResultado();
      } else if (TextoBotao === "%") {
        setPercentage();
      }
    })
})