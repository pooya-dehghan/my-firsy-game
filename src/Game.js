import React from 'react'
import  Board  from "./components/Board";

export default class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      history :[{squares:Array(9).fill(null)}],
      xisnext: true,
      stepNumber : 0
    }
  }

  handleClck(i){
    
    const history= this.state.history.slice(0 ,this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if(calculateWinner(squares) || squares[i]){
      return;
    }

    squares[i] = this.state.xisnext ? 'X' : 'O'

    this.setState({
      history:history.concat([{squares:squares}]),
      xisnext : !this.state.xisnext,
      stepNumber: history.length,
    })
    console.log('opopop',squares)
  }

  jumpTo(step) {
    this.setState ({
      stepNumber:step,
      xisnext: (step % 2) === 0
    })
    console.log('123',this.state.history)
  }

  render() {
    console.log('222222',this.state.history)
    const history= this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step,move)=>{
      const desc = move ? 'Go to move :' + move : 'Go to game start'
      return(
        <li key = {move}>
          <button onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })    

    let status;

    if(winner){
      status = 'the winner is :' + winner
    }else{
      status = 'the next player is :' + (this.state.xisnext ? 'X' : 'O')
    }


    
    return (
      <div className="game">
      
        <div className="game-board">
          <Board
          onClick = { (i) => this.handleClck(i)}
          squares = {current.squares}
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