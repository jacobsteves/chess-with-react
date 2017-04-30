// sameRow(a, b) determines if a and b are within the same row
function sameRow(a, b){
  if (0 <= a && a <= 7 && 0 <= b && b <= 7){
    return 1;
  }
  if (8 <= a && a <= 15 && 8 <= b && b <= 15){
    return 1;
  }
  if (16 <= a && a <= 23 && 16 <= b && b <= 23){
    return 1;
  }
  if (24 <= a && a <= 31 && 24 <= b && b <= 31){
    return 1;
  }
  if (32 <= a && a <= 39 && 32 <= b && b <= 39){
    return 1;
  }
  if (40 <= a && a <= 47 && 40 <= b && b <= 47){
    return 1;
  }
  if (48 <= a && a <= 55 && 48 <= b && b <= 55){
    return 1;
  }
  if (56 <= a && a <= 63 && 56 <= b && b <= 63){
    return 1;
  }
}

// sameColumn(a, b) determines if a and b are within the same column
function sameColumn(a, b) {
  return a % 8 == b % 8;
}

// blackPiece(a) determines whether a is a valid black piece
function blackPiece(a){
  return a === 'black/rook' || a === 'black/knight' || a === 'black/queen' || a === 'black/king' || a === 'black/bishop' || a === 'black/pawn';
}

// whitePiece(a) determines whether a is a valid white piece
function whitePiece(a){
  return a === 'white/rook' || a === 'white/knight' || a === 'white/queen' || a === 'white/king' || a === 'white/bishop' || a === 'white/pawn';
}

function enemy(a, b){
  return blackPiece(a) != blackPiece(b) && whitePiece(a) != whitePiece(b);
}

