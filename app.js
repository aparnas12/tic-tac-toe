const state =window.gameState;

const body = document.querySelector('body');


//Create and Render heading  below
const h1TicTacToe = document.createElement('h1');
h1TicTacToe.innerText =`Let's play tic tac toe`;
body.appendChild(h1TicTacToe);


//Create and render Board DIV element below
const boardDiv = document.createElement('div');
boardDiv.id = 'board';
state.board.forEach((divCell) => {
     div = document.createElement('div');
     div.className = 'cell';
     div.innerText = divCell.mark;
     boardDiv.appendChild(div);
});

body.appendChild(boardDiv);

// Create  Player DIV  section with two inputs and a button below
const playerDiv = document.createElement('div');
playerDiv.className = 'players-input';

const player1Elem = document.createElement("input");
player1Elem.type = "text";
player1Elem.name = "player1Name";
player1Elem.placeholder ="Enter Player 1 Name";


const player2Elem = document.createElement("input");
player2Elem.type = "text";
player2Elem.name = "player2Name";
player2Elem.placeholder ="Enter Player 2 Name";


const restartBtn = document.createElement("input");
restartBtn.type ="button";
restartBtn.name ="restart";
restartBtn.value = 'Restart Game';
restartBtn.id= 'restart-button'

playerDiv.appendChild(player1Elem);
playerDiv.appendChild(player2Elem);
playerDiv.appendChild(restartBtn);

body.appendChild(playerDiv);


//add a listener for the board div
const board = document.getElementById('board');
board.addEventListener('click', (event) => {onBoardClick(event,state);}); 



const restart = document.getElementById('restart-button');
restart.addEventListener('click', onRestartButtonClick); 

function onBoardClick(event,state)
{
    if(state.player === 'X')
    {
        event.target.innerText = 'X';
        state.player = state.markY;
    }
    else{
        event.target.innerText = 'O';
        state.player = state.markX;
    }

    const boardNodes = document.querySelectorAll('#board');
    const boardArray = [...boardNodes];
   for (let i =0; i< boardArray.length; i++)
   {
        const divCell = boardArray[i];
         //i woukd get from the divs on the windw and assign to the state.board[i].mark
       state.board[i].mark = divCell.innerText;
        
   }
   
}

function onRestartButtonClick()
{
    console.log('button clicked');
}
