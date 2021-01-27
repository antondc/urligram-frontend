import React from 'react';

import { BookmarkRowSkeleton } from 'Components/BookmarkRow/BookmarkRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

interface Props {
  length?: number;
}

export const BookmarksRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => {
  const arrayWithItemsLength = new Array(length);

  return (
    <>
      {arrayWithItemsLength.map((_, index) => (
        <React.Fragment key={index}>
          <BookmarkRowSkeleton id={index} />
          <Hr spacer />
        </React.Fragment>
      ))}
    </>
  );
};
