import React from 'react';
import Board from './components/board';
import { winnerCalculator } from './utils/calculateWinner';

interface ISquare {
  squares: null[] | string[];
}

interface IGameState {
  history: ISquare[];
  stepNumber: number;
  xIsNext: boolean;
}

const App: React.FC = () => {
  const [gameHistory, setGameHistory] = React.useState<IGameState>({
    history: [{
      squares: Array(9).fill(null)
    }],
    stepNumber: 0,
    xIsNext: true
  });

  const handleClick = (pos: number): void => {
    const currentHistory = gameHistory.history.slice(0, gameHistory.stepNumber + 1);
    const current = currentHistory[gameHistory.stepNumber];
    const squares = current.squares.slice();
    console.log('winnerCalculator(squares)', winnerCalculator(squares));
    //Verificando se já temum vencedor, ou se o quadrado atual já está marcado
    if (winnerCalculator(squares) || squares[pos]) {
      return;
    }

    squares[pos] = gameHistory.xIsNext ? 'X' : 'O';
    const newHistory = currentHistory.concat([{
      squares: squares
    }]);

    setGameHistory({ history: newHistory, stepNumber: currentHistory.length, xIsNext: !gameHistory.xIsNext });
  }

  const jumpTo = (step: number) => {
    console.log('step', step);
    setGameHistory({
      ...gameHistory,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  const history = gameHistory.history;
  const current = history[history.length - 1];
  const squares = current.squares;
  const winner = winnerCalculator(squares);

  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move: ' + move : 'Go to game start';

    return (<li key={move}>
      <button onClick={() => jumpTo(move)}> {desc} </button>
    </li>);
  });

  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next ĺayer: ' + (gameHistory.xIsNext ? 'X' : 'O');
  }

  return (<div className='game'>
    <div>
      <Board onClick={handleClick} squares={squares} />
    </div>
    <div className='game-info'>
      <div> {status} </div>
      <ol> {moves} </ol>
    </div>
  </div>);
}

export default App;
