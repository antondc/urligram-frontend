import { shallow } from 'enzyme';
import React from 'react';

import { UsersUser as UsersUserUi } from './UsersUser';

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
      Ids: [],
      bookmarksIds: [1, 2, 3],
      membersIds: [],
      tags: [],
    },
  ],
  usersLoading: true,
  popularListLoading: true,
};

describe('UsersUserUi', () => {
  const wrapper = shallow(<UsersUserUi {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Users" wrapper', () => {
    expect(wrapper.find('.UsersUser')).toHaveLength(1);
  });
});
