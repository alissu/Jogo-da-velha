import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const Square: React.FC<{ value: string | null; onClick: () => void; }> = props => {
  return (<button className='sqaure' onClick={() => props.onClick()}>
    {props.value}
  </button>);
}

const Board: React.FC<{ squares: null[] | string[]; onClick: (pos: number) => void }> = props => {
  //TODO: criar interface, ou dois estados para clean code

  const renderSquare = (pos: number) => {
    return <Square value={props.squares[pos]} onClick={() => props.onClick(pos)} />;
  }

  return (<div>
    <div className='board-row'>
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
    </div>
    <div className='board-row'>
      {renderSquare(3)}
      {renderSquare(4)}
      {renderSquare(5)}
    </div>
    <div className='board-row'>
      {renderSquare(6)}
      {renderSquare(7)}
      {renderSquare(8)}
    </div>
  </div>);
}

interface ISquare {
  squares: null[] | string[];
}

interface IGameState {
  history: ISquare[];
  stepNumber: number;
  xIsNext: boolean;
}

const Game: React.FC = () => {
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

const winnerCalculator = (squares: null[] | string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // if (squares[a] === squares[b] && squares[a] === squares[c]) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
