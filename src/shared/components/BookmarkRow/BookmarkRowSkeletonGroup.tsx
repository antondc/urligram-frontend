import React from 'react';

import { BookmarkRowSkeleton } from 'Components/BookmarkRow/BookmarkRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

interface Props {
  length?: number;
}

export const BookmarkRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <React.Fragment key={index}>
        <BookmarkRowSkeleton id={index} />
        <Hr spacer size="small"/>
      </React.Fragment>
    ))}
  </>
);
