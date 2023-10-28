import React from 'react';

import CardItem from '../CardItem';
import { BookmarkRowNewSkeleton } from './BookmarkRowNewSkeleton';

interface Props {
  length?: number;
}

export const BookmarkRowNewSkeletonGroup: React.FC<Props> = ({ length = 10 }) => (
  <>
    {Array.from({ length }, (_, index) => (
      <CardItem key={index}>
        <BookmarkRowNewSkeleton id={index} />
      </CardItem>
    ))}
  </>
);
