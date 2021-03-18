import React from 'react';

import { FadeInOut, Hr } from '@antoniodcorrea/components';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { LinkRow } from './LinkRow';
import { LinkRowSkeleton } from './LinkRowSkeleton';

export default {
  component: LinkRow,
  title: 'LinkRow',
  decorators: [withKnobs],
};

const noop = () => {};

const props = {
  id: 1,
  linkId: 12,
  title:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum ipsum perspiciatis eveniet porro quis, reprehenderit voluptates eum debitis amet consectetur maxime dolores, nesciunt impedit veniam! Accusamus repellat accusantium quam tempore!',
  url:
    'https://en.wikipedia.org/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty/wiki/Khanty',
  img: 'https://picsum.photos/id/123/300/200',
  tags: [
    { id: 1, name: 'Cool' },
    { id: 2, name: 'Interesting' },
    { id: 3, name: 'Cool' },
    { id: 4, name: 'Aaa' },
    { id: 5, name: 'Interesting' },
    { id: 6, name: 'Cool' },
    { id: 7, name: 'Taf' },
    { id: 8, name: 'Rgsg' },
    { id: 9, name: 'Cool' },
    { id: 10, name: 'AeFu' },
  ],
  favicon: 'https://www.google.com/s2/favicons?domain=www.aeroprakt.com',
  statistics: {
    absoluteVote: 0,
    timesVoted: 0,
    averageVote: 0,
    timesLinked: 0,
    vote: false,
    loading: false,
    timesBookmarked: 10,
  },
  onVote: noop,
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <FadeInOut valueToUpdate={knobs.skeleton()} speed="fastest" appear>
    {!knobs.skeleton() ? (
      <>
        <LinkRow {...props} />
        <Hr size="small" spacer />
        <LinkRow {...props} />
        <Hr size="small" spacer />
        <LinkRow {...props} />
        <Hr size="small" spacer />
        <LinkRow {...props} />
        <Hr size="small" spacer />
        <LinkRow {...props} />
      </>
    ) : (
      <>
        <LinkRowSkeleton {...props} />
        <Hr size="small" spacer />
        <LinkRowSkeleton {...props} />
        <Hr size="small" spacer />
        <LinkRowSkeleton {...props} />
        <Hr size="small" spacer />
        <LinkRowSkeleton {...props} />
        <Hr size="small" spacer />
        <LinkRowSkeleton {...props} />
      </>
    )}
  </FadeInOut>
);
