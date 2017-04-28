// changePos(props) changes the position of the previously selected figure to the newly selected position
// effects: changes gameBoard
function changePos(props) {
  let i = props.value;
  let piece = gameBoard[i];
  clearAvailable();

  gameBoard[i] = lastPiece;
  gameBoard[lastPos] = null;
  offset = 0;

  return lastPiece;
}

// SquareEven(props) creates a new clickable square, with alternating colours compared to SquareOdd
function SquareEven(props) {
  if (gameBoard[props.value]) { // If props.value[1] (= squares[i]) within renderSquare() is not null, then let it be clicked
    if (gameBoard[props.value] == available){
      return React.createElement(
        "button",
        { className: "square-even", onClick: function onClick() {
          changePos(props);
          return (
            props.onClick(),
            alert('This is available!')
          );
          } },
          React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
      );
    }
    return React.createElement(
      "button",
      { className: "square-even", onClick: function onClick() {
        clearAvailable();
        possibleMoves(props);
        return (
          props.onClick(),
          alert('Unavailable!')
        );
        } },
        React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
    );
  }
  return React.createElement( // If props.value[1] is null, then dont let it be clicked
    "button",
    { className: "square-even" },
      React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
  );
}

// SquareEven(props) creates a new clickable square, with alternating colours compared to SquareOdd
// These two functions could easily be reduced to one function, but I am very lazy
function SquareOdd(props) {
  if (gameBoard[props.value]) { // If props.value[1] (= squares[i]) within renderSquare() is not null, then let it be clicked
    if (gameBoard[props.value] == available){
      return React.createElement(
        "button",
        { className: "square-odd", onClick: function onClick() {
          changePos(props);
          return (
            props.onClick(),
            alert('This is available!')
          );
          } },
          React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
      );
    }
    return React.createElement(
      "button",
      { className: "square-odd", onClick: function onClick() {
        clearAvailable();
        possibleMoves(props);
        return (
          props.onClick(),
          alert('Unavailable!')
        );
        } },
        React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
    );
  }
  return React.createElement( // If props.value[1] is null, then dont let it be clicked
    "button",
    { className: "square-odd" },
      React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
  );
}

// sameRow(a, b) determines if a and b are within the same row
function sameRow(a, b){
  return math.abs(a - b) < 8;
}

// sameColumn(a, b) determines if a and b are within the same column
function sameColumn(a, b) {
  return a % 8 == b % 8;
}
