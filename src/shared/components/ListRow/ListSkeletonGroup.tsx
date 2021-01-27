import React from 'react';

import { ListRowSkeleton } from 'Components/ListRow/ListRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

interface Props {
  length?: number;
}

export const ListRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <React.Fragment key={index}>
        <ListRowSkeleton id={index} />
        <Hr spacer />
      </React.Fragment>
    ))}
  </>
);
