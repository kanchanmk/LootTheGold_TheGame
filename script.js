"use strict";

const columns = 5;
const rows = 5;
const goldCoinsCount = 6;
const tries = 15;

document.querySelector(".goldCoinsCount").innerText = goldCoinsCount;
document.querySelector(".tries").innerText = tries;

// Set the initial display
let lootContainer = document.querySelector(".lootContainer");
let counter = 0;
for(let i=0; i< columns; i++){
    let column = document.createElement("div");
    column.setAttribute("class","column");
    for(let j=0; j<rows; j++){
        let cell = document.createElement("div");
        cell.id = counter;
        cell.setAttribute("class","cell");
        cell.setAttribute("tabindex",counter);
        column.appendChild(cell);
        counter++;
    }
    lootContainer.appendChild(column);
}


// generate a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// get the random places

let random = 0;
let randomsArray = [];
// Randomly place the Gold Coins
for(let j=0;  j<goldCoinsCount ; j++){
    random = getRandomInt(rows*columns);
    randomsArray.indexOf(random) != -1? j-- : randomsArray.push(random);
}
console.log(`randomsArray : ${randomsArray}`);

let restart = document.querySelector(".restart");
const showPlayAgain = () => {
    
    restart.classList.add("visible");
    restart.addEventListener("click", playAgain);
}


let element;
let clickCounter = 0;
const validateClick = (e) => {
    if(e.target.id)
    {
        let randomIndex = randomsArray.indexOf(parseInt(e.target.id));
        
        element = document.getElementById(e.target.id);
        if(randomIndex !== -1){
            element.classList.add("coin");
            element.classList.add("gold");
            randomsArray.splice(randomIndex,1);
            // console.log(`randomsArray : ${randomsArray}`);
            if(randomsArray.length === 0){
                lootContainer.removeEventListener("click", validateClick);
                // console.log("You got the loot");
                let result = document.querySelector(".result");
                result.classList.add("congrats");
                result.innerHTML="Congratulations! You got the loot!";
                showPlayAgain();
            }
        }
        else{
            clickCounter++;
            element.classList.add("nope");
            element.innerText = "X";
        }

        if(clickCounter === tries){
            lootContainer.removeEventListener("click", validateClick);
            let result = document.querySelector(".result");
            result.classList.add("oops");
            result.innerHTML="Oops! You are out of tries!";
            showPlayAgain();
        }
    }
}



const playAgain = () => {
    restart.removeEventListener("click",playAgain);
    location.reload();
}
lootContainer.addEventListener("click", validateClick);

// Congratulations animation
// Click "Congratulations!" to play animation



