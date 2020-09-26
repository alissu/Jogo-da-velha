import React from 'react';

interface IProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<IProps> = props => {
  return (<button className='sqaure' onClick={() => props.onClick()}>
    {props.value}
  </button>);
}

export default Square;