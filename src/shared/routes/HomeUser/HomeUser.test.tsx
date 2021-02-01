import { shallow } from 'enzyme';
import React from 'react';

import { mockUser } from 'Modules/Users/user.data';
import { HomeUser as HomeUserUI } from './HomeUser';

const props = {
  user: mockUser,
  bookmarksLoading: false,
  sessionId: '',
  myLists: [],
  myListsLoading: false,
  followingLists: [],
  followingListsLoading: false,
  myTags: [],
  myTagsLoading: false,
  followingUsers: [],
  followingUsersLoading: false,
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
