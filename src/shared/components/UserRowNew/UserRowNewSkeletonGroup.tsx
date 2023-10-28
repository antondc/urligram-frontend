import React from 'react';

import { UserRowNewSkeleton } from 'Components/UserRowNew/UserRowNewSkeleton';
import CardItem from '../CardItem';

interface Props {
  length?: number;
}

export const UserRowNewSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <CardItem key={index}>
        <UserRowNewSkeleton id={index.toString()} />
      </CardItem>
    ))}
  </>
);
