const state =window.gameState;

const body = document.querySelector('body');


//Create and Render heading  below
const h1TicTacToe = document.createElement('h1');
h1TicTacToe.innerText =`Let's play tic tac toe`;
body.appendChild(h1TicTacToe);


//creating it here so the page only ever has one board.
const boardDiv = document.createElement('div');
//Create and render Board DIV element below
function renderBoard(state){
        
        boardDiv.id = 'board';
        state.board.forEach((divObj) => {
            div = document.createElement('div');
            div.className = 'cell';
            if(divObj.isMarked) div.innerText = divObj.mark;
            boardDiv.appendChild(div);
        });

        body.appendChild(boardDiv);
}

const playerDiv = document.createElement('div');
// Create  Player DIV  section with two inputs and a button below
function renderPlayer(){
   
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

}


function onBoardClick(event,state)
{   
    //if target is not the div cell then do nothing
    if(!event.target.classList.contains('cell')) return;

    //if the cell already has text dont allow it to be changed again in the current session
    if(event.target.innerText) return;

    if(state.currentPlayer === 'X')
    {
        event.target.innerText = 'X';
       //switch the current player to be player O;
          state.currentPlayer = state.playerO;
    }
    else{
        event.target.innerText = 'O';
        state.currentPlayer = state.playerX;
    }
    updateGameStateObject(state);
   
}

function updateGameStateObject(currState)
{
    const boardNodes = document.querySelectorAll("#board > div");
    const boardArray = [...boardNodes];

   for (let i =0; i< boardArray.length; i++)
   {
        const divCell = boardArray[i];
       currState.board[i].mark = divCell.innerText;
       currState.board[i].isMarked = (divCell.innerText !== '');

   }

}

function deleteAllChildNodes(parent) {

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

function onRestartButtonClick()
{
    console.log('button clicked');
    deleteAllChildNodes(board);
    deleteAllChildNodes(playerInputArea);
    state.clearBoard();
    renderBoard(state);
    renderPlayer();
    //since rendering the board and player  again. will need to  add listener again
    const rstBtn = document.getElementById('restart-button');
    rstBtn.addEventListener('click', onRestartButtonClick); 

}


renderBoard(state);
renderPlayer();

//add a listener for the board div
const board = document.getElementById('board');
board.addEventListener('click', (event) => {onBoardClick(event,state);}); 

const playerInputArea = document.querySelector('.players-input');

//add a listener for the restart button
const restart = document.getElementById('restart-button');
restart.addEventListener('click', onRestartButtonClick); 


