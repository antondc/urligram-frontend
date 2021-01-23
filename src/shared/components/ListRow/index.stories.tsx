import React from 'react';

import { FadeInOut, Hr } from '@antoniodcorrea/components';
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
  image: 'https://picsum.photos/300/200',
  members: [],
  createdAt: '',
  sinceTranslation: 'since',
  listsIds: [1, 3, 5],
  tags: [
    {
      id: 1,
      name: 'Cool',
    },
    {
      id: 2,
      name: 'Authentic',
    },
    {
      id: 3,
      name: 'Grease',
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
          <ListRow {...props} />
          <Hr size="small" spacer />
          <ListRow {...props} />
          <Hr size="small" spacer />
          <ListRow {...props} />
          <Hr size="small" spacer />
          <ListRow {...props} />
          <Hr size="small" spacer />
          <ListRow {...props} />
          <Hr size="small" spacer />
          <ListRow {...props} />
          <Hr size="small" spacer />
          <ListRow {...props} />
        </>
      ) : (
        <>
          <ListRowSkeleton {...props} />
          <Hr size="small" spacer />
          <ListRowSkeleton {...props} />
          <Hr size="small" spacer />
          <ListRowSkeleton {...props} />
          <Hr size="small" spacer />
          <ListRowSkeleton {...props} />
          <Hr size="small" spacer />
          <ListRowSkeleton {...props} />
          <Hr size="small" spacer />
          <ListRowSkeleton {...props} />
          <Hr size="small" spacer />
          <ListRowSkeleton {...props} />
        </>
      )}
    </FadeInOut>
  </div>
);
