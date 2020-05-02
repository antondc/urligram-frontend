import React from 'react';
import './Vote.less';
import { Triangle } from '../Svg';

interface Props {
  vote?: boolean;
}

const Vote: React.FC<Props> = ({ vote }) => (
  <button className={'Vote'}>
    <Triangle className={'Vote-icon Vote-minus' + (vote === false ? ' Vote--active' : '')} />
    <Triangle className={'Vote-icon Vote-plus' + (vote === true ? ' Vote--active' : '')} />
  </button>
);

export default Vote;
