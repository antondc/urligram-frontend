import React from 'react';

import { LinkRow } from './LinkRow';

export default {
  component: LinkRow,
  title: 'LinkRow',
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

export const Default: React.ReactNode = () => (
  <div style={{ padding: '30px' }}>
    <LinkRow {...props} />
  </div>
);
