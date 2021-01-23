import { shallow } from 'enzyme';
import React from 'react';

import { Lists as ListsUi } from './Lists';

const props = {
  listsIds: [1, 2],
  popularLists: [
    {
      id: 3,
      name: 'Third list',
      image: '',
      description: 'More links',
      isPrivate: false,
      userId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      createdAt: '2021-01-08T17:22:29.000Z',
      updatedAt: '2021-01-08T17:22:29.000Z',
      members: [
        {
          id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
          name: 'User3',
          userRole: 'admin',
        },
      ],
      bookmarksIds: [1, 2, 3],
      tags: [],
    },
  ],
  loading: true,
};

describe('ListsUi', () => {
  const wrapper = shallow(<ListsUi {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Lists" wrapper', () => {
    expect(wrapper.find('.Lists')).toHaveLength(1);
  });
});
