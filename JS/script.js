const gameConsole = document.getElementById("game-console");
const gameScreen = document.getElementById("game-screen");
const gameControls = document.getElementById("game-controls");


//CREATE BOARD'S NUMBERS AND THIER DIVs
let randomArray = [];

for (i = 1; i < 91; i++) {
   randomArray.push(i);
};

randomArray.forEach((num) => {
   let div = document.createElement("div");
   gameScreen.appendChild(div);
   div.classList.add("number");
   div.classList.add("a" + num);
   div.innerHTML = num;
});


//SHUFFLE ARRAY'S NUMBERS
function shuffle(array) {
   let currentIndex = array.length, randomIndex;

   while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
         array[randomIndex], array[currentIndex]];
   }
   return array;
};
shuffle(randomArray);


//CREATE GAME CONTROLS --> BUTTONS, NUMBERS ALREADY DRAWN AND
//THE ACTUAL NUMBER (AKA THE NUMBER JUST DRAWN)
const plusBtn = document.createElement("button");
plusBtn.setAttribute("id", "plus");
plusBtn.innerHTML = "+";

const minusBtn = document.createElement("button");
minusBtn.setAttribute("id", "minus");
minusBtn.innerHTML = "-";

const resetBtn = document.createElement("button");
resetBtn.setAttribute("id", "reset");
resetBtn.innerHTML = "Reset";
reset(resetBtn);

const extracted = document.createElement("span");
extracted.innerHTML = "Numbers drawn:";
const counter = document.createElement("h2");
let count = 0;
counter.innerHTML = count;

const extDiv = document.createElement("div");
extDiv.classList.add("extdiv");
extDiv.appendChild(extracted);
extDiv.appendChild(counter);

const btnDiv = document.createElement("div");
btnDiv.classList.add("btndiv");
btnDiv.appendChild(minusBtn);
btnDiv.appendChild(resetBtn);
btnDiv.appendChild(plusBtn);

gameControls.appendChild(extDiv);
gameControls.appendChild(btnDiv);


//COUNTER NUMBERS DRAWN,
//ACTUAL NUMBER DRAWN,
//LAST 4 NUMBERS DRAWN
let actualNumber = document.getElementById("act-num");
let lastNumbers = document.getElementById("last-num");
const arrayDiv = gameScreen.childNodes;
let j = 0;


gameControls.addEventListener("click", function (e) {
   let fourNums = [];

   //COUNTER OF NUMBERS DRAWN
   if (e.target.id === "plus" && count >= 0 && count < 90) {
      count++;
      counter.innerHTML = count;
      actualNumber.innerHTML = randomArray[j]; //SHOW THE NUMBER JUST DRAWN


      addColorNum(randomArray, arrayDiv);
      

      lastNums(fourNums, randomArray);
      lastNumbers.innerHTML = fourNums.join(" ");

   } else if (e.target.id === "minus" && count > 1 && count < 91) {
      count--;
      counter.innerHTML = count;
      actualNumber.innerHTML = randomArray[j - 2];


      removeColorNum(randomArray, arrayDiv);
      

      lastNums(fourNums, randomArray);
      lastNumbers.innerHTML = fourNums.join(" ");
   };
});

//RESET FUNCTION
function reset (btn) {
   btn.addEventListener("click", function () {
      location.reload();
   });
};

//SHOW THE LAST 4 NUMBERS DRAWN
function lastNums (array, randArray) {
   for (n = count - 4; n < count; n++) {
      array.push(randArray[n]);
   };
};

//ADD COLOR TO THE DRAWN NUMBER'S BACKGROUND
function addColorNum(randArray, array) {
   for (let i = 0; i < 90; i++) { 
      if (randArray[j] == array[i].innerHTML) {
         array[i].classList.add("drawn");
      };
   };
   j++;
};

//REMOVE COLOR TO THE DRAWN NUMBER'S BACKGROUND
function removeColorNum(randArray, array) {
   for (let i = 0; i < 90; i++) { 
      if (randArray[j-1] == array[i].innerHTML) {
         array[i].classList.remove("drawn");
      };
   };
   j--;
};