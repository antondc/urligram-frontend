import React from 'react';

import { UserRowSkeleton } from 'Components/UserRow/UserRowSkeleton';
import CardItem from '../CardItem';

interface Props {
  length?: number;
}

export const UserRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <CardItem key={index}>
        <UserRowSkeleton id={index.toString()} />
      </CardItem>
    ))}
  </>
);
