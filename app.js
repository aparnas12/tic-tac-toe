const state =window.gameState;

const body = document.querySelector('body');

//const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
const winningCombos = ['0,1,2','3,4,5','6,7,8','0,4,8','2,4,6','0,3,6','1,4,7','2,5,8'];

//Create and Render heading  below
const h1TicTacToe = document.createElement('h1');
h1TicTacToe.innerText =`Let's play tic tac toe`;
body.appendChild(h1TicTacToe);

const h2PlayerMessage= document.createElement('h2');
h2PlayerMessage.innerText =`Player X goes first`;
body.appendChild(h2PlayerMessage);


//creating it here so the page only ever has one board.
//const boardDiv = document.createElement('div');
//Create and render Board DIV element below
function renderBoard(state){
        
        boardDiv.id = 'board';
        for(let i = 0; i < state.board.length; i++)
        {
           
            div = document.createElement('div');
            div.className = 'cell';
            div.dataset.index = i;
            div.innerText =  state.board[i].mark;
            boardDiv.appendChild(div);
        }

        body.appendChild(boardDiv);
}
//creating the player container  here so the page only ever has one player.
//const playerDiv = document.createElement('div');
// Create  Player DIV  section with two inputs and a button below
function renderPlayer(){
   
    playerDiv.className = 'players-input';

    const player1Elem = document.createElement("input");
    player1Elem.type = "text";
    player1Elem.id = "player1Name";
    player1Elem.placeholder ="You play the Xs";
   if(!state.player1Name) player1Elem.value= state.player1Name;


    const player2Elem = document.createElement("input");
    player2Elem.type = "text";
    player2Elem.id = "player2Name";
    player2Elem.placeholder ="You play the Os";
   if(!state.player2Name) player2Elem.value= state.player2Name;

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

    //if the game has a winner and has ended then user cannot click on the board anymore
    if(state.endGame){ return} ;
    state.clickedCellIndex = event.target.dataset.index;

    if(state.currentPlayer === 'X')
    {
        event.target.innerText = 'X';
       //switch the current player to be player O;
          state.currentPlayer = state.markO;
    }
    else{
        event.target.innerText = 'O';
        state.currentPlayer = state.markX;
    }


    const winArrays = getPossibleWinArraysforIndex(event.target.dataset.index);
   // console.log(winArrays);
    const win = checkForWin(winArrays,event.target.dataset.index);
    console.log(win);
    state.endGame = win;

    updateGameStateObject(state);
  
   
}

function getBoardArray(){
    const boardNodes = document.querySelectorAll("#board > div");
    return [...boardNodes];
}

function updateGameStateObject(currState)
{

    let boardArray = getBoardArray();
    for (let i = 0; i < boardArray.length; i++) {
        const divCell = boardArray[i];
        currState.board[i].mark = divCell.innerText;
        currState.board[i].isMarked = (divCell.innerText !== '');

    }
    const player1 = document.querySelector("#player1Name");
    const player2 = document.querySelector("#player2Name");
    currState.player1Name = player1.value;
    currState.player2Name = player2.value;
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
    //since rendering the player area again. will need to  add listener to the button again
    const rstBtn = document.getElementById('restart-button');
    rstBtn.addEventListener('click', onRestartButtonClick); 

}

function getPossibleWinArraysforIndex(index) {
 //this function should return a subset of strings that contains the index sent in. for example if index is 2 the return '0,1,2' '2,5,8' and '2,4,6'
    let subsetWinArrays = [];
    for(let i = 0; i < winningCombos.length; i++)
    {
       // console.log("combos",winningCombos[i]) ;
        const arr = winningCombos[i].split(",");
        if(arr.includes(index)){
            subsetWinArrays.push(winningCombos[i]);
        }  
    }
    return subsetWinArrays;
    
  }

  function checkForWin(possArrays,index){
    let win = false;
    //get all the cell divs in the board container into an array
    let boardArray= getBoardArray();

    //loop through the subset of winning combo strings
    possArrays.forEach((arrObj)=>{

    //create an array of each string example '2,5,8' is now cellIndexArr[2,5,8] 
      let cellIndexArr = arrObj.split(",");
    //   console.log("cell",cellIndexArr[0]);
    //   console.log("cell",cellIndexArr[1]);
    //   console.log("cell",cellIndexArr[2]);
    //   console.log(boardArray[cellIndexArr[0]].innerText);
    //   console.log(boardArray[cellIndexArr[1]].innerText);
    //   console.log(boardArray[cellIndexArr[2]].innerText);

    /* boardArray[cellIndexArr[0]].innerText  translated using the cellIndexArr[2,5,8] means : we are comparing the mark in the div cell at boardArray[2]
     with the mark in the div cells at boardArray[5] and boardArray[8]  
    */

     if((boardArray[cellIndexArr[0]].innerText=== boardArray[cellIndexArr[1]].innerText) && boardArray[cellIndexArr[0]].innerText=== boardArray[cellIndexArr[2]].innerText ) win = true;
    });
    
    return win;
  }

  function updateH2Message(msg){

  }
// ************** create the two main dynamic containers for all the changing
const boardDiv = document.createElement('div');
const playerDiv = document.createElement('div');

renderBoard(state);
renderPlayer();

//add a listener for the board div
const board = document.getElementById('board');
board.addEventListener('click', (event) => {onBoardClick(event,state);}); 

// 
const playerInputArea = document.querySelector('.players-input')


//add a listener for the restart button
const restart = document.getElementById('restart-button');
restart.addEventListener('click', onRestartButtonClick); 


