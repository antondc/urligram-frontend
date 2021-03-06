import React from 'react';

import { LinkRowSkeleton } from 'Components/LinkRow/LinkRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

interface Props {
  length?: number;
}

export const LinkRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <React.Fragment key={index}>
        <LinkRowSkeleton id={index} />
        <Hr spacer size="small" />
      </React.Fragment>
    ))}
  </>
);
