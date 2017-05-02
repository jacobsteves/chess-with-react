"use strict";

//======================================== Variables =========================================

var row = 1; // r = Row, this variable is used take offset into account when colouring the board
var available = 'available';
var lastPiece = '';
var lastPos = -1;
var nextPlayer = true; //Bool
var win = null;
var gameBoard = populateBoard();
var tempBoard = gameBoard;
var curPlayer = 'Black';

//next step: insert gameBoard so that it is passed down through props. This will allow the moves to display once history is clicked.
//     currently, since gameBoard is a global var, it overrides the history (as nothing new gets passed down when history changes);
//============================================================================================



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isEven(n) {
  return n % 2 == 0;
}

var Board = function (_React$Component) {
  _inherits(Board, _React$Component);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Board.prototype.renderSquare = function renderSquare(i) {
    var _this2 = this;

    var squares = this.props.squares;
    if(i % 8 == 0) { // if I reaches 8, start a new row
      ++row;
    }
    if(isEven(i + row)){
      return React.createElement(SquareEven,
        { value: i, onClick: function onClick() { return _this2.props.onClick(i) }
      });
    } else {
      return React.createElement(SquareOdd,
        { value: i, onClick: function onClick() { return _this2.props.onClick(i) }
      });
    }
  };

  Board.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(0),
        this.renderSquare(1),
        this.renderSquare(2),
        this.renderSquare(3),
        this.renderSquare(4),
        this.renderSquare(5),
        this.renderSquare(6),
        this.renderSquare(7)
      ),
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(8),
        this.renderSquare(9),
        this.renderSquare(10),
        this.renderSquare(11),
        this.renderSquare(12),
        this.renderSquare(13),
        this.renderSquare(14),
        this.renderSquare(15)
      ),
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(16),
        this.renderSquare(17),
        this.renderSquare(18),
        this.renderSquare(19),
        this.renderSquare(20),
        this.renderSquare(21),
        this.renderSquare(22),
        this.renderSquare(23)
      ),
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(24),
        this.renderSquare(25),
        this.renderSquare(26),
        this.renderSquare(27),
        this.renderSquare(28),
        this.renderSquare(29),
        this.renderSquare(30),
        this.renderSquare(31)
      ),
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(32),
        this.renderSquare(33),
        this.renderSquare(34),
        this.renderSquare(35),
        this.renderSquare(36),
        this.renderSquare(37),
        this.renderSquare(38),
        this.renderSquare(39)
      ),
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(40),
        this.renderSquare(41),
        this.renderSquare(42),
        this.renderSquare(43),
        this.renderSquare(44),
        this.renderSquare(45),
        this.renderSquare(46),
        this.renderSquare(47)
      ),
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(48),
        this.renderSquare(49),
        this.renderSquare(50),
        this.renderSquare(51),
        this.renderSquare(52),
        this.renderSquare(53),
        this.renderSquare(54),
        this.renderSquare(55)
      ),
      React.createElement(
        "div",
        { className: "board-row" },
        this.renderSquare(56),
        this.renderSquare(57),
        this.renderSquare(58),
        this.renderSquare(59),
        this.renderSquare(60),
        this.renderSquare(61),
        this.renderSquare(62),
        this.renderSquare(63)
      ),
      React.createElement(
        "h3",
        this.props.squares
      )
    );
  };

  return Board;
}(React.Component);

var Game = function (_React$Component2) { // This is just copied from the tutorial, nothing changed yet
  _inherits(Game, _React$Component2);

  function Game() {
    _classCallCheck(this, Game);

    var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this));

    _this3.state = {
      history: [{
        squares: gameBoard,
      }],
      playerHistory: [{
        curPlayer: curPlayer,
      }],
      stepNumber: 0,
      xIsNext: true
    };
    return _this3;
  }

  Game.prototype.handleClick = function handleClick(i) {
    var history = this.state.history.slice(0, this.state.stepNumber + 1);
    var playerHistory = this.state.playerHistory.slice(0, this.state.stepNumber + 1);
    var current = history[history.length - 1];
    var squares = gameBoard.slice();
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    //squares[i] = this.state.xIsNext ? 'Black' : 'White';    //commented this out

    //if (nextPlayer) {
      this.setState({
        stepNumber: history.length,
        history: history.concat([{
          squares: squares // This concatnates the current board to the history
        }]),
        playerHistory: playerHistory.concat([{
          curPlayer: curPlayer // This concatnates the current board to the history
        }]),
        xIsNext: !this.state.xIsNext
      });
      //alert(history[this.state.stepNumber]);
      //nextPlayer = 0;
    //}
}

  Game.prototype.jumpTo = function jumpTo(step, curboard) {
    gameBoard = curboard;
    if(step == 0){
      gameBoard = populateBoard();
    }
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    });
  };

  Game.prototype.render = function render() {
    var _this4 = this;

    var history = this.state.history;
    var playerHistory = this.state.playerHistory;
    var current = history[this.state.stepNumber];
    var winner = calculateWinner(current.squares);
    //alert(playerHistory.curPlayer);
    var status = undefined;
    if (win) {
      status = 'Winner: ' + win;
    } else {
      status = 'Next player: ' + curPlayer;
    }

    var moves = history.map(function (step, move) {
      if (nextPlayer){
        var desc = move ? 'Move #' + move: 'Start';
      }
      return React.createElement(
          "li",
          { key: move },
          React.createElement(
            "a",
            { href: "#", onClick: function onClick() {
                return _this4.jumpTo(move, history[move].squares);
              } },
            desc
          )
        );
    });

    return React.createElement(
      "div",
      { className: "game" },
      React.createElement(
        "div",
        null,
        React.createElement(Board, {
          squares: current.squares,
          onClick: function onClick(i) {
            return _this4.handleClick(i);
          }
        })
      ),
      React.createElement(
        "div",
        { className: "game-info" },
        React.createElement(
          "div",
          null,
          status
        ),
        React.createElement(
          "ol",
          null,
          moves
        )
      )
    );
  };

  return Game;
}(React.Component);

// ========================================

// Render the Game
ReactDOM.render(React.createElement(Game, null), document.getElementById('root'));

// Logic for Tic Tac Toe Winner
function calculateWinner(squares) {
  var lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (var i = 0; i < lines.length; i++) {
    var _lines$i = lines[i];
    var a = _lines$i[0];
    var b = _lines$i[1];
    var c = _lines$i[2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
