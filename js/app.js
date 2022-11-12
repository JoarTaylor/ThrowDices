//get html elements
const firstDice = document.getElementById('dice-1');
const secondDice = document.getElementById('dice-2');
const rollButton = document.querySelector('.btn-roll');
const playerOneCurrent = document.querySelector('#score-0');
const playerTwoCurrent = document.querySelector('#score-1');
const playerOneTotal = document.querySelector('#current-0');
const playerTwoTotal = document.querySelector('#current-1');
const keepPoints = document.querySelector('.btn-hold');
const playerOneLabel = document.querySelector('#name-0');
const playerTwoLabel = document.querySelector('#name-1');
const newGame = document.querySelector('.btn-new');
const inputFinalScore = document.querySelector('.final-score');
const winScore = document.querySelector('.win-score');

//create new game
newGame.addEventListener('click', createNewGame);

function createNewGame() {
    location.reload();
}

//create dice-pictures array that you can later randomice from
let dice = [
    'img/dice-1.png', 
    'img/dice-2.png', 
    'img/dice-3.png', 
    'img/dice-4.png', 
    'img/dice-5.png', 
    'img/dice-6.png'];

//declare game variables
let currentScore = 0;
let totalScoreLeft = 0;
let totalScoreRight = 0;
let winningScore;

//set winning conditions
    inputFinalScore.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          if(inputFinalScore.value == '' || inputFinalScore.value == null) {
            alert('Please enter winning rounds condition');
          } else {
            winningScore = parseFloat(inputFinalScore.value);
            inputFinalScore.value = "";
            winScore.textContent = winningScore;
          }
        }
});

//declare starting player
playerOneLabel.classList.toggle('mark-player');

//cickevent on trowdice-button // start-game
rollButton.addEventListener('click', randomDice);

//randomize dices when trown
function randomDice() {
    let randomNum1 = Math.floor(Math.random() * 6);
    let randomNum2 = Math.floor(Math.random() * 6);
    firstDice.src = dice[randomNum1];
    secondDice.src = dice[randomNum2];
    currentScore += ((randomNum1+1) + (randomNum2+1));
    
    //set current score to zero if a 1 is thrown. If double 6's total score is zero.
    if(randomNum1 == 0 || randomNum2 == 0) {
        currentScore = 0;
        logTotal();
    } else if (randomNum1 == 5 && randomNum2 == 5 && playerOneLabel.classList.contains('mark-player')) {
        currentScore = 0;
        totalScoreLeft = 0;
        logTotal();
    } else if (randomNum1 == 5 && randomNum2 == 5 && playerTwoLabel.classList.contains('mark-player')) {
        currentScore = 0;
        totalScoreRight = 0;
        logTotal();
    }   

    //log current score
    if(playerTwoLabel.classList.contains('mark-player')) {
        playerTwoCurrent.innerHTML = currentScore;
    } else if (playerOneLabel.classList.contains('mark-player')){
        playerOneCurrent.innerHTML = currentScore;
    }

    keepPoints.addEventListener('click', logTotal);
}

//log current score to total score and then switch players
function logTotal() {
    if(playerTwoLabel.classList.contains('mark-player')) {
        totalScoreRight += currentScore;
        playerTwoTotal.innerHTML = totalScoreRight;
        playerTwoLabel.classList.toggle('mark-player');
        playerOneLabel.classList.toggle('mark-player');
    } else if (playerOneLabel.classList.contains('mark-player')) {
        totalScoreLeft += currentScore;
        playerOneTotal.innerHTML = totalScoreLeft;
        playerOneLabel.classList.toggle('mark-player');
        playerTwoLabel.classList.toggle('mark-player');
    }

    currentScore = 0;
    playerTwoCurrent.innerHTML = currentScore;
    playerOneCurrent.innerHTML = currentScore;
    console.log(winningScore);

    if(totalScoreLeft >= winningScore) {
        alert('Player 1 win');
    } else if (totalScoreRight >= winningScore) {
        alert('Player 2 win');
    }
}

