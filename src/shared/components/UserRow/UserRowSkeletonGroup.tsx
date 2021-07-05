import React from 'react';

import { UserRowSkeleton } from 'Components/UserRow/UserRowSkeleton';

interface Props {
  length?: number;
}

export const UserRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <UserRowSkeleton id={index.toString()} key={index} />
    ))}
  </>
);
