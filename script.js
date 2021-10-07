'use strict';

let player1score = document.querySelector('#score--0');
let player2score = document.getElementById('score--1');
let dicee = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting Conditions
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;
const startingConditions = function () {
  player1score.textContent = 0;
  player2score.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  dicee.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

const switchFunction = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

startingConditions();

//Implementing the functionality of rolling

btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random number for the dice

    const dice = Math.floor(Math.random() * 6) + 1;

    // Removing the hidden class

    dicee.classList.remove('hidden');
    dicee.src = `images/dice-${dice}.png`;

    // Checking wether the numbe is 1 or not

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchFunction();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Addcurrent score to active player score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if score is greater than 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      dicee.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchFunction();
    }
  }
});

btnNew.addEventListener('click', startingConditions);
