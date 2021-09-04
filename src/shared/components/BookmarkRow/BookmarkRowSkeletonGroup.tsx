import React from 'react';

import { BookmarkRowSkeleton } from 'Components/BookmarkRow/BookmarkRowSkeleton';
import CardItem from '../CardItem';

interface Props {
  length?: number;
}

export const BookmarkRowSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <CardItem key={index}>
        <BookmarkRowSkeleton id={index} />
      </CardItem>
    ))}
  </>
);
