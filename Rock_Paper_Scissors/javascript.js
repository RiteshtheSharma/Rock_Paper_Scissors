// notation make all inputs lower case and computer/program 's input

// toolBox to run game and know its condition using its methods
class Game {
    static #CHOICES =[`rock`,`paper`,`scissors`];
    #gameStatus=null;
    #gamestatusMsg='Game is not started';
    constructor() {   
      }

      fetchComputerChoice(){
       let index = parseInt(Math.random()*3);
       let compChoice = Game.#CHOICES[index];   
        return compChoice;
    } 

DecideWinner(playerSelection) {playerSelection = playerSelection.toLowerCase();
const computerSelection = this.fetchComputerChoice();
if (playerSelection === computerSelection) {this.#gamestatusMsg=`Its draw ! for ${playerSelection}`; this.#gameStatus=0}
else if (Game.#CHOICES[(Game.#CHOICES.indexOf(playerSelection)+1)%3] === computerSelection ) 
{this.#gamestatusMsg= `You lose ! for ${playerSelection} against ${computerSelection}`;
this.#gameStatus=-1}
else  { this.#gameStatus=1;this.#gamestatusMsg= `You won ! for ${playerSelection} against ${computerSelection}`;}
}  

get game_Status(){return this.#gameStatus}
get game_Status_Msg(){return this.#gamestatusMsg}
get choices_(){return Game.#CHOICES}
} 
// Class to use as an interface so user can play game using its object
class  UserGameInterface{
static #GAME_ALGO = new Game();
static #times_won=0;
static #times_loose=0;
static #times_draw=0;
static #userChoice;
static #times_play;
static #gameStatusArray=[];
staticConstructor(times_play){
    UserGameInterface.times_play = times_play;

}

PlayGame(userChoice){let gameStatus,gameStatusMsg;
    if(typeof(userChoice) !=='string' || userChoice.length)
    for(let i=0;i<UserGameInterface.times_play;i++){
        
        GAME_ALGO.DecideWinner(userChoice);
        gameStatus = GAME_ALGO.game_Status;
        gameStatusMsg = GAME_ALGO.game_Status_Msg; 
        if(gameStatus===0)UserGameInterface.times_draw++;
        else if(gameStatus===-1)UserGameInterface.times_loose++;
        else UserGameInterface.times_won++;
        UserGameInterface.#gameStatusArray.push(gameStatusMsg);
    }
}
get detailedGameReport(){
    return UserGameInterface.#gameStatusArray;
}
Result(){
    return `times won ${UserGameInterface.#times_won}, times loose ${UserGameInterface.#times_loose} , times draw ${UserGameInterface.times_draw}`;

}
}



