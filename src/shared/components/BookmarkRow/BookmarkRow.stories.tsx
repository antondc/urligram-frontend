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
    { id: 3, name: 'Lorem' },
    { id: 4, name: 'Ipsum' },
    { id: 5, name: 'Ador' },
    { id: 6, name: 'Cenit' },
    { id: 7, name: 'Culmen' },
    { id: 8, name: 'Zanot' },
    { id: 9, name: 'Articles' },
    { id: 10, name: 'Noticias' },
    { id: 11, name: 'Aeronautica' },
    { id: 12, name: 'Neplomasto' },
    { id: 13, name: 'Clamolito' },
    { id: 14, name: 'Posadka' },
    { id: 14, name: 'Amelokasto' },
    { id: 14, name: 'Klimolerato' },
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

// const knobs = {
//   skeleton: (): boolean => boolean('Skeleton', false),
// };

export const Default: React.ReactNode = () => (
  <BookmarkRow {...props} />
  // <FadeInOut valueToUpdate={knobs.skeleton()} speed="fastest">
  //   {!knobs.skeleton() ? <BookmarkRow {...props} /> : <BookmarkRowSkeleton {...props} />}
  // </FadeInOut>
);
