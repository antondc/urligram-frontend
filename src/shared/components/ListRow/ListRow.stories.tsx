import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { ListRow } from './ListRow';
import { ListRowSkeleton } from './ListRowSkeleton';

export default {
  component: ListRow,
  title: 'ListRow',
  decorators: [withKnobs],
};

const props = {
  id: 1,
  name: 'List name',
  description: 'List description, this is a cool list',
  image: 'https://picsum.photos/300/200',
  members: [],
  createdAt: 2453453,
  createdAtFormatted: '',
  sinceTranslation: 'since',
  listsIds: [1, 3, 5],
  isPrivateRequestFailed: false,
  isPrivateRequestPending: false,
  sessionUserFollowsList: false,
  sessionUserOwnsList: false,
  onEdit: () => {},
  onPrivateSwitch: () => {},
  onFollowList: () => {},
  onUnfollowList: () => {},
  publicLoading: false,
  onPublicClick: () => {},
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
  iconActionPending: true,
  renderIsPublic: true,
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.FC = () => (
  <ProviderWrapper>{!knobs.skeleton() ? <ListRow {...props} /> : <ListRowSkeleton {...props} />}</ProviderWrapper>
);
