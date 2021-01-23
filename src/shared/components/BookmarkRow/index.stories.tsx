import React from 'react';

import { FadeInOut, Hr } from '@antoniodcorrea/components';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { BookmarkRow } from './BookmarkRow';
import { BookmarkRowSkeleton } from './BookmarkRowSkeleton';

export default {
  component: BookmarkRow,
  title: 'BookmarkRow',
  decorators: [withKnobs],
};

const noop = () => {};

const props = {
  id: 1,
  linkId: 12,
  title: 'Some title text a bit long',
  url: 'https://en.wikipedia.org/wiki/Khanty',
  img: 'https://picsum.photos/id/123/300/200',
  tags: [
    { id: 1, name: 'Cool' },
    { id: 2, name: 'Interesting' },
  ],
  statistics: {
    absoluteVote: 0,
    timesVoted: 0,
    averageVote: 0,
    timesBookmarked: 0,
    vote: false,
    loading: false,
  },
  onVote: noop,
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <div style={{ padding: '30px' }}>
    <FadeInOut valueToUpdate={knobs.skeleton()} speed="fastest">
      {!knobs.skeleton() ? (
        <>
          <BookmarkRow {...props} />
          <Hr size="small" spacer />
          <BookmarkRow {...props} />
          <Hr size="small" spacer />
          <BookmarkRow {...props} />
          <Hr size="small" spacer />
          <BookmarkRow {...props} />
          <Hr size="small" spacer />
          <BookmarkRow {...props} />
        </>
      ) : (
        <>
          <BookmarkRowSkeleton {...props} />
          <Hr size="small" spacer />
          <BookmarkRowSkeleton {...props} />
          <Hr size="small" spacer />
          <BookmarkRowSkeleton {...props} />
          <Hr size="small" spacer />
          <BookmarkRowSkeleton {...props} />
          <Hr size="small" spacer />
          <BookmarkRowSkeleton {...props} />
        </>
      )}
    </FadeInOut>
  </div>
);
