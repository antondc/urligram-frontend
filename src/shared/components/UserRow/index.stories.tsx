import React from 'react';

import { UserRow } from './UserRow';

export default {
  component: UserRow,
  title: 'UserRow',
};

const props = {
  id: 'string1',
  name: 'User One',
  image: 'https://cdn-images-1.medium.com/max/1200/1*NpUUls7kjn9JhO4ChjGV7w.png',
  level: 'admin',
  email: 'hello@example.com',
  status: 'active',
  statement: 'Some text',
  location: 'Some place',
  order: 1,
  connections: 2,
  ammountLists: 4,
  ammountBookmarks: 4,
  createdAt: new Date(),
  updatedAt: new Date(),
  sinceTranslation: 'since',
  tags: [
    {
      id: 1,
      name: 'One',
    },
    {
      id: 2,
      name: 'Two',
    },
    {
      id: 3,
      name: 'Three',
    },
    {
      id: 4,
      name: 'Four',
    },
    {
      id: 5,
      name: 'Five',
    },
    {
      id: 6,
      name: 'Six',
    },
  ],
};

export const Default: React.ReactNode = () => <div style={{ padding: '30px' }}>{<UserRow {...props} />}</div>;
