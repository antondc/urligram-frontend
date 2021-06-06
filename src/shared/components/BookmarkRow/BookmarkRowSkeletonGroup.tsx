import React from 'react';

import { BookmarkRowSkeleton } from 'Components/BookmarkRow/BookmarkRowSkeleton';

interface Props {
  length?: number;
}

export const BookmarkRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <BookmarkRowSkeleton id={index} key={index} />
    ))}
  </>
);
