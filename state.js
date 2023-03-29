window.gameState = {
    player1Name: '',
    player2Name:'',
    markX: 'X',
    markO:'O',
    currentPlayer: 'X',
    endGame:false,
    clickedCellIndex: null,
    board: [
      {id: '0',mark:'',  isMarked:false},
      {id: '1',mark:'',  isMarked:false}, 
      {id: '2',mark:'',  isMarked:false}, 
      {id: '3',mark:'',  isMarked:false},
      {id: '4',mark:'',  isMarked:false}, 
      {id: '5',mark:'',  isMarked:false}, 
      {id: '6',mark:'',  isMarked:false},
      {id: '7',mark:'',  isMarked:false}, 
      {id: '8',mark:'',  isMarked:false}, 
     
    ],
  clearBoard: function () {
      this.player1Name = '',
      this.player2Name = '',
      this.currentPlayer = 'X',
      this.endGame=false,
      this.clickedCellIndex = null,
      this.board = [
        { id: '0', mark: '', isMarked: false },
        { id: '1', mark: '', isMarked: false },
        { id: '2', mark: '', isMarked: false },
        { id: '3', mark: '', isMarked: false },
        { id: '4', mark: '', isMarked: false },
        { id: '5', mark: '', isMarked: false },
        { id: '6', mark: '', isMarked: false },
        { id: '7', mark: '', isMarked: false },
        { id: '8', mark: '', isMarked: false }
      ];
  }
    
  }