let colorsArr = ["black", "black", "orange", "orange", "green", "green", "purple", "purple", "blue", "blue", "white", "white", "red", "red", "yellow", "yellow"];


let startButton = document.getElementById("start-button");
let row = document.getElementById("cards-grid");
let score = document.getElementById("score");
let card;
let image;
let cardClicked;

function shuffleArray(colorsArr) {
  for (var i = colorsArr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = colorsArr[i];
    colorsArr[i] = colorsArr[j];
    colorsArr[j] = temp;
  }
  return colorsArr;
}
let cardsLeft = 16;
let clickCounter = 0;
let guessArr = [];




function checkPair() {
  if (
    guessArr.length === 2 &&
    guessArr[0].cardColor === guessArr[1].cardColor &&
    guessArr[0].cardClass != guessArr[1].cardClass) {
    console.log("Yes");
    cardsLeft -= 2;
    guessArr = [];

    if (cardsLeft === 0) {
      let message = document.createElement('div');
      message.setAttribute("id", "winner-message");
      let score = document.createElement("h1");
      score.innerHTML = "Your Score Was" + " " + clickCounter / 2 + "!";
      message.appendChild(score);
      row.appendChild(message);

      console.log("Game over");
    }
  } else {
    let i = document.querySelectorAll("div");
    console.log(guessArr[1].cardClass);
    for (let k of i) {
      if (k.classList === guessArr[0].cardClass || k.classList === guessArr[1].cardClass) {
        setTimeout(function () {
          k.children[1].style.visibility = "visible";
        }, 1500);
      }
    }
    guessArr = [];

    // Cards don't match
    // Delay to show the cards for a short time before hiding them
  }
}



function updateScore() {

  clickCounter++;
  if (clickCounter % 2 === 0) {
    score.innerHTML = clickCounter / 2;
    checkPair();
  }
}


function display() {
  let colors = shuffleArray(colorsArr);
  for (let i = 0; i < colors.length; i++) {
    cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "card-container col-3");
    card = document.createElement("div");
    card.setAttribute("id", colors[i]);
    card.setAttribute('data', i);
    card.setAttribute("class", "card" + " " + i);
    let color = document.createElement('div');
    color.style.backgroundColor = colors[i];
    image = document.createElement("IMG");
    image.src = "silverball.png";
    card.appendChild(color);
    card.appendChild(image);
    cardContainer.appendChild(card);
    row.appendChild(cardContainer);


    card.addEventListener('click', function () {
      if (guessArr.length >= 2) {
        setTimeout(function () {
          this.children[1].style.visibility = "hidden";
          cardObj = { cardColor: this.id, cardClass: this.classList };
          guessArr.push(cardObj);
          updateScore();
        }, 1500);
      } else {
        this.children[1].style.visibility = "hidden";
        cardObj = { cardColor: this.id, cardClass: this.classList };
        guessArr.push(cardObj);
        updateScore();
      }
    });


  }
}


startButton.addEventListener('click', display);

startButton.addEventListener('click', function () {
  this.disabled = true;
});






