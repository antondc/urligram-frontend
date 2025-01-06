import React from 'react';

import CardItem from '../CardItem';
import { BookmarkRowSkeleton } from './BookmarkRowSkeleton';

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