function availablePiece(a){
  return a === 'available/white/rook' || a === 'available/white/knight' || a === 'available/white/queen' || a === 'available/white/king' || a === 'available/white/bishop' || a === 'available/white/pawn' ||
  a === 'available/black/rook' || a === 'available/black/knight' || a === 'available/black/queen' || a === 'available/black/king' || a === 'available/black/bishop' || a === 'available/black/pawn';
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

function makeAvailable(pos) {
  if(gameBoard[pos]) {
    gameBoard[pos] = available + '/' + gameBoard[pos]; // if there is an enemy at pos, make gameBoard[pos] = 'available/colour/piece'
  } else {
    gameBoard[pos] = available;
  }
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
      makeAvailable(i - 17);
    } if(0 <= i - 15 && i - 15 <= 63 && !gameBoard[i - 15]){
      makeAvailable(i - 15);
    } if(0 <= i - 6 && i - 6 <= 63 && !gameBoard[i - 6]){
      makeAvailable(i - 6);
    } if(0 <= i - 10 && i - 10 <= 63 && !gameBoard[i - 10]){
      makeAvailable(i - 10);
    } if(0 <= i + 6 && i + 6 <= 63 && !gameBoard[i + 6]){
      makeAvailable(i + 6);
    } if(0 <= i + 10 && i + 10 <= 63 && !gameBoard[i + 10]){
      makeAvailable(i + 10);
    } if(0 <= i + 15 && i + 15 <= 63 && !gameBoard[i + 15]){
      makeAvailable(i + 15);
    } if(0 <= i + 17 && i + 17 <= 63 && !gameBoard[i + 17]){
      makeAvailable(i + 17);
    }
  }
  if (piece == 'black/bishop' || piece == 'white/bishop') {
    let leftMoves = i % 8;
    let rightMoves = 8 - leftMoves;
    let nw = i; // north west diagonal
    let sw = i; // south west diagonal
    let ne = i; // north east diagonal
    let se = i; // south east diagonal

      for(a = 0; a < leftMoves; ++a, nw -= 9){
        if(0 >= nw || nw >= 63){
          break;
        }
        makeAvailable(i + nw);
        if(enemy(piece, gameBoard[i + nw])){
          break;
        }
      }
      for(a = 0; a < leftMoves; ++a, sw += 7){
        if(0 >= sw || sw >= 63){
          break;
        }
        makeAvailable(i + sw);
        if(enemy(piece, gameBoard[i + sw])){
          break;
        }
      }
      for(a = 0; a < rightMoves; ++a, ne -= 7){
        if(0 >= ne || ne >= 63){
          break;
        }
        makeAvailable(i + ne);
        if(enemy(piece, gameBoard[i + ne])){
          break;
        }
      }
      for(a = 0; a < rightMoves; ++a, se += 9){
        if(0 >= se || se >= 63){
          break;
        }
        makeAvailable(i + se);
        if(enemy(piece, gameBoard[i + se])){
          break;
        }
      }
  }

  if (piece == 'black/rook' || piece == 'white/rook') {
    if(enemy(piece, gameBoard[i + 1])){
      makeAvailable(i + 1);
    } else if(0 <= i + 1 && i + 1 <= 63 && !gameBoard[i + 1] && sameRow(i, i + 1, i)){
      makeAvailable(i + 1);
      if(enemy(piece, gameBoard[i + 2])){
        makeAvailable(i + 2);
      } else if(0 <= i + 2 && i + 2 <= 63 && !gameBoard[i + 2] && sameRow(i, i + 2, i)){
        makeAvailable(i + 2);
        if(enemy(piece, gameBoard[i + 3])){
          makeAvailable(i + 3);
        } else if(0 <= i + 3 && i + 3 <= 63 && !gameBoard[i + 3] && sameRow(i, i + 3, i)){
          makeAvailable(i + 3);
          if(enemy(piece, gameBoard[i + 4])){
            makeAvailable(i + 4);
          } else if(0 <= i + 4 && i + 4 <= 63 && !gameBoard[i + 4] && sameRow(i, i + 4, i)){
            makeAvailable(i + 4);
            if(enemy(piece, gameBoard[i + 5])){
              makeAvailable(i + 5);
            } else if(0 <= i + 5 && i + 5 <= 63 && !gameBoard[i + 5] && sameRow(i, i + 5, i)){
              makeAvailable(i + 5);
              if(enemy(piece, gameBoard[i + 6])){
                makeAvailable(i + 6);
              } else if(0 <= i + 6 && i + 6 <= 63 && !gameBoard[i + 6] && sameRow(i, i + 6, i)){
                makeAvailable(i + 6);
                if(enemy(piece, gameBoard[i + 7])){
                  makeAvailable(i + 7);
                } else if(0 <= i + 7 && i + 7 <= 63 && !gameBoard[i + 7] && sameRow(i, i + 7, i)){
                  makeAvailable(i + 7);
                }
              }
            }
          }
        }
      }
    }
    if(enemy(piece, gameBoard[i - 1])){
      makeAvailable(i - 1);
    } else if(0 <= i - 1 && i - 1 <= 63 && !gameBoard[i - 1] && sameRow(i, i - 1, i)){
      makeAvailable(i - 1);
      if(enemy(piece, gameBoard[i - 2])){
        makeAvailable(i - 2);
      } else if(0 <= i - 2 && i - 2 <= 63 && !gameBoard[i - 2] && sameRow(i, i - 2, i)){
        makeAvailable(i - 2);
        if(enemy(piece, gameBoard[i - 3])){
          makeAvailable(i - 3);
        } else if(0 <= i - 3 && i - 3 <= 63 && !gameBoard[i - 3] && sameRow(i, i - 3, i)){
          makeAvailable(i - 3);
          if(enemy(piece, gameBoard[i - 4])){
            makeAvailable(i - 4);
          } else if(0 <= i - 4 && i - 4 <= 63 && !gameBoard[i - 4] && sameRow(i, i - 4, i)){
            makeAvailable(i - 4);
            if(enemy(piece, gameBoard[i - 5])){
              makeAvailable(i - 5);
            } else if(0 <= i - 5 && i - 5 <= 63 && !gameBoard[i - 5] && sameRow(i, i - 5, i)){
              makeAvailable(i - 5);
              if(enemy(piece, gameBoard[i - 6])){
                makeAvailable(i - 6);
              } else if(0 <= i - 6 && i - 6 <= 63 && !gameBoard[i - 6] && sameRow(i, i - 6, i)){
                makeAvailable(i - 6);
                if(enemy(piece, gameBoard[i - 7])){
                  makeAvailable(i - 7);
                } else if(0 <= i - 7 && i - 7 <= 63 && !gameBoard[i - 7] && sameRow(i, i - 7, i)){
                  makeAvailable(i - 7);
                }
              }
            }
          }
        }
      }
    }
    if(enemy(piece, gameBoard[i + 8])){
      makeAvailable(i + 8);
    } else if(0 <= i + 8 && i + 8 <= 63 && !gameBoard[i + 8]  && sameColumn(i, i + 8)){
      makeAvailable(i + 8);
      if(enemy(piece, gameBoard[i + 16])){
        makeAvailable(i + 16);
      }else if(0 <= i + 16 && i + 16 <= 63 && !gameBoard[i + 16] && sameColumn(i, i+ 16)){
        makeAvailable(i + 16);
        if(enemy(piece, gameBoard[i + 24])){
          makeAvailable(i + 24);
        }else if(0 <= i + 24 && i + 24 <= 63 && !gameBoard[i + 24] && sameColumn(i, i + 24)){
          makeAvailable(i + 24);
          if(enemy(piece, gameBoard[i + 32])){
            makeAvailable(i + 32);
          } else if(0 <= i + 32 && i + 32 <= 63 && !gameBoard[i + 32] && sameColumn(i, i + 32)){
            makeAvailable(i + 32);
            if(enemy(piece, gameBoard[i + 40])){
              makeAvailable(i + 40);
            } else if(0 <= i + 40 && i + 40 <= 63 && !gameBoard[i + 40] && sameColumn(i, i + 40)){
              makeAvailable(i + 40);
              if(enemy(piece, gameBoard[i + 48])){
                makeAvailable(i + 48);
              } else if(0 <= i + 48 && i + 48 <= 63 && !gameBoard[i + 48] && sameColumn(i, i + 48)){
                makeAvailable(i + 48);
                if(enemy(piece, gameBoard[i + 56])){
                  makeAvailable(i + 56);
                } else if(0 <= i + 56 && i + 56 <= 63 && !gameBoard[i + 56] && sameColumn(i, i + 56)){
                  makeAvailable(i + 56);
                }
              }
            }
          }
        }
      }
    }
    if(enemy(piece, gameBoard[i - 8])){
      makeAvailable(i - 8);
    } else if(0 <= i - 8 && i - 8 <= 63 && !gameBoard[i - 8] && sameColumn(i, i - 8)){
      makeAvailable(i - 8);
      if(enemy(piece, gameBoard[i - 16])){
        makeAvailable(i - 16);
      } else if(0 <= i - 16 && i - 16 <= 63 && !gameBoard[i - 16] && sameColumn(i, i - 16)){
        makeAvailable(i - 16);
        if(enemy(piece, gameBoard[i - 24])){
          makeAvailable(i - 24);
        } else if(0 <= i - 24 && i - 24 <= 63 && !gameBoard[i - 24] && sameColumn(i, i - 24)){
          makeAvailable(i - 24);
          if(enemy(piece, gameBoard[i - 32])){
            makeAvailable(i - 32);
          } else if(0 <= i - 32 && i - 32 <= 63 && !gameBoard[i - 32] && sameColumn(i, i - 32)){
            makeAvailable(i - 32);
            if(enemy(piece, gameBoard[i - 40])){
              makeAvailable(i - 40);
            } else if(0 <= i - 40 && i - 40 <= 63 && !gameBoard[i - 40] && sameColumn(i, i - 40)){
              makeAvailable(i - 40);
              if(enemy(piece, gameBoard[i - 48])){
                makeAvailable(i - 48);
              } else if(0 <= i - 48 && i - 48 <= 63 && !gameBoard[i - 48] && sameColumn(i, i - 48)){
                makeAvailable(i - 48);
                if(enemy(piece, gameBoard[i - 56])){
                  makeAvailable(i - 56);
                } else if(0 <= i - 56 && i - 56 <= 63 && !gameBoard[i - 56] && sameColumn(i, i - 56)){
                  makeAvailable(i - 56);
                }
              }
            }
          }
        }
      }
    }
  }

  if (piece == 'black/king' || piece == 'white/king') {
      if(i - 8 >= 0 && !gameBoard[i - 8]){
        makeAvailable(i - 8);
      }
      if(i + 8 >= 0 && !gameBoard[i - 8]){
        makeAvailable(i - 8);
      }
      if(i - 1 >= 0 && !gameBoard[i - 1]){
        makeAvailable(i - 1);
      }
      if(i + 1 >= 0 && !gameBoard[i + 1]){
        makeAvailable(i + 1);
      }
  }

  if (piece == 'black/queen' || piece == 'white/queen') {
      // insert mobility here
  }

  if (piece == 'black/pawn'){
    if(i - 8 >= 0 && !gameBoard[i - 8]){
      makeAvailable(i - 8);
    } if(48 <= i && i <= 55 && !gameBoard[i - 16]){ // If pawn is at starting position, it can move two spaces up
      makeAvailable(i - 16);
    } if(i - 7 >= 0 && whitePiece(gameBoard[i - 7])){ // If there is an enemy diagonal to the pawn, it can take it
      makeAvailable(i - 7);
    } if(i - 9 >= 0 && whitePiece(gameBoard[i - 9])){
      makeAvailable(i - 9);
    }
  }

  if (piece == 'white/pawn'){
    if(i + 8 >= 0 && !gameBoard[i + 8]){
      makeAvailable(i + 8);
    } if(8 <= i && i <= 15 && !gameBoard[i + 16]){ // If pawn is at starting position, it can move two spaces up
      makeAvailable(i + 16);
    } if(i + 7 >= 0 && blackPiece(gameBoard[i + 7])){ // If there is an enemy diagonal to the pawn, it can take it
      makeAvailable(i + 7);
    } if(i + 9 >= 0 && blackPiece(gameBoard[i + 9])){
      makeAvailable(i + 9);
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
function clearAvailable() {
  let len = gameBoard.length;

  for(i = 0; i < len; ++i){
    if(availablePiece(gameBoard[i])){
      gameBoard[i] = gameBoard[i].substring('available'.length);
    } else if(gameBoard[i] === 'available'){
      gameBoard[i] = null;
    }
  }
}

function clearAvailable2(piece, pos) {

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
