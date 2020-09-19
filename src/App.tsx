import React from 'react';

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

const Square: React.FC<{value: number}> = props => {
  const [value, setValue] = React.useState<string | null>(null);

  return (<button className='sqaure' onClick={() => setValue('X')}>
    {value}
  </button>);
}

const Board: React.FC = () => {
  const [square, setSquare] = React.useState<null[] | number[]>(Array(9).fill(null));

  const renderSquare = (value: number) => {
    return <Square value={value} />;
  }

  const status = 'Next player X';
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

export default App;
