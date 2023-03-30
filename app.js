//declare consts that are not dependent on dynamic rendering of html elements
const state =window.gameState;

const body = document.querySelector('body');

//const winningCombos = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]];
const winningCombos = ['0,1,2','3,4,5','6,7,8','0,4,8','2,4,6','0,3,6','1,4,7','2,5,8'];
const turns = ['X','O'];

//Create and Render headings . also available globally
const h1TicTacToe = document.createElement('h1');
h1TicTacToe.innerText =`Let's play Tic Tac Toe`;
const h2PlayerMessage= document.createElement('h2');
h2PlayerMessage.innerText =`Welcome! Please enter your names below and click Start Game to begin.`;

body.appendChild(h1TicTacToe);
body.appendChild(h2PlayerMessage);


//Create and render Board DIV element below
function renderBoard(state){
               
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

// Create  Player DIV  section with two inputs and a start button below
function renderPlayer(){
  
    const player1Elem = document.createElement("input");
    player1Elem.type = "text";
    player1Elem.id = "player1Name";
    player1Elem.placeholder ="Enter Player 1 Name";

    const player2Elem = document.createElement("input");
    player2Elem.type = "text";
    player2Elem.id = "player2Name";
    player2Elem.placeholder ="Enter Player 2 Name ";
 
    const startBtn = document.createElement("input");
    startBtn.type ="button";
    startBtn.name ="start";
    startBtn.value = 'Start Game';
    startBtn.id= 'start-button'

    playerDiv.appendChild(player1Elem);
    playerDiv.appendChild(player2Elem);
    playerDiv.appendChild(startBtn);

    body.appendChild(playerDiv);
    //add a listener for the start button. Need to add here since rerendering the player area 
    startBtn.addEventListener('click', onStartGameButtonClick); 

}

// render the player area  section with only a restart button and msg div that will be populated later
function renderPlayerwithRestart(){
    
    const messageDiv = document.createElement('p');
    messageDiv.id ="message";
    messageDiv.innerText = "";
    
    const restartBtn = document.createElement("input");
    restartBtn.type ="button";
    restartBtn.name ="restart";
    restartBtn.value = 'Restart Game';
    restartBtn.id= 'restart-button'

    playerDiv.appendChild(messageDiv);
    playerDiv.appendChild(restartBtn);

    body.appendChild(playerDiv);

    restartBtn.addEventListener('click', onRestartButtonClick); 

}

function onBoardClick(event,state)
{   
    //if game has not been started then do nothing
    if(!state.gameStarted ) return;
    
    //if target is not the div cell then do nothing
    if(!event.target.classList.contains('cell')) return;

    //if the cell already has text dont allow it to be changed again in the current session
    if(event.target.innerText) return;

    //if the game has a winner or all spots are marked the game has ended and user cannot click on the board anymore
    if(state.endGame){ return} ;

  
    //get the index of the cell that was clicked and save it for future use?
    state.clickedCellIndex = event.target.dataset.index;

    //capture and display the current turn on the cell area before it is changed for the next player
    event.target.innerText = state.currentTurn;
    // I also want to save the name of the player that clicked the cell in case its a winning move.
    let potentialWinner =  state.player1XO === state.currentTurn? state.player1Name : state.player2Name;

    //switch the current turn now 

    state.currentTurn === 'X' ? state.currentTurn = state.markO : state.currentTurn = state.markX ;

    //display whose turn it is next  and whether its O or X that up next
    let displayNextPlayerName =  state.player1XO === state.currentTurn? state.player1Name : state.player2Name;
  
    const  msgDiv = document.getElementById('message');
    if(msgDiv)
    {
        msgDiv.innerText = `${state.currentTurn} goes next. It is your turn ${convertToTitleCase(displayNextPlayerName)}`;
    }

    //get a subset of possible winning combinations
    const winArrays = getPossibleWinArraysforIndex(event.target.dataset.index);

    let win = checkForWin(winArrays,event.target.dataset.index);

    if(win){

       updateH2Message(`Well done ${convertToTitleCase(potentialWinner)}! ${event.target.innerText} has won the board! `);     
       //clear the player prompts.
        msgDiv.innerText ="";
    }
    else
    {   
        updateH2Message("");
    }

    //if a player has already not won the game,  check if board is full
    if (!win) {
        console.log("i am checking to see if board is full")
        win = checkBoardFull(getBoardArray());
        if(win)
        {
            updateH2Message(`Game over! Sorry, there are no more moves left. Restart the game for another round!`);
            msgDiv.innerText ="";
        }
        else
        {
            updateH2Message("");
        }
    }

    //store the win status in the state object 
    state.endGame = win;
    console.log("state of the game",state.endGame);
    //update the game state with the latest changes on the board 
    updateBoardObject(state);
   
}

//helper function to capture the current tic tac toe board
function getBoardArray(){
    const boardNodes = document.querySelectorAll("#board > div");
    return [...boardNodes];
}


function onRestartButtonClick()
{
    //start with a clean slate.
    deleteAllChildNodes(board);
    deleteAllChildNodes(playerInputArea);
    state.clearBoard();
    renderBoard(state);
    renderPlayer();
    updateH2Message(`Welcome! Please enter your names below and click Start Game to begin.`);

}

function onStartGameButtonClick()
{
   //update the heading
    const inputPlayer1 = document.querySelector("#player1Name");
    const inputPlayer2 = document.querySelector("#player2Name");

    //if either of the users have not entered their names do not proceed and prompt for names
    if (!(inputPlayer1.value.length)|| !(inputPlayer2.value.length) ){
      updateH2Message(`Please enter both player names to start playing!`);  
      return;
    }
    
    state.player1Name = inputPlayer1.value;
    state.player2Name = inputPlayer2.value;
    
    //this will become false automatically when restart button is clicked
     state.gameStarted = true;

    //randomly decide whether X or O goes first 
    state.currentTurn = turns[Math.floor((Math.random() * 1.5))];

    //randomly assign player 1 either a X or an O
    state.player1XO = turns[Math.floor((Math.random() * 1.5))];

    // assign the other player what has not been assigned to player 1 . We are making the assumption this is always  a X or an O only.
    state.player1XO === 'X' ? state.player2XO = 'O': state.player2XO = 'X';

    //display the player name and prompt to start game
    if(state.player1Name && state.player2Name)
    updateH2Message(`Welcome ${convertToTitleCase(state.player1Name)} and ${convertToTitleCase(state.player2Name)} to a fun game of Tic Tac Toe.`);
    else
    updateH2Message('Welcome to a fun game of Tic Tac Toe');

    //once start button has been clicked it gets replaced by restart button etc
    deleteAllChildNodes(playerInputArea);
    renderPlayerwithRestart();

    //it matters that the message is displayed after rendering the player area.
    const  msgDiv = document.getElementById('message');
   // msgDiv.innerText = `${convertToTitleCase(state.player1Name)} plays ${state.player1XO}. ${convertToTitleCase(state.player2Name)} plays ${state.player2XO}`;
     msgDiv.innerHTML = `${state.currentTurn} begins the game. Player ${convertToTitleCase(state.player1Name)} gets ${state.player1XO}. Player ${convertToTitleCase(state.player2Name)} gets ${state.player2XO}. `;
}

/********* Helper Functions*********/

//helper function to check if board is full and no more moves left
function checkBoardFull(currBoard){
    let full = true;
    
    currBoard.forEach(cell => {
       if( cell.innerText === '') 
       {
        full = false;
        console.log("is it full", full)
        return full;
       }
         
    });
    console.log('is it full', full)
    return full;
   }
     
// capture the board from the game and update the board array in the current state object
function updateBoardObject(currState)
{

    let boardArray = getBoardArray();
    for (let i = 0; i < boardArray.length; i++) {
        const divCell = boardArray[i];
        currState.board[i].mark = divCell.innerText;
        currState.board[i].isMarked = (divCell.innerText !== '');

    }

}

//this function should return a subset of strings that contains the index sent in. for example if index sent is 2 the return '0,1,2' '2,5,8' and '2,4,6'
function getPossibleWinArraysforIndex(index) {
 
    let subsetWinArrays = [];
    for(let i = 0; i < winningCombos.length; i++)
    {
      
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

    /*continuing with example [2,5,8].  Now we can use the indices at cellIndexArr[0] aka 2 ,cellIndexArr[1] aka 5 and cellIndexArr[2] aka 8 to access boardArray elements.
      boardArray[cellIndexArr[0]].innerText  translated using the 3 indices means : we are comparing the mark in the div cell at boardArray[2]
     with the marks in the div cells at boardArray[5] and boardArray[8]  
     if boardArray[2] === boardArray[5] && boardArray[2] === boardArray[8] we have a winning combo
    */

     if((boardArray[cellIndexArr[0]].innerText=== boardArray[cellIndexArr[1]].innerText) && boardArray[cellIndexArr[0]].innerText=== boardArray[cellIndexArr[2]].innerText ) win = true;
    });
    
    return win;
  }

  function updateH2Message(msg){

    h2PlayerMessage.innerText =msg;

  }

  function convertToTitleCase(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  function deleteAllChildNodes(parent) {

    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}



//not used currently
function switchCurrentTurn(currXO){
    //arrTurn references the const gloabl array turns ['X','O']
    let newTurn =[];
    const marksArray = ['X','O'];
    console.log("currently turn is " + currXO);
    
    let idx = marksArray.indexOf(currXO);
    console.log(idx);
    if (idx > -1)
    {
        newTurn =   marksArray.splice(idx,1) ;
        console.log(marksArray);
    }
    return marksArray[0];
}


// **************  create the two main  containers for all the dynamically created elements and let them be globally available
const boardDiv = document.createElement('div');
boardDiv.id = 'board';

const playerDiv = document.createElement('div');
playerDiv.className = 'players-input'

//render the empty board and the player area with start button
renderBoard(state);
renderPlayer();

//add a listener for the board div only after rendering the Board through the renderBoard function
const board = document.getElementById('board');
board.addEventListener('click', (event) => {onBoardClick(event,state);}); 

// globally available playarea variable. I am declaring it here after the playarea is rendered.
const playerInputArea = document.querySelector('.players-input')





