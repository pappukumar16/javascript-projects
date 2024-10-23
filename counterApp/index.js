const dispalyText = document.querySelector(".displayText");
const startbtn = document.querySelector("#startCount");
const resetbtn = document.querySelector("#resetCount")
const decreasebtn = document.querySelector("#stopCount")

let count = 0;
startbtn.addEventListener("click",function(){
    count = count + 1;
     dispalyText.innerText = count;
})

resetbtn.addEventListener("click",function(){
    dispalyText.innerHTML = 0
    
})

decreasebtn.addEventListener("click",function(){
    count = count - 1;
    dispalyText.innerText = count;
})
