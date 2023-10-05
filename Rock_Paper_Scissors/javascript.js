// notation make all inputs lower case and computer/program 's input

class Game {
    static #choices =[`rock`,`paper`,`scissors`];
    #gameStatus=null;
    #gamestatusMsg='Game is not started';
    constructor() {   
      }

      fetchComputerChoice(){
       let index = parseInt(Math.random()*3);
       let compChoice = Game.#choices[index];   
        return compChoice;
    } 

DecideWinner(playerSelection) {playerSelection = playerSelection.toLowerCase();
const computerSelection = this.fetchComputerChoice();
if (playerSelection === computerSelection) {this.#gamestatusMsg=`Its draw ! for ${playerSelection}`; this.#gameStatus=0}
else if (Game.#choices[(Game.#choices.indexOf(playerSelection)+1)%3] === computerSelection ) 
{this.#gamestatusMsg= `You lose ! for ${playerSelection} against ${computerSelection}`;
this.#gameStatus=-1}
else  { this.#gameStatus=1;this.#gamestatusMsg= `You won ! for ${playerSelection} against ${computerSelection}`;}
}  

get game_Status(){return this.#gameStatus}
get game_Status_Msg(){return this.#gamestatusMsg}
get choices_(){return Game.#choices}
} 


const UserGameInterface =new Game();


 let times_won=0,times_loose=0,times_draw=0,userChoice,gameStatus,gameStatusMsg; 
 for(let i=0;i<5;i++){
     userChoice = prompt(' Enter your choice here among rock, paper and scissors ','');  
     UserGameInterface.DecideWinner(userChoice);
     gameStatus = UserGameInterface.game_Status;
     gameStatusMsg = UserGameInterface.game_Status_Msg; 
     if(gameStatus===0)times_draw++;
     else if(gameStatus===-1)times_loose++;
     else times_won++;
     alert(gameStatusMsg);
 }
 alert(`times won ${times_won}, times loose ${times_loose} , times draw ${times_draw}`);
