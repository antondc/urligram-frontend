import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { FadeInOut, Hr } from 'Vendor/components';
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
  image: {
    original: 'https://cdn-images-1.medium.com/max/1200/original/1*NpUUls7kjn9JhO4ChjGV7w.png',
    w500h500: 'https://dev.linking.me:3000/media/files/users/image/w500h500/f71215e7-2d74-434a-b63b-f6cbd67f8b08.jpg',
    w200h50: 'https://dev.linking.me:3000/media/files/users/image/w200h50/f71215e7-2d74-434a-b63b-f6cbd67f8b08.jpg',
  },
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
  <ProviderWrapper>
    <FadeInOut valueToUpdate={knobs.skeleton()} speed="fastest" appear>
      {!knobs.skeleton() ? <UserRow {...props} /> : <UserRowSkeleton id="1" />}
      <Hr size="small" spacer />
      {!knobs.skeleton() ? <UserRow {...props} /> : <UserRowSkeleton id="1" />}
      <Hr size="small" spacer />
      {!knobs.skeleton() ? <UserRow {...props} /> : <UserRowSkeleton id="1" />}
      <Hr size="small" spacer />
      {!knobs.skeleton() ? <UserRow {...props} /> : <UserRowSkeleton id="1" />}
      <Hr size="small" spacer />
      {!knobs.skeleton() ? <UserRow {...props} /> : <UserRowSkeleton id="1" />}
    </FadeInOut>
  </ProviderWrapper>
);
