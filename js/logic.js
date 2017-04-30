// sameRow(a, b) determines if a and b are within the same row
function sameRow(a, b){
  return math.abs(a - b) < 8;
}

// sameColumn(a, b) determines if a and b are within the same column
function sameColumn(a, b) {
  return a % 8 == b % 8;
}

// blackPiece(a) determines whether a is a valid black piece
function blackPiece(a){
  return a == 'black/rook' || a == 'black/knight' || a == 'black/queen' || a == 'black/king' || a == 'black/bishop';
}

// whitePiece(a) determines whether a is a valid white piece
function whitePiece(a){
  return a == 'white/rook' || a == 'white/knight' || a == 'white/queen' || a == 'white/king' || a == 'white/bishop';
}

// populateBoard() creates a new board with the positions of the figures in the correct order
function populateBoard() {
  let newArr = Array(64).fill(null);
  let len = 64;
  let i = 0;
  for (i = 0; i < len; ++i){
    // White
    if(i == 0 || i == 7){
      newArr[i] = 'white/rook' // Position Rook
    }
    if(i == 1 || i == 6){
      newArr[i] = 'white/knight' // Position Knight(Horse; to avoid confusion)
    }
    if(i == 2 || i == 5){
      newArr[i] = 'white/bishop' // Position Bishop
    }
    if(8 <= i && i <= 15){
      newArr[i] = 'white/pawn' // Position Pawn
    }
    if(i == 4){
      newArr[i] = 'white/queen' // Position Queen
    }
    if(i == 3){
      newArr[i] = 'white/king' // Position King
    }

    // Black
    if(i == 56 || i == 63){
      newArr[i] = 'black/rook' // Position Rook
    }
    if(i == 57 || i == 62){
      newArr[i] = 'black/knight' // Position Knight(Horse; to avoid confusion)
    }
    if(i == 58 || i == 61){
      newArr[i] = 'black/bishop' // Position Bishop
    }
    if(48 <= i && i <= 55){
      newArr[i] = 'black/pawn' // Position Pawn
    }
    if(i == 59){
      newArr[i] = 'black/queen' // Position Queen
    }
    if(i == 60){
      newArr[i] = 'black/king' // Position King
    }
  }
  return newArr;
}

// possibleMoves(props) highlights in green possible moves that the selected figure can move
// effects: changes gameBoard
function possibleMoves(props) {
  let i = props.value;
  let piece = gameBoard[i];
  lastPiece = piece;
  lastPos = i;
  //alert(lastPiece);

  // If we uncomment every offset update, the game works but is glitchy. This is because depending on the value of offset (if it is even or odd), will
  //    only sometimes reupdate the corresponding SquareOdd/SquareEven. However, gameBoard does change the way we want to. So we somehow just need to find
  //    a way to update the value of the square to the corresponding gameBoard value each time a square is set to available.
  if (piece == 'black/knight' || piece == 'white/knight'){
    if(i - 17 <= 63 && i - 17 >= 0 && !gameBoard[i - 17]){
      gameBoard[i - 17] = available;
    } if(0 <= i - 15 && i - 15 <= 63 && !gameBoard[i - 15]){
      gameBoard[i - 15] = available;
    } if(0 <= i - 6 && i - 6 <= 63 && !gameBoard[i - 6]){
      gameBoard[i - 6] = available;
    } if(0 <= i - 10 && i - 10 <= 63 && !gameBoard[i - 10]){
      gameBoard[i - 10] = available;
    } if(0 <= i + 6 && i + 6 <= 63 && !gameBoard[i + 6]){
      gameBoard[i + 6] = available;
    } if(0 <= i + 10 && i + 10 <= 63 && !gameBoard[i + 10]){
      gameBoard[i + 10] = available;
    } if(0 <= i + 15 && i + 15 <= 63 && !gameBoard[i + 15]){
      gameBoard[i + 15] = available;
    } if(0 <= i + 17 && i + 17 <= 63 && !gameBoard[i + 17]){
      gameBoard[i + 17] = available;
    }
  }
  if (piece == 'black/bishop' || piece == 'white/bishop') {
      // insert mobility here
  }

  if (piece == 'black/rook' || piece == 'white/rook') {
    for(a = 0; sameRow(a, i); ++a){
      gameBoard[i + a] = available;
    }
  }

  if (piece == 'black/king' || piece == 'white/king') {
      // insert mobility here
  }

  if (piece == 'black/queen' || piece == 'white/queen') {
      // insert mobility here
  }

  if (piece == 'black/pawn'){
    if(i - 8 >= 0 && !gameBoard[i - 8]){
      gameBoard[i - 8] = available;
    } if(48 <= i && i <= 55 && !gameBoard[i - 16]){ // If pawn is at starting position, it can move two spaces up
      gameBoard[i - 16] = available;
    } if(i - 7 >= 0 && whitePiece(gameBoard[i - 7])){ // If there is an enemy diagonal to the pawn, it can take it
      gameBoard[i - 7] = available;
    } if(i - 9 >= 0 && whitePiece(gameBoard[i - 9])){
      gameBoard[i - 9] = available;
    }
  }

  if (piece == 'white/pawn'){
    if(i + 8 >= 0 && !gameBoard[i + 8]){
      gameBoard[i + 8] = available;
    } if(8 <= i && i <= 15 && !gameBoard[i + 16]){ // If pawn is at starting position, it can move two spaces up
      gameBoard[i + 16] = available;
    } if(i + 7 >= 0 && blackPiece(gameBoard[i + 7])){ // If there is an enemy diagonal to the pawn, it can take it
      gameBoard[i + 7] = available;
    } if(i + 9 >= 0 && blackPiece(gameBoard[i + 9])){
      gameBoard[i + 9] = available;
    }
  }
  alert(gameBoard);
  return React.createElement(
    "button",
    { className: "square-odd", onClick: function onClick() {
        return (
          props.onClick()
        );
      } }//,
      //props.value[2]
  );
}

