import React from 'react';
import Square from '../square';

interface IProps {
  squares: null[] | string[];
  onClick: (pos: number) => void;
}

const Board: React.FC<IProps> = props => {
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

export default Board;