
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// changePos(props) changes the position of the previously selected figure to the newly selected position
// effects: changes gameBoard
function changePos(props) {
  let i = props.value;
  let piece = gameBoard[i];
  clearAvailable();
  tempBoard = gameBoard;
  if(gameBoard[i] === 'black/king'){
    win = 'White';
  } else if(gameBoard[i] === 'white/king'){
    win = 'Black';
  }

  if(curPlayer === 'Black'){
    curPlayer = 'White';
  } else {
    curPlayer = 'Black';
  }

  gameBoard[i] = lastPiece;
  gameBoard[lastPos] = null;
  nextPlayer = 1;

  return lastPiece;
}

// updatableImage creates game objects which are automatically updated when the paramaters in props are changed
var updatableImage = function (_React$Component3) {
  _inherits(updatableImage, _React$Component3);

  function updatableImage() {
    _classCallCheck(this, updatableImage);

    var _this5 = _possibleConstructorReturn(this, _React$Component3.call(this));

    _this5.state = {
      vale: gameBoard[props.value]
    };
    return _this5;
  }

  updatableImage.prototype.render = function render() {
    return React.createElement("img", { src: "img/" + this.state.value + ".png", className: 'icon' });
  };

  return updatableImage;
}(React.Component);

// SquareEven(props) creates a new clickable square, with alternating colours compared to SquareOdd
function SquareEven(props) {
  if (!win && gameBoard[props.value] && (colour(gameBoard[props.value]) === curPlayer || gameBoard[props.value] == available || availablePiece(gameBoard[props.value]))) { // If props.value[1] (= squares[i]) within renderSquare() is not null, then let it be clicked
    if (gameBoard[props.value] == available || availablePiece(gameBoard[props.value])){
      return React.createElement(
        "button",
        { className: "square-even", onClick: function onClick() {
          changePos(props);
          return props.onClick();
          } },
          React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon'})
      );
    }
    return React.createElement(
      "button",
      { className: "square-even", onClick: function onClick() {
        clearAvailable();
        possibleMoves(props);
        return props.onClick();
        } },
        React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
    );
  }
  return React.createElement( // If gameBoard[props.value] is null, then dont let it be clicked
    "button",
    { className: "square-even" },
      React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
  );
}

// SquareOdd(props) creates a new clickable square, with alternating colours compared to SquareOdd
// These two functions could easily be reduced to one function, but I am very lazy
function SquareOdd(props) {
  if (!win && gameBoard[props.value] && (colour(gameBoard[props.value]) === curPlayer || gameBoard[props.value] == available || availablePiece(gameBoard[props.value]))) { // If props.value[1] (= squares[i]) within renderSquare() is not null, then let it be clicked
    if (gameBoard[props.value] == available || availablePiece(gameBoard[props.value])){
      return React.createElement(
        "button",
        { className: "square-odd", onClick: function onClick() {
          changePos(props);
          return props.onClick();
          } },
          React.createElement("img", { src: "img/" + gameBoard[props.value] + ".png", className: 'icon' })
      );
    }
    return React.createElement(
      "button",
      { className: "square-odd", onClick: function onClick() {
        clearAvailable();
        possibleMoves(props);
        return props.onClick();
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
