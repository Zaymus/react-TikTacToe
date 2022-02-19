// import necessary react modules
import React from "react";
import ReactDOM from "react-dom";
// import css stylesheet
import "./index.css";

// square class definition which extends react component and defines a render method
// this render method defines what html object the square will display as
/*
class Square extends React.Component {
	// method that returns the react object defined as an html object
	render() {
		// give the object a value by placing this.props.value within the element tags.
		// value must be defined when the object is being defined.

		// to change the valzxue held within the satte of the square object
		// we must use the setState method which takes a dictionary of new values
		// calling the setState within a event will cause the element to re-render the object to reflect any change
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}
}*/

// functional component of square to demonstrate the alternate form of creating a react component.
// functional components tend to be less tedious to write than class components and many components can be written this was as an alternate.
function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

// board class definition which extends react component and defines a render and renderSquare method
class Board extends React.Component {
	// react components use state to remember information so we must redefine state to allow
	// the object to remember the information we want to use later
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		squares: Array(9).fill(null),
	// 		xIsNext: true,
	// 	};
	// }

	// renderSquare method returns an instance of Square class and is used to define a new html tag
	// since the square's value is being handled by the board object, the squares are now a controlled component
	renderSquare(i) {
		return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	// render method that creates the board object by creating divs and uses the renderSquare method
	// to generate a 3x3 area of squares to create a a playable area
	render() {
		return (
			<div>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

// Game object definition that creates a board object and other necessary html structure to create a tic-tac toe instance
class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					squares: Array(9).fill(null),
				},
			],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		// create a copy of the current array in the board object state
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? "X" : "O";
		// update squares array to the modified copy of the squares array
		this.setState({
			history: history.concat([
				{
					squares: squares,
				},
			]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: step % 2 === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ? "Go to move #" + move : "Go to game start";
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

		let status;
		if (winner) {
			status = "Winner: " + winner;
		} else {
			status = "Next player: " + (this.state.xIsNext ? "X" : "O");
		}

		return (
			<div className="game">
				<div className="game-board">
					<Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
				</div>
				<div className="game-info">
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// render a game instance within the root of the webpage
ReactDOM.render(<Game />, document.getElementById("root"));
