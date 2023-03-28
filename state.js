window.gameState = {
    markX: 'X',
    markO:'O',
    player: 'X',
    board: [
      {id: '00',mark:'',  isMarked:false}, 
      {id: '01',mark:'',  isMarked:false}, 
      {id: '02',mark:'',  isMarked:false},
      {id: '10',mark:'',  isMarked:false}, 
      {id: '11',mark:'',  isMarked:false}, 
      {id: '12',mark:'',  isMarked:false},
      {id: '20',mark:'',  isMarked:false}, 
      {id: '21',mark:'',  isMarked:false}, 
      {id: '22',mark:'',  isMarked:false}
    ],
    clearBoard: function(){
        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
    }
  }