// notation make all inputs lower case and computer/program 's input
/* Game class 's gameStatus member can have 4 values :
null(game in initial stage not played or reinitialized) 
 -1 game lost
 0 draw
 1 won */

// toolBox to run game and know its condition using its methods
class Game {
  static #CHOICES = [`rock`, `paper`, `scissors`];
  #gameStatus = null;
  #gamestatusMsg = "Game is not started";
  constructor() {}
  setToInitialState() {
    this.#gameStatus = null;
    this.#gamestatusMsg = "Game is not started";
  }
  // private method plz don 't use it outside this class
  fetchComputerChoice() {
    let index = parseInt(Math.random() * 3);
    let compChoice = Game.#CHOICES[index];
    return compChoice;
  }

  DecideWinner(playerSelection) {
    playerSelection = playerSelection.toLowerCase();
    const computerSelection = this.fetchComputerChoice();
    if (playerSelection === computerSelection) {
      this.#gamestatusMsg = `Its draw ! for ${playerSelection}`;
      this.#gameStatus = 0;
    } else if (
      Game.#CHOICES[(Game.#CHOICES.indexOf(playerSelection) + 1) % 3] ===
      computerSelection
    ) {
      this.#gamestatusMsg = `You lose ! for ${playerSelection} against ${computerSelection}`;
      this.#gameStatus = -1;
    } else {
      this.#gameStatus = 1;
      this.#gamestatusMsg = `You won ! for ${playerSelection} against ${computerSelection}`;
    }
  }

  get getGame_Status() {
    return this.#gameStatus;
  }
  get getGame_Status_Msg() {
    return this.#gamestatusMsg;
  }
  get getChoices_() {
    return Game.#CHOICES.toString();
  }
}
// Class to use as an interface so user can play game using its object
class UserGameInterface {
  static #GAME_ALGO = new Game();
  static #times_won = 0;
  static #times_loose = 0;
  static #times_draw = 0;
  static #times_play = 0;
  static #gameStatusArray = [];
  setTimesPlay(times_play) {
    UserGameInterface.#times_play = times_play;
  }
  setToInitialState() {
    UserGameInterface.times_draw = 0;
    UserGameInterface.times_loose = 0;
    UserGameInterface.times_play = 0;
    UserGameInterface.times_won = 0;
    UserGameInterface.#gameStatusArray = [];
    UserGameInterface.GAME_ALGO.setToInitialState();
  }
  playOneTime(userChoice) {
    if (!UserGameInterface.#GAME_ALGO.includes(userChoice.toString()))
      return null;
    if (UserGameInterface.#times_play === 0) return "No more chances";
    let gameStatus, gameStatusMsg;

    GAME_ALGO.DecideWinner(userChoice);
    gameStatus = GAME_ALGO.getGame_Status;
    gameStatusMsg = GAME_ALGO.getGame_Status_Msg;
    if (gameStatus === 0) UserGameInterface.times_draw++;
    else if (gameStatus === -1) UserGameInterface.times_loose++;
    else UserGameInterface.times_won++;
    UserGameInterface.#gameStatusArray.push(gameStatusMsg);
    UserGameInterface.#times_play--;
    return gameStatus;
  }

  get getDetailedGameReport() {
    return UserGameInterface.#gameStatusArray;
  }
  Result() {
    return `times won ${UserGameInterface.#times_won}, times loose ${
      UserGameInterface.#times_loose
    } , times draw ${UserGameInterface.times_draw}`;
  }
}

// IIFEs to run game: https://www.javascripttutorial.net/javascript-immediately-invoked-function-expression-iife/
() => {
  const VirtualGamingConsole = new UserGameInterface();
  VirtualGamingConsole.staticConstructor(5);
};
