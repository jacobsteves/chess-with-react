// sameColumn(a, b) determines if a and b are within the same column
function sameColumn(a, b) {
  return a % 8 == b % 8;
}

function validLeft(n, newi) {
  return newi % 8 < n % 8;
}

function validRight(n, newi) {
  return n % 8 < newi % 8;
}

// blackPiece(a) determines whether a is a valid black piece
function blackPiece(a){
  return a === 'black/rook' || a === 'black/knight' || a === 'black/queen' || a === 'black/king' || a === 'black/bishop' || a === 'black/pawn';
}

// whitePiece(a) determines whether a is a valid white piece
function whitePiece(a){
  return a === 'white/rook' || a === 'white/knight' || a === 'white/queen' || a === 'white/king' || a === 'white/bishop' || a === 'white/pawn';
}

function colour(a) {
  if (whitePiece(a)) {
    return 'White';
  } else {
    return 'Black';
  }
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

//diagonalMovement(props) manipulates gameBoard and makes available every continously available diagonal line of possible moves
//     used for bishop's and Queen's movement
function diagonalMovement(props) {
  let i = props.value;
  let piece = gameBoard[i];

  if(enemy(piece, gameBoard[i + 9]) && validRight(i, i + 9)){
    makeAvailable(i + 9);
  } else if(0 <= i + 9 && i + 9 <= 63 && !gameBoard[i + 9] && validRight(i, i + 9)){
    makeAvailable(i + 9);
    if(enemy(piece, gameBoard[i + 18]) && validRight(i, i + 18)){
      makeAvailable(i + 18);
    } else if(0 <= i + 18 && i + 18 <= 63 && !gameBoard[i + 18] && validRight(i, i + 18)){
      makeAvailable(i + 18);
      if(enemy(piece, gameBoard[i + 27]) && validRight(i, i + 27)){
        makeAvailable(i + 27);
      } else if(0 <= i + 27 && i + 27 <= 63 && !gameBoard[i + 27] && validRight(i, i + 27)){
        makeAvailable(i + 27);
        if(enemy(piece, gameBoard[i + 36]) && validRight(i, i + 36)){
          makeAvailable(i + 36);
        } else if(0 <= i + 36 && i + 36 <= 63 && !gameBoard[i + 36] && validRight(i, i + 36)){
          makeAvailable(i + 36);
          if(enemy(piece, gameBoard[i + 45]) && validRight(i, i + 45)){
            makeAvailable(i + 45);
          } else if(0 <= i + 45 && i + 45 <= 63 && !gameBoard[i + 45] && validRight(i, i + 45)){
            makeAvailable(i + 45);
            if(enemy(piece, gameBoard[i + 54]) && validRight(i, i + 54)){
              makeAvailable(i + 54);
            } else if(0 <= i + 54 && i + 54 <= 63 && !gameBoard[i + 54] && validRight(i, i + 54)){
              makeAvailable(i + 54);
              if(enemy(piece, gameBoard[i + 63]) && validRight(i, i + 63)){
                makeAvailable(i + 63);
              } else if(0 <= i + 63 && i + 63 <= 63 && !gameBoard[i + 63] && validRight(i, i + 63)){
                makeAvailable(i + 63);
              }
            }
          }
        }
      }
    }
  }
  if(enemy(piece, gameBoard[i - 9]) && validLeft(i, i - 9)){
    makeAvailable(i - 9);
  } else if(0 <= i - 9 && i - 9 <= 63 && !gameBoard[i - 9] && validLeft(i, i - 9)){
    makeAvailable(i - 9);
    if(enemy(piece, gameBoard[i - 18]) && validLeft(i, i - 18)){
      makeAvailable(i - 18);
    } else if(0 <= i - 18 && i - 18 <= 63 && !gameBoard[i - 18] && validLeft(i, i - 18)){
      makeAvailable(i - 18);
      if(enemy(piece, gameBoard[i - 27]) && validLeft(i, i - 27)){
        makeAvailable(i - 27);
      } else if(0 <= i - 27 && i - 27 <= 63 && !gameBoard[i - 27] && validLeft(i, i - 27)){
        makeAvailable(i - 27);
        if(enemy(piece, gameBoard[i - 36]) && validLeft(i, i - 36)){
          makeAvailable(i - 36);
        } else if(0 <= i - 36 && i - 36 <= 63 && !gameBoard[i - 36] && validLeft(i, i - 36)){
          makeAvailable(i - 36)
          if(enemy(piece, gameBoard[i - 45]) && validLeft(i, i - 45)){
            makeAvailable(i - 45);
          } else if(0 <= i - 45 && i - 45 <= 63 && !gameBoard[i - 45] && validLeft(i, i - 45)){
            makeAvailable(i - 45);
            if(enemy(piece, gameBoard[i - 54]) && validLeft(i, i - 54)){
              makeAvailable(i - 54);
            } else if(0 <= i - 54 && i - 54 <= 63 && !gameBoard[i - 54] && validLeft(i, i - 54)){
              makeAvailable(i - 54);
              if(enemy(piece, gameBoard[i - 63]) && validLeft(i, i - 63)){
                makeAvailable(i - 63);
              } else if(0 <= i - 63 && i - 63 <= 63 && !gameBoard[i - 63] && validLeft(i, i - 63)){
                makeAvailable(i - 63);
              }
            }
          }
        }
      }
    }
  }

  if(enemy(piece, gameBoard[i + 7]) && validLeft(i, i + 7)){
    makeAvailable(i + 7);
  } else if(0 <= i + 7 && i + 7 <= 63 && !gameBoard[i + 7] && validLeft(i, i + 7)){
    makeAvailable(i + 7);
    if(enemy(piece, gameBoard[i + 14]) && validLeft(i, i + 14)){
      makeAvailable(i + 14);
    } else if(0 <= i + 14 && i + 14 <= 63 && !gameBoard[i + 14] && validLeft(i, i + 14)){
      makeAvailable(i + 14);
      if(enemy(piece, gameBoard[i + 21]) && validLeft(i, i + 21)){
        makeAvailable(i + 21);
      } else if(0 <= i + 21 && i + 21 <= 63 && !gameBoard[i + 21] && validLeft(i, i + 21)){
        makeAvailable(i + 21);
        if(enemy(piece, gameBoard[i + 28]) && validLeft(i, i + 28)){
          makeAvailable(i + 28);
        } else if(0 <= i + 28 && i + 28 <= 63 && !gameBoard[i + 28] && validLeft(i, i + 28)){
          makeAvailable(i + 28);
          if(enemy(piece, gameBoard[i + 35]) && validLeft(i, i + 35)){
            makeAvailable(i + 35);
          } else if(0 <= i + 35 && i + 35 <= 63 && !gameBoard[i + 35] && validLeft(i, i + 35)){
            makeAvailable(i + 35);
            if(enemy(piece, gameBoard[i + 42]) && validLeft(i, i + 42)){
              makeAvailable(i + 42);
            } else if(0 <= i + 42 && i + 42 <= 63 && !gameBoard[i + 42] && validLeft(i, i + 42)){
              makeAvailable(i + 42);
              if(enemy(piece, gameBoard[i + 49]) && validLeft(i, i + 49)){
                makeAvailable(i + 49);
              } else if(0 <= i + 49 && i + 49 <= 63 && !gameBoard[i + 49] && validLeft(i, i + 49)){
                makeAvailable(i + 49);
              }
            }
          }
        }
      }
    }
  }

  if(enemy(piece, gameBoard[i - 7]) && validRight(i, i - 7)){
    makeAvailable(i - 7);
  } else if(0 <= i - 7 && i - 7 <= 63 && !gameBoard[i - 7] && validRight(i, i - 7)){
    makeAvailable(i - 7);
    if(enemy(piece, gameBoard[i - 14]) && validRight(i, i - 14)){
      makeAvailable(i - 14);
    } else if(0 <= i - 14 && i - 14 <= 63 && !gameBoard[i - 14] && validRight(i, i - 14)){
      makeAvailable(i - 14);
      if(enemy(piece, gameBoard[i - 21]) && validRight(i, i - 21)){
        makeAvailable(i - 21);
      } else if(0 <= i - 21 && i - 21 <= 63 && !gameBoard[i - 21] && validRight(i, i - 21)){
        makeAvailable(i - 21);
        if(enemy(piece, gameBoard[i - 28]) && validRight(i, i - 28)){
          makeAvailable(i - 28);
        } else if(0 <= i - 28 && i - 28 <= 63 && !gameBoard[i - 28] && validRight(i, i - 28)){
          makeAvailable(i - 28);
          if(enemy(piece, gameBoard[i - 35]) && validRight(i, i - 35)){
            makeAvailable(i - 35);
          } else if(0 <= i - 35 && i - 35 <= 63 && !gameBoard[i - 35] && validRight(i, i - 35)){
            makeAvailable(i - 35);
            if(enemy(piece, gameBoard[i - 42]) && validRight(i, i - 42)){
              makeAvailable(i - 42);
            } else if(0 <= i - 42 && i - 42 <= 63 && !gameBoard[i - 42] && validRight(i, i - 42)){
              makeAvailable(i - 42);
              if(enemy(piece, gameBoard[i - 49]) && validRight(i, i - 49)){
                makeAvailable(i - 49);
              } else if(0 <= i - 49 && i - 49 <= 63 && !gameBoard[i - 49] && validRight(i, i - 49)){
                makeAvailable(i - 49);
              }
            }
          }
        }
      }
    }
  }
}

// horizontalVerticalMovement(props) manipulates gameBoard to be available for every continuously available horizonal and vertical line
//     used for the Rook's and Queen's movement
function horizontalVerticalMovement(props) {
  let i = props.value;
  let piece = gameBoard[i];

  let leftMoves = i % 8;
  let rightMoves = 8 - leftMoves;
  let r = 0; // rightMoves counter
  let l = 0; // leftMoves counter

  if(enemy(piece, gameBoard[i + 1]) && validRight(i, i + 1)){
    makeAvailable(i + 1);
  } else if(0 <= i + 1 && i + 1 <= 63 && !gameBoard[i + 1] && validRight(i, i + 1)){
    makeAvailable(i + 1);
    if(enemy(piece, gameBoard[i + 2]) && validRight(i, i + 2)){
      makeAvailable(i + 2);
    } else if(0 <= i + 2 && i + 2 <= 63 && !gameBoard[i + 2] && validRight(i, i + 2)){
      makeAvailable(i + 2);
      if(enemy(piece, gameBoard[i + 3]) && validRight(i, i + 3)){
        makeAvailable(i + 3);
      } else if(0 <= i + 3 && i + 3 <= 63 && !gameBoard[i + 3] && validRight(i, i + 3)){
        makeAvailable(i + 3);
        if(enemy(piece, gameBoard[i + 4]) && validRight(i, i + 4)){
          makeAvailable(i + 4);
        } else if(0 <= i + 4 && i + 4 <= 63 && !gameBoard[i + 4] && validRight(i, i + 4)){
          makeAvailable(i + 4);
          if(enemy(piece, gameBoard[i + 5]) && validRight(i, i + 5)){
            makeAvailable(i + 5);
          } else if(0 <= i + 5 && i + 5 <= 63 && !gameBoard[i + 5] && validRight(i, i + 5)){
            makeAvailable(i + 5);
            if(enemy(piece, gameBoard[i + 6]) && validRight(i, i + 6)){
              makeAvailable(i + 6);
            } else if(0 <= i + 6 && i + 6 <= 63 && !gameBoard[i + 6] && validRight(i, i + 6)){
              makeAvailable(i + 6);
              if(enemy(piece, gameBoard[i + 7]) && validRight(i, i + 7)){
                makeAvailable(i + 7);
              } else if(0 <= i + 7 && i + 7 <= 63 && !gameBoard[i + 7] && validRight(i, i + 7)){
                makeAvailable(i + 7);
              }
            }
          }
        }
      }
    }
  }
  if(enemy(piece, gameBoard[i - 1]) && validLeft(i, i - 1)){
    makeAvailable(i - 1);
  } else if(0 <= i - 1 && i - 1 <= 63 && !gameBoard[i - 1] && validLeft(i, i - 1)){
    makeAvailable(i - 1);
    if(enemy(piece, gameBoard[i - 2]) && validLeft(i, i - 2)){
      makeAvailable(i - 2);
    } else if(0 <= i - 2 && i - 2 <= 63 && !gameBoard[i - 2] && validLeft(i, i - 2)){
      makeAvailable(i - 2);
      if(enemy(piece, gameBoard[i - 3]) && validLeft(i, i - 3)){
        makeAvailable(i - 3);
      } else if(0 <= i - 3 && i - 3 <= 63 && !gameBoard[i - 3] && validLeft(i, i - 3)){
        makeAvailable(i - 3);
        if(enemy(piece, gameBoard[i - 4]) && validLeft(i, i - 4)){
          makeAvailable(i - 4);
        } else if(0 <= i - 4 && i - 4 <= 63 && !gameBoard[i - 4] && validLeft(i, i - 4)){
          makeAvailable(i - 4);
          if(enemy(piece, gameBoard[i - 5]) && validLeft(i, i - 5)){
            makeAvailable(i - 5);
          } else if(0 <= i - 5 && i - 5 <= 63 && !gameBoard[i - 5] && validLeft(i, i - 5)){
            makeAvailable(i - 5);
            if(enemy(piece, gameBoard[i - 6]) && validLeft(i, i - 6)){
              makeAvailable(i - 6);
            } else if(0 <= i - 6 && i - 6 <= 63 && !gameBoard[i - 6] && validLeft(i, i - 6)){
              makeAvailable(i - 6);
              if(enemy(piece, gameBoard[i - 7]) && validLeft(i, i - 7)){
                makeAvailable(i - 7);
              } else if(0 <= i - 7 && i - 7 <= 63 && !gameBoard[i - 7] && validLeft(i, i - 7)){
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


// possibleMoves(props) highlights in green possible moves that the selected figure can move
// effects: changes gameBoard
function possibleMoves(props) {
  let i = props.value;
  let piece = gameBoard[i];
  lastPiece = piece;
  lastPos = i;

  // Bishop / Queen Variables (diagonals)
  let leftMoves = i % 8;
  let rightMoves = 8 - leftMoves;
  let r = 0; // rightMoves counter
  let l = 0; // leftMoves counter

  // If we uncomment every offset update, the game works but is glitchy. This is because depending on the value of offset (if it is even or odd), will
  //    only sometimes reupdate the corresponding SquareOdd/SquareEven. However, gameBoard does change the way we want to. So we somehow just need to find
  //    a way to update the value of the square to the corresponding gameBoard value each time a square is set to available.
  if (piece == 'black/knight' || piece == 'white/knight'){
    if(i - 17 <= 63 && i - 17 >= 0 && (!gameBoard[i - 17] || enemy(piece, gameBoard[i - 17])) && validLeft(i, i - 17)){
      makeAvailable(i - 17);
    } if(0 <= i - 15 && i - 15 <= 63 && (!gameBoard[i - 15] || enemy(piece, gameBoard[i - 15])) && validRight(i, i - 15)){
      makeAvailable(i - 15);
    } if(0 <= i - 6 && i - 6 <= 63 && (!gameBoard[i - 6] || enemy(piece, gameBoard[i - 6])) && validRight(i, i - 6)){
      makeAvailable(i - 6);
    } if(0 <= i - 10 && i - 10 <= 63 && (!gameBoard[i - 10] || enemy(piece, gameBoard[i - 10])) && validLeft(i, i - 10)){
      makeAvailable(i - 10);
    } if(0 <= i + 6 && i + 6 <= 63 && (!gameBoard[i + 6] || enemy(piece, gameBoard[i + 6])) && validLeft(i, i + 6)){
      makeAvailable(i + 6);
    } if(0 <= i + 10 && i + 10 <= 63 && (!gameBoard[i + 10] || enemy(piece, gameBoard[i + 10])) && validRight(i, i + 10)){
      makeAvailable(i + 10);
    } if(0 <= i + 15 && i + 15 <= 63 && (!gameBoard[i + 15] || enemy(piece, gameBoard[i + 15])) && validLeft(i, i + 15)){
      makeAvailable(i + 15);
    } if(0 <= i + 17 && i + 17 <= 63 && (!gameBoard[i + 17] || enemy(piece, gameBoard[i + 17])) && validRight(i, i + 17)){
      makeAvailable(i + 17);
    }
  }
  if (piece == 'black/bishop' || piece == 'white/bishop') {
    diagonalMovement(props);
  }

  if (piece == 'black/rook' || piece == 'white/rook') {
    horizontalVerticalMovement(props);
  }

  if (piece == 'black/king' || piece == 'white/king') {
      if(i - 8 >= 0 && (!gameBoard[i - 8] || enemy(piece, gameBoard[i - 8]))){
        makeAvailable(i - 8);
      }
      if(i + 8 <= 63 && (!gameBoard[i + 8] || enemy(piece, gameBoard[i + 8]))){
        makeAvailable(i + 8);
      }
      if(i - 1 >= 0 && validLeft(i, i - 1) && (!gameBoard[i - 1] || enemy(piece, gameBoard[i - 1]))){
        makeAvailable(i - 1);
      }
      if(i + 1 <= 63 && validRight(i, i + 1) && (!gameBoard[i + 1] || enemy(piece, gameBoard[i + 1]))){
        makeAvailable(i + 1);
      }
      if(i - 7 >= 0 && validRight(i, i - 7) && (!gameBoard[i - 7] || enemy(piece, gameBoard[i - 7]))){
        makeAvailable(i - 7);
      }
      if(i + 7 <= 63 && validLeft(i, i + 7) && (!gameBoard[i + 7] || enemy(piece, gameBoard[i + 7]))){
        makeAvailable(i + 7);
      }
      if(i - 9 >= 0 && validLeft(i, i - 9) && (!gameBoard[i - 9] || enemy(piece, gameBoard[i - 9]))){
        makeAvailable(i - 9);
      }
      if(i + 9 <= 63 && validRight(i, i + 9) && (!gameBoard[i + 9] || enemy(piece, gameBoard[i + 9]))){
        makeAvailable(i + 9);
      }
  }

  if (piece == 'black/queen' || piece == 'white/queen') {
      diagonalMovement(props);
      horizontalVerticalMovement(props);
  }

  if (piece == 'black/pawn'){
    if(i - 8 >= 0 && !gameBoard[i - 8]){
      makeAvailable(i - 8);
    } if(48 <= i && i <= 55 && !gameBoard[i - 16]){ // If pawn is at starting position, it can move two spaces up
      makeAvailable(i - 16);
    } if(i - 7 >= 0 && whitePiece(gameBoard[i - 7]) && validRight(i, i - 7)){ // If there is an enemy diagonal to the pawn, it can take it
      makeAvailable(i - 7);
    } if(i - 9 >= 0 && whitePiece(gameBoard[i - 9]) && validLeft(i, i - 9)){
      makeAvailable(i - 9);
    }
  }

  if (piece == 'white/pawn'){
    if(i + 8 >= 0 && !gameBoard[i + 8]){
      makeAvailable(i + 8);
    } if(8 <= i && i <= 15 && !gameBoard[i + 16]){ // If pawn is at starting position, it can move two spaces up
      makeAvailable(i + 16);
    } if(i + 7 <= 63 && blackPiece(gameBoard[i + 7]) && validLeft(i, i + 7)){ // If there is an enemy diagonal to the pawn, it can take it
      makeAvailable(i + 7);
    } if(i + 9 <= 63 && blackPiece(gameBoard[i + 9]) && validRight(i, i + 9)){
      makeAvailable(i + 9);
    }
  }
  return React.createElement(
    "button",
    { className: "square-odd", onClick: function onClick() {
        return (
          props.onClick()
        );
      } }
  );
}

// clearAvailable(piece, pos) changes the values of all available positions back to null
//      Technically more efficient than a loop that traverses through the gameBoard
// effects: changes gameBoard
function clearAvailable() {
  let len = gameBoard.length;

  for(i = 0; i < len; ++i){
    if(availablePiece(gameBoard[i])){
      gameBoard[i] = gameBoard[i].substring('available/'.length);
    } else if(gameBoard[i] === 'available'){
      gameBoard[i] = null;
    }
  }
}

function clearAvailable2(piece, pos) {

  if (lastPiece == 'black/knight' || lastPiece == 'white/knight'){
    if(gameBoard[lastPos - 17] == available){
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
