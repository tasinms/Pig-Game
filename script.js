"use strict";

// Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

function switchPlayer() {
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;

    // Swtich to next player
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }

    player0El.classList.toggle("player--active"); // toggle() will add the 'player--active' class for player0El if it is not there, and remove the class if it is  already there
    player1El.classList.toggle("player--active");
}

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Rolling dice
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. Generating random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove("hidden");
        diceEl.src = `dice/dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            // Add dice to current score
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {
    if (playing) {
        // 1. Add current score to active players score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("player--active");
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener("click", function () {
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    current0El.textContent = 0;
    current1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
});
