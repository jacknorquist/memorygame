//8 pairs of colors to be used in the cards-grid
let colorsArr = ["black", "black", "orange", "orange", "green", "green", "purple", "purple", "blue", "blue", "white", "white", "red", "red", "yellow", "yellow"];

//initialize elements
let startButton = document.getElementById("start-button");
let row = document.getElementById("cards-grid");
let score = document.getElementById("score");
let card;
let image;
let cardClicked;


//called when startButton is pressed -- randomizes the colorsArr
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
let pairCounter = 0;
let clickCounter = 0;
let guessArr = [];




function checkPair() {
  //if the cardColoris the same in the two guesses and they are not the same card
  //leave them "open", decrease the amount of unmatched cards, and reset the guesses
  if (
    guessArr.length === 2 &&
    guessArr[0].cardColor === guessArr[1].cardColor &&
    guessArr[0].cardClass != guessArr[1].cardClass) {
    cardsLeft -= 2;
    guessArr = [];
    pairCounter = 0;
    //check if all matched have been found, if so game is over
    if (cardsLeft === 0) {
      let message = document.createElement('div');
      message.setAttribute("id", "winner-message");
      let score = document.createElement("h1");
      score.innerHTML = "Your Score Was" + " " + clickCounter / 2 + "!";
      message.appendChild(score);
      row.appendChild(message);

    }

    //cards don't match -> find divs whose classes match the ones that are in guessArr and make the picture visibile again ("close the card")
  } else {
    let i = document.querySelectorAll("div");
    pairCounter++;
    //looping through all divs to find divs that match the cardClass inside objects inside the guess array
    for (let k of i) {
      if (k.classList === guessArr[0].cardClass || k.classList === guessArr[1].cardClass) {
        setTimeout(function () {
          k.children[1].style.visibility = "visible";
          pairCounter = 0;
        }, 1500);
      }
    }
    guessArr = [];

  }
}

//add a click if there has been two clicks then the score goes up by one and we check to see if there is a pair

function updateScore() {
  clickCounter++;
  if (clickCounter % 2 === 0) {
    score.innerHTML = clickCounter / 2;
    checkPair();
  }
}

//display all of the cards from the randomized colorArr
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

    // add event listener to each card. On click will check to make sure that no more than two cards are open
    //,will set visibility of img to hidden ("Openeing the Card"), and update the score.
    card.addEventListener('click', function () {
      if (pairCounter > 0) {
        return;
      } else {
        this.children[1].style.visibility = "hidden";
        cardObj = { cardColor: this.id, cardClass: this.classList };
        guessArr.push(cardObj);
        updateScore();
      }
    });


  }
}

//initializes the board
startButton.addEventListener('click', display);
//makes it so you can only create one board at a time
startButton.addEventListener('click', function () {
  this.disabled = true;
});






