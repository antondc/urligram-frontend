import React from 'react';

import { BookmarkRowSkeleton } from 'Components/BookmarkRow/BookmarkRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

export const BookmarksSkeleton: React.FC = () => (
  <>
    <BookmarkRowSkeleton id={1} />
    <Hr spacer />
    <BookmarkRowSkeleton id={2} />
    <Hr spacer />
    <BookmarkRowSkeleton id={3} />
    <Hr spacer />
    <BookmarkRowSkeleton id={4} />
    <Hr spacer />
    <BookmarkRowSkeleton id={5} />
    <Hr spacer />
    <BookmarkRowSkeleton id={6} />
    <Hr spacer />
    <BookmarkRowSkeleton id={7} />
    <Hr spacer />
    <BookmarkRowSkeleton id={8} />
    <Hr spacer />
    <BookmarkRowSkeleton id={9} />
    <Hr spacer />
    <BookmarkRowSkeleton id={10} />
  </>
);
