/***Variables***/
let restart = document.querySelector('.restart');
let deck = document.querySelector('.deck');
let moves = document.querySelector('.moves');
let counter = 0;
let hard = 10;
let medium = 20;
let totalMoves = moves.innerText;
let stars = document.getElementsByClassName('fa-star');
let numStars = 3;
let openedCards = [];
let matches = 0;
let timeTracker;
let t = document.querySelector('.timer');
let modal = document.getElementById('modal');
let starList = document.querySelectorAll('.stars li');
// let cardMatched = document.getElementsByClassName('match');
let closeicon = document.querySelector('.close');


/***Create a list that holds all of your cards***/
const cardClasses = [
  'fa-diamond',
  'fa-diamond',
  'fa-paper-plane-o',
  'fa-paper-plane-o',
  'fa-anchor',
  'fa-anchor',
  'fa-bolt',
  'fa-bolt',
  'fa-cube',
  'fa-cube',
  'fa-leaf',
  'fa-leaf',
  'fa-bicycle',
  'fa-bicycle',
  'fa-bomb',
  'fa-bomb'
];

/***Init Game***/
function startGame() {
  let cards = shuffle(cardClasses).map(function(c) {
    return createCard(c);
  });
  deck.innerHTML = cards.join('');
  startTimer();
}

startGame();

// HTML to create cards dynamically
function createCard(c) {
  return `<li class='card'><i class='fa ${c}'></i></li>`;
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function showCard(c) {
  c.classList.add('open', 'show');
}

function hideCard(c) {
  c.classList.remove('open', 'show');
}

// Hides cards after x(sec)
function timeOut(c, secs) {
  setTimeout(function() {
    openedCards.forEach(function(c) {
      hideCard(c);
    });
    openedCards = [];
  }, secs);
}

let totalCards = document.querySelectorAll('.card');

// Goes through each card, adds an event listener, and checks if they have classes 'open show match'
// If true, add to openedCards[]
totalCards.forEach(function(c) {
  c.addEventListener('click', function(e) {
    if (!c.classList.contains('open') && !c.classList.contains('show') && !c.classList.contains('match')) {
      openedCards.push(c);
      showCard(c);

      if (openedCards.length === 2) {

        // Check for equal match. If true - add class 'match'
        if (openedCards[0].isEqualNode(openedCards[1])) {
          openedCards[0].classList.add('match');
          hideCard(c);
          openedCards[1].classList.add('match');
          hideCard(c);
          openedCards = [];
          matches += 1;
          congrats();
        } else {
          // No-match: hide cards after 1sec
          timeOut(c, 500);
        }
        counter++;
        moveCounter();
      }
    }
  });
});


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/***Timer***/
let secs = document.getElementById("seconds");
let mins = document.getElementById("minutes");
let sec = 0;

function timer(t) {
  return t > 9 ? t : "0" + t;
}

function startTimer() {
  timeTracker = setInterval(function() {
    secs.innerHTML = timer(++sec % 60);
    mins.innerHTML = timer(parseInt(sec / 60, 10));
  }, 1000);
}

// Reset Timer
restart.onclick = resetTimer;

function resetTimer() {
  clearInterval(timeTracker);
  sec = 0;
  startTimer()
}

// Update move counter
function moveCounter() {
  moves.textContent = counter;
  if (counter === hard || counter === medium) {
    removeStar();
  }
}

// Remove a star from rating
function removeStar() {
  let lastStar = document.querySelector('.fa-star');
  lastStar.parentNode.removeChild(lastStar);
  lastStar.attr('class', 'fa fa-star-o');
  numStars--;
  // $(".num-stars").text(String(numStars));
}

function resetStars() {
  let starsReset = document.querySelector('.fa-star-o');
  starsReset.attr('class', 'fa fa-star');
  numStars = 3;
  // $(".num-stars").text(String(numStars));
}


// Winning Modal - Displays stats
function congrats() {
  if (matches == 8) {
    clearInterval(timeTracker);
    // finalTime = t.innerHTML;

    modal.classList.add("show");
    let starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("lastMove").innerHTML = counter;
    document.getElementById("finalTime").innerHTML = finalTime;
    document.getElementById("starRating").innerHTML = starRating;

    closeModal();
  }
}

// Hitting x on Modal (closes modal)
function closeModal() {
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        // startGame();
    });
}

// Play Again? function
function playAgain() {
    modal.classList.remove("show");
    location.reload();
}

deck.addEventListener("click", congrats);
// let resetGame = function() {
//   openedCards = [];
//   counter = 0;
//   moveCounter();
//   resetStars();
//   resetTimer();
//   clearInterval(timeTracker);
//   startGame();
// };
//
// restart.addEventListener('click', resetGame);

function myF() {
  modal.classList.add("show");
}

restart.addEventListener('click', function() {
  location.reload();
});



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
