const score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  
  const startButton = document.querySelector('.start');
  const startPage = document.querySelector('.startpage');
  const gameSection = document.querySelector('.gamesection');
  const gameOverElement = document.querySelector('.js-game-over');
  const scoreElement = document.querySelector('.js-score');
  const resultElement = document.querySelector('.js-result');
  const movesElement = document.querySelector('.js-moves');
  
 
  function startGame() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    updateScoreElement();
    startPage.style.display = 'none';
    gameSection.style.display = 'block';
    setupGame();
  }
  
  
  function setupGame() {
    document.querySelector('.js-rock-button').addEventListener('click', () => playGame('rock'));
    document.querySelector('.js-paper-button').addEventListener('click', () => playGame('paper'));
    document.querySelector('.js-scissors-button').addEventListener('click', () => playGame('scissors'));
  
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      }
    });
  }
  

  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    const result = determineResult(playerMove, computerMove);
    updateScore(result);
    updateDisplay(playerMove, computerMove, result);
    checkEndGame();
  }
  
 
  function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
      return 'rock';
    } else if (randomNumber < 2 / 3) {
      return 'paper';
    } else {
      return 'scissors';
    }
  }
  
 
  function determineResult(playerMove, computerMove) {
    if (playerMove === computerMove) {
      return 'Tie.';
    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'scissors' && computerMove === 'paper') ||
      (playerMove === 'paper' && computerMove === 'rock')
    ) {
      return 'You win.';
    } else {
      return 'You lose.';
    }
  }
  
  
  function updateScore(result) {
    if (result === 'You win.') {
      score.wins++;
    } else if (result === 'You lose.') {
      score.losses++;
    } else if (result === 'Tie.') {
      score.ties++;
    }
    updateScoreElement();
  }
  
  
  function checkEndGame() {
    if (score.wins === 3) {
      endGame('You win.');
    } else if (score.losses === 3) {
      endGame('You lose.');
    }
  }
  
  
  function endGame(message) {
    gameOverElement.textContent = message;
    document.body.removeEventListener('keydown', handleKeyPress);
  }
  
 
  function updateScoreElement() {
    scoreElement.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  
 
  function updateDisplay(playerMove, computerMove, result) {
    resultElement.textContent = result;
    movesElement.textContent = `Your move: ${playerMove} vs Computer's move: ${computerMove}`;
  }
  
  
  startButton.addEventListener('click', startGame);
  