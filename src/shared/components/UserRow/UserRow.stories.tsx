import React from 'react';

import { FadeInOut } from '@antoniodcorrea/components';
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
  createdAt: 29794,
  createdAtFormatted: '29794',
  updatedAt: 29794,
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
      name: 'Aleluya',
    },
    {
      id: 7,
      name: 'Meoplasto',
    },
    {
      id: 8,
      name: 'Sincalope',
    },
    {
      id: 9,
      name: 'Leinham',
    },
    {
      id: 10,
      name: 'Rodchanka',
    },
    {
      id: 11,
      name: 'Engolopasto',
    },
    {
      id: 12,
      name: 'Trilobites',
    },
    {
      id: 13,
      name: 'Meoplasto',
    },
    {
      id: 14,
      name: 'Sincalope',
    },
    {
      id: 15,
      name: 'Leinham',
    },
    {
      id: 16,
      name: 'Rodchanka',
    },
    {
      id: 17,
      name: 'Engolopasto',
    },
    {
      id: 18,
      name: 'Trilobites',
    },
  ],
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <FadeInOut valueToUpdate={knobs.skeleton()} speed="fastest">
    {!knobs.skeleton() ? <UserRow {...props} /> : <UserRowSkeleton id="1" />}
  </FadeInOut>
);
