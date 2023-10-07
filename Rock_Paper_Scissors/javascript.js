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
    } 
    
    
    
    else if (
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
  static #max_times_won_or_loose = 0;
  static #gameStatusArray = [];
  setMaxTimesWonOrLoose(max_times_won_or_loose) {
    UserGameInterface.#max_times_won_or_loose = max_times_won_or_loose;
  }
  setToInitialState() {
    UserGameInterface.#times_draw = 0;
    UserGameInterface.#times_loose = 0;
    UserGameInterface.#max_times_won_or_loose = 0;
    UserGameInterface.#times_won = 0;
    UserGameInterface.#gameStatusArray = [];
    UserGameInterface.#GAME_ALGO.setToInitialState();
  }
  playOneTime(userChoice) {
    if (!UserGameInterface.#GAME_ALGO.getChoices_.includes(userChoice.toString()))
      return null;
    if (UserGameInterface.#max_times_won_or_loose === UserGameInterface.#times_loose || UserGameInterface.#max_times_won_or_loose === UserGameInterface.#times_won) 
    return "No more chances";
    let gameStatus, gameStatusMsg;

    UserGameInterface.#GAME_ALGO.DecideWinner(userChoice);
    gameStatus = UserGameInterface.#GAME_ALGO.getGame_Status;
    gameStatusMsg = UserGameInterface.#GAME_ALGO.getGame_Status_Msg;
    if (gameStatus === 0) UserGameInterface.#times_draw++;
    else if (gameStatus === -1) UserGameInterface.#times_loose++;
    else UserGameInterface.#times_won++;
    UserGameInterface.#gameStatusArray.push(gameStatusMsg);

    return gameStatus;
  }

  get getDetailedGameReport() {
    return UserGameInterface.#gameStatusArray.join('\n\n');
  }
  get getTimesloose(){
    return UserGameInterface.#times_loose;
  }
  get getTimesWin(){
    return UserGameInterface.#times_won;
  }
  get getTimesDraw(){
    return UserGameInterface.#times_draw;
  }
  Result() {
    return `times won ${UserGameInterface.#times_won}, times loose ${
      UserGameInterface.#times_loose
    } , times draw ${UserGameInterface.#times_draw}`;
  }
}


//code which will integrate UserGameInterface class object to html and make it interactive interface of game 
// IIFEs to run game: https://www.javascripttutorial.net/javascript-immediately-invoked-function-expression-iife/
(() => {
  //Dom Elements 
  const VirtualGamingConsole = new UserGameInterface();
  const RockBtn = document.querySelector('div.cv.ch #rock');
  const PaperBtn = document.querySelector('div.cv.ch #paper');
  const ScissorsBtn = document.querySelector('div.cv.ch #scissors');
  const RestartBtn = document.querySelector('div.RestartBtn button');
  const btnContainer = document.querySelector('div.cv.ch');
  const resultContainer = document.querySelector('div.result');
  const actionContainer = document.querySelector('div.actions');
  let actionContainerPChild;
  let ULElement = document.createElement('ul');
  let resultContainerChild;

  VirtualGamingConsole.setMaxTimesWonOrLoose(5);

  /* To remove undesired elements displayed duing playing game before reloading and bring the game in
  initial statue after reloading */

  addEventListener('load',(e)=>{

    VirtualGamingConsole.setToInitialState();
    VirtualGamingConsole.setMaxTimesWonOrLoose(5);
    resultContainer.removeChild(resultContainerChild);
    actionContainer.removeChild(ULElement);
    actionContainer.removeChild(actionContainerPChild);
    
  })

  // for 3 buttons rock, paper and scissors using their parent div element
  btnContainer.addEventListener('click',(e)=>{
    if(e.target !== btnContainer){
      let response = VirtualGamingConsole.playOneTime(e.target.id);
      console.log(response,e.target.id);
      if(response==='No more chances') {RockBtn.disabled=ScissorsBtn.disabled=PaperBtn.disabled=true;
      RestartBtn.disabled= false;
  
      resultContainerChild =  document.createTextNode(`Result : ${VirtualGamingConsole.Result()}`);
      resultContainer.appendChild(resultContainerChild);

      let ReportActions = VirtualGamingConsole.getDetailedGameReport.split('\n\n');

      let LiElement,TextElement;
      for(let IndividualAction of ReportActions){
           LiElement = document.createElement('li');
           TextElement = document.createTextNode(IndividualAction);

           LiElement.appendChild(TextElement);
           ULElement.appendChild(LiElement);
      }

      actionContainerPChild = document.createElement('p');
      actionContainerPChild.appendChild(document.createTextNode('Bellow are the sequence of events happened during this session of game'))
      actionContainer.appendChild(actionContainerPChild);
      actionContainer.appendChild(ULElement);
     

      }
      else{
        alert(`Your Choice = ${e.target.id}`);
      }
     
    }
  })

  RestartBtn.addEventListener('click',(e)=>{
   
    resultContainer.removeChild(resultContainerChild);
    actionContainer.removeChild(ULElement);
    actionContainer.removeChild(actionContainerPChild);
    VirtualGamingConsole.setToInitialState();
    VirtualGamingConsole.setMaxTimesWonOrLoose(5);
    RockBtn.disabled=ScissorsBtn.disabled=PaperBtn.disabled=false;
    RestartBtn.disabled= true;
  })
 
})();
