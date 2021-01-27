import React from 'react';

import { UserRowSkeleton } from 'Components/UserRow/UserRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

interface Props {
  length?: number;
}

export const UserRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <React.Fragment key={index}>
        <UserRowSkeleton id={index} />
        <Hr spacer />
      </React.Fragment>
    ))}
  </>
);
