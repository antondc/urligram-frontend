import { shallow } from 'enzyme';
import React from 'react';

import { Users as UsersUi } from './Users';

const props = {
  usersIds: ['string1', 'string2'],
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
  popularListLoading: true,
};

describe('UsersUi', () => {
  const wrapper = shallow(<UsersUi {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Users" wrapper', () => {
    expect(wrapper.find('.Users')).toHaveLength(1);
  });
});
