import { shallow } from 'enzyme';
import React from 'react';

import { HomeVisitor as HomeVisitorUI, Props } from './HomeVisitor';

const user = {
  id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  name: 'User3',
  level: 'user',
  email: 'hello1@example.com',
  image: 'https://loremflickr.com/300/300/portrait',
  status: 'active',
  statement: 'The quick brown fox jumps over the lazy dog',
  location: 'Moon',
  order: 3,
  createdAt: '2015-03-19T16:47:48.000Z',
  updatedAt: '2021-01-10T16:47:48.000Z',
  bookmarks: [21, 23, 24, 25, 26, 27, 28, 29, 30],
  lists: [
    {
      id: 10,
      userRole: 'editor',
    },
  ],
  followers: null,
  following: ['e4e2bb46-c210-4a47-9e84-f45c789fcec1'],
  tags: [
    {
      id: 7,
      name: 'periódicos',
    },
    {
      id: 8,
      name: 'artículos',
    },
  ],
};

const list = {
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
      userRole: 'admin',
    },
  ],
  bookmarksIds: [1, 2, 3],
  tags: [],
};

const props: Props = {
  mostFollowedLists: [list],
  mostFollowedListsLoading: false,
  newLists: [list],
  newListsLoading: false,
  mostFollowedUsers: [user],
  mostFollowedUsersLoading: false,
  newUsers: [user],
  newUsersLoading: false,
};

describe('HomeVisitorUI', () => {
  const wrapper = shallow(<HomeVisitorUI {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".HomeVisitor" wrapper', () => {
    expect(wrapper.find('.HomeVisitor')).toHaveLength(1);
  });
});
