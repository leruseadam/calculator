// Remember to console log test each function. 

// Global variables - to link HTML elements 
const buttons = document.querySelectorAll('button') // selects all html <button> elements 
const display = document.querySelector('.number-on-screen') // selects specifically the element with class="number-on-screen"

// Global variables - empty string variables that can be filled in
let numberStored = '' // to store our numbers, ALSO in boolean '' is false.
let operatorStored = '' // to store our operator sign, ALSO in boolean '' is false.

// Global variables - JavaScript booleans
  //Everything with a "Value" is True
  //Everything WITHOUT a "Value" is False
let newInput = false
let didEquals = false 


// Function to assign our calculation to the variable numberStored
function storeCalc(operator) { // 
  if (!numberStored) { // same as !false returns true, translates to if numberStored HAS a value
    numberStored = display.textContent // then updates numberStored to same as display variable 
  } // ENDS if (!numberStored)
  else { // AND if numberStored doens't have a value, it's still '' 
    numberStored = operate(Number(numberStored), operatorStored, Number(display.textContent))
    // then update the numberStored variable with the function operate(a, operator, b)
  } // ENDS else 
  
  operatorStored = operator // updates variable operatorStored with our parameter 
  newInput = true // updates variable newInput to true aka has a value
  didEquals = false // keeps variable didEquals as false aka no value
} // ENDS function storeCalc(operator)


// Calculations - Parent function 
  // a represents previous or stored number
  // b represents new number 
  // operator represents the operator sign 
function operate(a, operator, b) {
  if (operator == '+') {
    return add(a, b)  // calls the function add(a, b) 
  }
  else if (operator == '-') {
    return subtract(a, b)
  }
  else if (operator == 'x') {
    return multiply(a, b) 
  }
  else if (operator == '÷') {
      return divide(a, b)
    } 
  else {
    return null; 
  } // ENDS else - function operate
} // ENDS function operate

//// TEST function operate(a, operator, b) 
  console.log(operate(10, '/', 2));
//// 5


  // Calculation - Sub functions 
  function add(a, b) {
    return a + b
  }

  function subtract(a, b) {
    return a - b
  }

  function multiply(a, b) {
    return a * b
  }

  function divide(a, b) {
    return a / b
  }


// Reset function - to update back to blank string, and display with 0 
function clear() {
  display.textContent = 0 // Changes the text content of a display variable to 0:
  numberStored = '' // updates our global variables back to blanks 
  operatorStored = ''
}


// Function addToDisplay gets called in our buttons.forEach function
function addToDisplay(number) {
  let displayNum = display.textContent // sets up displayNum variable to return the text content of the 'display' variable 
  
  if(newInput) { // if false aka there is no value in our display variable to pull 
    newInput = false 
    setDisplay(number) // calls our function setDisplay to convert parameter number .toString()
  } // ENDS if(newInput)
  else if (displayNum == 0) {  // 0 is a value, different from no value or 'false'. 0 would result in true. 
    setDisplay(number) 
  } // ENDS if(newInput)
  else {
    if (displayNum.includes('e')) { // if the display includes an event object 
      displayNum = Number(displayNum); // calls our variable to display the text content 
    } // ENDS if (displayNum.includes('e')) 
    
    displayNum = displayNum + number
    setDisplay(displayNum)
    
  } // ENDS else 
} // ENDS function addToDisplay(number)


  // Function in case if number exceeds our display, converts to exponential notation form.
  function setDisplay(displayNum) { 
    displayNum = displayNum.toString()

    if (displayNum.length > 9) { // length property returns the length of a string
      displayNum = parseFloat(displayNum) // method parses string and returns the first number.
      displayNum = displayNum.toExponential(2) // method converts a number into an exponential notation
    } // ENDS if (displayNum.length > 9)
    
    display.textContent = displayNum; // this line is needed to display the text, ??? 
  } // ENDS function setDisplay(displayNum) 


// Function to register our buttons event from HTML to JavaScript 
buttons.forEach(button =>{ // calls our written function for each element in our variable 'buttons', button is our parameter
    button.addEventListener('click', function(){ // Add a click event to our parameter 'button'
        let input = this.textContent // in an event, this. refers to the element that received the event (our element are buttons)
        
        // 1st IF SCENARIO - to check if any of our entered button inputs match regex digits 
        if (/\d/.test(input)) { // / RegExp in here / , \d is the Reg expression for digits - matches any digit character (0-9)
                                // test() method tests for a match in a string, input refers to our textContent string
                                // IF it does match we continue to our next IF statement, 
         
            // Sub-IF scenario within 1st IF scenario - if it just blank, and there are no digits (didEquals == false == no digits)
            if (didEquals) { // if (false) or if (has no value), then execute the function setDisplay
                setDisplay(input) // applies our function setDisplay to our textContent (converts it to the format we want)
                didEquals = false // TEST DELETE - not sure if this line is necessary
            } 
            else { // if there are no digits above, then we want to add numbers to display
            addToDisplay(input) // applies our function addToDsiplay to our textContent ()
            }
        } // CONTINUE of if (/\d/.test(input)) {
        else if (input == 'AC') { // if input textContent ==  'AC'
            clear() // clear() method removes all the Storage Object item for this domain
        } // CONTINUE of if (/\d/.test(input)) {
        else if (input == '=') { 
            if (!numberStored || !operatorStored) { 
                alert('Error: no operation entered. Clearing data') 
                clear() 
            }
            // in the case of False, ??? this does not make sense
            else { 
                numberStored = operate(Number(numberStored), operatorStored, Number(display.textContent))
                // assigns our variable numberStored = with result of function operate(a, operator, b) 
                // Number() method converts string to number
                operatorStored = '' // set our operatorStored variable back to blank 
              
                setDisplay(numberStored) // calls function setDisplay, to display our numberStored variable
                numberStored = '' // then sets our numberStored variable back to blank
                didEquals = true // set didEquals variable from false to true, from no value to a value, 
            }
        } // CONTINUE of if (/\d/.test(input)) {
        else { 
            storeCalc(input) // 
        } // ENDS if (/\d/.test(input)) {
    }) // ENDS button.addEventListener('click', function(){
}); // ENDS buttons.forEach(button =>{