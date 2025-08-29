const gameConsole = document.getElementById("game-console");
const gameScreen = document.getElementById("game-screen");
const gameControls = document.getElementById("game-controls");

//CREATE BOARD'S NUMBERS AND THIER DIVs
let randomArray = [];

for (i = 1; i < 91; i++) {
  randomArray.push(i);
}

randomArray.forEach((num) => {
  let div = document.createElement("div");
  gameScreen.appendChild(div);
  div.classList.add("number");
  div.innerHTML = num;
});

//SHUFFLE ARRAY'S NUMBERS
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
shuffle(randomArray);

//CREATE GAME CONTROLS --> BUTTONS, NUMBERS ALREADY EXTRACTED AND
//THE ACTUAL NUMBER (AKA THE NUMBER JUST EXTRACTED)
const plusBtn = document.createElement("button");
plusBtn.setAttribute("id", "plus");
plusBtn.innerHTML = "+";

const minusBtn = document.createElement("button");
minusBtn.setAttribute("id", "minus");
minusBtn.innerHTML = "-";

const resetBtn = document.createElement("button");
resetBtn.setAttribute("id", "reset");
resetBtn.innerHTML = "Reset";

const extracted = document.createElement("span");
extracted.innerHTML = "Numbers extracted:";
const counter = document.createElement("h2");
let count = 0;
counter.innerHTML = count;

let numExtracted = document.createElement("div");
numExtracted.appendChild(extracted);
numExtracted.appendChild(counter);

let controls = document.createElement("div");
controls.appendChild(plusBtn);
controls.appendChild(resetBtn);
controls.appendChild(minusBtn);

//RESET FUNCTION
resetBtn.addEventListener("click", function () {
  location.reload();
});

//COUNTER NUMBERS EXTRACTED,
//ACTUAL NUMBER EXTRACTED,
//LAST 4 NUMBERS EXTRACTED
let actualNumber = document.getElementById("act-num");
let lastNumbers = document.getElementById("last-num");
let j = 0;

gameControls.addEventListener("click", function (e) {
  let fourNums = [];

  if (e.target.id === "plus" && count >= 0 && count < 90) {
    count++;
    counter.innerHTML = count; //COUNTER OF NUMBERS EXTRACTED

    actualNumber.innerHTML = randomArray[j]; //SHOW THE NUMBER JUST EXTRACTED
    j++;

    for (n = count - 4; n < count; n++) {
      //SHOW THE LAST 4 NUMBERS EXTRACTED
      fourNums.push(randomArray[n]);
    }

    lastNumbers.innerHTML = fourNums.join(" ");
  } else if (e.target.id === "minus" && count > 1 && count < 91) {
    count--;
    counter.innerHTML = count;

    actualNumber.innerHTML = randomArray[j - 2];
    j--;

    for (n = count - 4; n < count; n++) {
      fourNums.push(randomArray[n]);
    }

    lastNumbers.innerHTML = fourNums.join(" ");
  }
});
