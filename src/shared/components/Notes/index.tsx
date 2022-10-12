import React from 'react';

import { A } from '@antoniodcorrea/components';
import CardItem from '../CardItem';

import './Notes.less';

interface Props {
  className?: string;
  text: string;
  userName: string;
  userId: string;
}

const Notes: React.FC<Props> = ({ className, text, userName, userId }) => (
  <CardItem className={'Notes' + (className ? ` ${className}` : '')}>
    <A href={`/users/${userId}`} className="Notes-user" frontend styled={false}>
      @{userName}
    </A>
    <div className="Notes-content">{text}</div>
  </CardItem>
);

export default Notes;
