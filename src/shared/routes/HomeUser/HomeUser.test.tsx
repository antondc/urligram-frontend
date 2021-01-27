import { shallow } from 'enzyme';
import React from 'react';

import { HomeUser as HomeUserUI } from './HomeUser';

const props = {
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
};

describe('HomeUserUI', () => {
  const wrapper = shallow(<HomeUserUI {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".HomeUser" wrapper', () => {
    expect(wrapper.find('.HomeUser')).toHaveLength(1);
  });
});
