import React from 'react';

import { Span } from '../Span';
import { Triangle } from '../Svg';

import './Vote.less';

interface Props {
  vote?: boolean;
  className?: string;
  changeVote: (vote: boolean | null) => void;
  loading?: boolean;
}

export const Vote: React.FC<Props> = ({ vote, changeVote, className, loading = false }) => (
  <button className={'Vote' + (className ? ' ' + className : '') + (loading ? ' Vote--loading' : '')}>
    <Triangle
      size="nano"
      className={'Vote-icon Vote-minus' + (vote === false ? ' Vote-minus--active' : '')}
      onClick={() => changeVote(vote === false ? null : false)}
    />
    <Span className="Vote-voteSlash" size="micro" weight="semiBold">
      /
    </Span>
    <Triangle
      size="nano"
      className={'Vote-icon Vote-plus' + (vote === true ? ' Vote-plus--active' : '')}
      onClick={() => changeVote(vote === true ? null : true)}
    />
  </button>
);
