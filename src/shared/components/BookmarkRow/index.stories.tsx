import React from 'react';

import { BookmarkRow } from '.';

export default {
  component: BookmarkRow,
  title: 'BookmarkRow',
};

const props = {
  id: 1,
  title: 'Some title text a bit long',
  url: 'https://en.wikipedia.org/wiki/Khanty',
  img: 'https://picsum.photos/id/123/300/200',
  tags: [
    { id: 1, name: 'Cool' },
    { id: 2, name: 'Interesting' },
  ],
};

export const Default: React.ReactNode = () => (
  <div style={{ padding: '30px' }}>
    <BookmarkRow {...props} />
  </div>
);
