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
          <LinkRow {...props} />
          <Hr size="small" spacer />
          <LinkRow {...props} />
          <Hr size="small" spacer />
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
          <Hr size="small" spacer />
          <LinkRowSkeleton {...props} />
          <Hr size="small" spacer />
          <LinkRowSkeleton {...props} />
        </>
      )}
    </FadeInOut>
  </div>
);
