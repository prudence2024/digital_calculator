// get all references to DOM element
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const clearButton = document.querySelector("[data-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[ data-current-operand]")

// below are the global variables to hold the calculatator state
let currentOperand = ''
let previousOperand = ''
let operation = undefined

/*the function below clears all operands and the operation, resetting the calculator's state
*/
const clear=()=>{
        currentOperand = ""
        previousOperand = ""
        operation = undefined
        }
//the function below, delete the last character from the current operand

const del=()=>{
    currentOperand = currentOperand.toString().slice(0,-1)
}

/* this fuction below appends a number to the current operand, it prevents multiple decimal points @Param{string}number.the @param is a js doc tag that indicates the documentation of the parameter of the function.
{string}-this specify the data type of the parameter. in this case it is expected that the number parameter is expected to be a string, the number after it is the name of the parameter.
*/

const appendNumber = (number)=>{
 if(number === "."  && currentOperand.includes(".")) return; // this will prevent multiple decimal points from been typed
 console.log("debugging :", currentOperand)
currentOperand = currentOperand.toString() + number.toString()
 }

/*  the function below sets the chosen operation and moves the current operand to the previous operand if there is already a previous-operand, it computes the result first
@param{string}selectedOperation  the data-operation symbol(+,-,*,/)
*/
const chooseOperation = (selectedOperation)=>{
            if(currentOperand === "") return; // do nothing if there is no current oprand
            if(previousOperand !== ""){
                compute(); //compute if there is a pending operation
            }
            operation = selectedOperation
            previousOperand = currentOperand
            currentOperand  = "" //clear current opernd for new impute
        }
        /**
         * the function below perfom the calculation based on the stored operation and operand
        */
       const compute = () =>{
        let computation;
        const prev = parseFloat(previousOperand)
        const current = parseFloat(currentOperand)
        if(isNaN(prev) || isNaN(current)) return //do noting if operand as not numbers
        switch(operation){
            case "+" :
                console.log("add:",operation)
                computation = prev + current
                break;
            case "-" :
                console.log("subtract:",operation)
                computation = prev - current
                break;
            case "*" :
                console.log("multiply:",operation)
                computation = prev * current
                break;
            case "/" :
                console.log("divide:",operation)
                if(current === 0){
                    computation = "error: div by 0" //handle division by 0
                }
                else{
                    computation = prev / current
                    console.log("check",computation)
                }
                break;
                default:
                    return;  //do nothing if no valid operation
        }
        currentOperand = computation.toString()
        console.log("Current",currentOperand)
        operation = undefined
        previousOperand =""
       }
       /***
        * format a number for displaying, adding commas for thousand and handling decimals
        * @param (string) number - the number string to format
        * @returns (string) the format number string
        */
       const getDisplayNumber = (number)=>{
        const stringNumber = number.toString()
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay;
        if (isNaN(integerDigit)) {
        integerDisplay =""
        } else {
            integerDisplay = integerDigit.toLocaleString('en',{maximumFractionDigits:0})
         
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
         
        } else {
            console.log("id",integerDisplay)
            return integerDisplay;
         
        }
       }
       /*Update the text content of the display element based on the current calculator state*/

       const updateDisplay = ()=>{
        currentOperandTextElement.innerText = getDisplayNumber(currentOperand)
        if (operation != null) {
            previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`
        } else {
            previousOperandTextElement.innerText = ""
        }
       }

       /*Add clicklistners for number buttons */
       numberButtons.forEach(button => { 
        button.addEventListener("click", () =>{
            appendNumber(button.innerText);
            updateDisplay();
        })
       });

       // add clickListener for operation button
       operationButtons.forEach(button => {
         button.addEventListener("click", () =>{
            chooseOperation(button.innerText);
            updateDisplay();
         })
       });

       //  add clicklisteners for the equal button
       equalsButton.addEventListener("click",button =>{
        compute();
        updateDisplay();
       })
       
      //   add clicklistener for clear button
      clearButton.addEventListener("click",button =>{
        clear();
        updateDisplay();
       })

      //   add clicklistener for del button
      deleteButton.addEventListener("click",button =>{
        del();
        updateDisplay();
       })

    //    initial display update
    updateDisplay();










// const fruit = "john paul";
// const myArray= [1,2,3,4];
// console.log(fruit.slice(1,6))
// console.log(myArray.slice(0,-1))
// console.log(fruit.length)
// console.log(myArray.length)



