import React from 'react';

import { ListRow } from './ListRow';

export default {
  component: ListRow,
  title: 'ListRow',
};

const props = {
  id: 1,
  name: '',
  image: '',
  members: [],
  createdAt: '',
  sinceTranslation: 'since',
  listsIds: [],
  tags: [],
};

export const Default: React.ReactNode = () => <div style={{ padding: '30px' }}>{<ListRow {...props} />}</div>;
