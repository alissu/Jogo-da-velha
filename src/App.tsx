import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const Square: React.FC<{value: string | null; onClick: () => void;}> = props => {
  return (<button className='sqaure' onClick={() => props.onClick()}>
    {props.value}
  </button>);
}

const Board: React.FC = () => {
  //TODO: criar interface, ou dois estados para clean code
  const [gameState, setGameState] = React.useState<{
    squares: null[] | string[];
    xIsNext: boolean;
  }>({
    squares: Array(9).fill(null),
    xIsNext: true
  });

  const handleClick = (pos: number): void => {
    const squaresCopy = gameState.squares.slice();
    squaresCopy[pos] = gameState.xIsNext ? 'X' : 'O';
    setGameState({squares: squaresCopy, xIsNext: !gameState.xIsNext});
  }

  const renderSquare = (pos: number) => {
    return <Square value={gameState.squares[pos]} onClick={() => handleClick(pos)} />;
  }

  const winner = winnerCalculator(gameState.squares);
  let status;

  if(winner){
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player ' + (gameState.xIsNext ? 'X' : 'O');
  }

  return (<div>
    <div className='status'>{status}</div>
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

const Game: React.FC = () => {
  return(<div className='game'>
    <div>
      <Board />
    </div>
    <div className='game-info'>
      <div> {/* STATUS */} </div>
      <div> {/* TODO */} </div>
    </div>
  </div>);
}

const winnerCalculator = (squares: null[] | string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 8],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if(squares[a] === squares[b] && squares[a] === squares[c]) {
    // if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { correto
      return squares[a];
    }
    return null;
  }
}

export default App;
