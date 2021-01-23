import React from 'react';

import { FadeInOut, Hr } from '@antoniodcorrea/components';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { UserRow } from './UserRow';
import { UserRowSkeleton } from './UserRowSkeleton';

export default {
  component: UserRow,
  title: 'UserRow',
  decorators: [withKnobs],
};

const props = {
  id: 'string1',
  name: 'Emile_879',
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

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <div style={{ padding: '30px' }}>
    <FadeInOut valueToUpdate={knobs.skeleton()} speed="fastest">
      {!knobs.skeleton() ? (
        <>
          <UserRow {...props} />
          <Hr size="small" spacer />
          <UserRow {...props} />
          <Hr size="small" spacer />
          <UserRow {...props} />
          <Hr size="small" spacer />
          <UserRow {...props} />
          <Hr size="small" spacer />
          <UserRow {...props} />
          <Hr size="small" spacer />
          <UserRow {...props} />
          <Hr size="small" spacer />
          <UserRow {...props} />
        </>
      ) : (
        <>
          <UserRowSkeleton {...props} />
          <Hr size="small" spacer />
          <UserRowSkeleton {...props} />
          <Hr size="small" spacer />
          <UserRowSkeleton {...props} />
          <Hr size="small" spacer />
          <UserRowSkeleton {...props} />
          <Hr size="small" spacer />
          <UserRowSkeleton {...props} />
          <Hr size="small" spacer />
          <UserRowSkeleton {...props} />
          <Hr size="small" spacer />
          <UserRowSkeleton {...props} />
        </>
      )}
    </FadeInOut>
  </div>
);
