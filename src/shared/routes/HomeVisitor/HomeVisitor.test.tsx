import { shallow } from 'enzyme';
import React from 'react';

import { mockList } from 'Modules/Lists/list.data';
import { mockUser } from 'Modules/Users/user.data';
import { HomeVisitor as HomeVisitorUI, Props } from './HomeVisitor';

const props: Props = {
  mostFollowedLists: [mockList],
  mostFollowedListsLoading: false,
  newLists: [mockList],
  newListsLoading: false,
  mostFollowedUsers: [mockUser],
  mostFollowedUsersLoading: false,
  newUsers: [mockUser],
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
