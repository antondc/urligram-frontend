import React from 'react';
import { Triangle } from '../Svg';

import './Vote.less';

interface Props {
  vote?: boolean;
  className?: string;
  changeVote: (vote: boolean | undefined) => void;
}

const Vote: React.FC<Props> = ({ vote, changeVote, className }) => (
  <button className={'Vote' + (className ? ' ' + className : '')}>
    <Triangle
      className={'Vote-icon Vote-minus' + (vote === false ? ' Vote--active' : '')}
      onClick={() => (vote === false ? changeVote(undefined) : changeVote(false))}
    />
    <Triangle
      className={'Vote-icon Vote-plus' + (vote === true ? ' Vote--active' : '')}
      onClick={() => (vote === true ? changeVote(undefined) : changeVote(true))}
    />
  </button>
);

export default Vote;