// clearAvailable(piece, pos) changes the values of all available positions back to null
//      Technically more efficient than a loop that traverses through the gameBoard
// effects: changes gameBoard
function clearAvailable(piece, pos) {

  if (lastPiece == 'black/knight' || lastPiece == 'white/knight'){
    if(gameBoard[lastPos - 17] == available){
      //alert('Last: ' + lastPiece + ' LastPos: ' + lastPos + ' i: ' + i + ' squares: ' + squares)
      gameBoard[lastPos - 17] = null;
    } if(gameBoard[lastPos - 15] == available){
      gameBoard[lastPos - 15] = null;
    } if(gameBoard[lastPos - 6] == available){
      gameBoard[lastPos - 6] = null;
    } if(gameBoard[lastPos - 10] == available){
      gameBoard[lastPos - 10] = null;
    } if(gameBoard[lastPos + 6] == available){
      gameBoard[lastPos + 6] = null;
    } if(gameBoard[lastPos + 10] == available){
      gameBoard[lastPos + 10] = null;
    } if(gameBoard[lastPos + 15] == available){
      gameBoard[lastPos + 15] = null;
    } if(gameBoard[lastPos + 17] == available){
      gameBoard[lastPos + 17] = null;
    }
    return;
  }

  if (lastPiece == 'black/pawn'){
    if(gameBoard[lastPos - 8] == available){
      gameBoard[lastPos - 8] = null;
    } if(gameBoard[lastPos - 16] == available){ // If pawn is at starting position, it can move two spaces up
      gameBoard[lastPos - 16] = null;
    } if(gameBoard[lastPos - 7] == available){ // If there is an enemy diagonal to the pawn, it can take it
      gameBoard[lastPos - 7] = null;
    } if(gameBoard[lastPos - 9] == available){
      gameBoard[lastPos - 9] = null;
    }
    return;
  }

  if (lastPiece == 'white/pawn'){
    if(gameBoard[lastPos + 8] == available){
      gameBoard[lastPos + 8] = null;
    } if(gameBoard[lastPos + 16] == available){ // If pawn is at starting position, it can move two spaces up
      gameBoard[lastPos + 16] = null;
    } if(gameBoard[lastPos + 7] == available){ // If there is an enemy diagonal to the pawn, it can take it
      gameBoard[lastPos + 7] = null;
    } if(gameBoard[lastPos + 9] == available){
      gameBoard[lastPos + 9] = null;
    }
    return;
  }

}
