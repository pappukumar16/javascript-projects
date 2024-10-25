const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let checkCount = 0;
let passwordLength = 10;
handleSlider()

function handleSlider(){
    inputSlider.value = passwordLength
    lengthDisplay.innerText = passwordLength 
}

function setIndecator(color){
       indicator.style.backgroundColor=color
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

function getrandomInteger(){
    return getRandomInteger(0,9)
}

function getUpperCaseLetter(){
    return String.fromCharCode(getRandomInteger(65,90))
}

function getLowerCaseLetter(){
    return String.fromCharCode(getRandomInteger(97,122))
}

function getrandomSymbol(){
    const randomSym = getRandomInteger(0,symbols.length)
    return symbols.charAt(randomSym)
}

function calCulateStrength(){

   let hasLow = false;
   let hasUpp = false;
   let hasNum = false;
   let hasSym = false;

   if(lowercaseCheck.checked) hasLow = true
   if(uppercaseCheck.checked) hasUpp = true;
   if(numbersCheck.checked) hasNum = true;
   if(symbolsCheck.checked) hasSym = true;

   if(hasLow && hasUpp && (hasNum || hasSym) && passwordLength >= 8){
     setIndecator("#123")
   }else if( (hasLow || hasNum) && (hasUpp || hasSym) && passwordLength >=6){
    setIndecator("#098454")
   }else{
    setIndecator("#098880")
   }
}

// calCulateStrength()

async function copyMassage(){
   try {
    await window.navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied"
   } catch (error) {
    copyMsg.innerText = "error"
   }

   copyMsg.classList.add("active")

   setTimeout( ()=>{
     copyMsg.classList.remove("active")
   },1000)
   
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function changeHandleCheckbox(){

    checkCount = 0;
    allCheckBox.forEach( (checkbox)=>{
           if(checkbox.checked){
            checkCount++;
           }
    })

    if(passwordLength<checkCount){
        passwordLength = checkCount
        handleSlider()
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("click",changeHandleCheckbox)
})

inputSlider.addEventListener("input",(e)=>{
    passwordLength = e.target.value
    handleSlider()
})

copyBtn.addEventListener("click",(e)=>{
   if(passwordDisplay.value)
    copyMassage()
    
})

generateBtn.addEventListener( "click",(e)=>{
   
    if(checkCount <=0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount
        handleSlider()
    }

    password = ""

    let functionArray = [];

    if(uppercaseCheck.checked){
        functionArray.push(getUpperCaseLetter)
    }
    
    if(lowercaseCheck.checked){
        functionArray.push(getLowerCaseLetter)
    }

    if(numbersCheck.checked){
       functionArray.push(getrandomInteger)
    }

    if(symbolsCheck.checked){
        functionArray.push(getrandomSymbol)
    }

    //complasary addition
    for(let i=0; i<functionArray.length; i++){
        password += functionArray[i]();
        console.log(password)
    }

    //after complasary additon then remaing part add passwor to display
    for(let i=0; i<passwordLength-functionArray.length; i++){
        let randomInd = getRandomInteger(0,functionArray.length)
        password += functionArray[randomInd]();
    }

    password = shufflePassword(Array.from(password))
    console.log(password)


    passwordDisplay.value = password

    calCulateStrength()

})