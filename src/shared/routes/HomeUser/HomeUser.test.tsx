import { shallow } from 'enzyme';
import React from 'react';

import { HomeUser as HomeUserUI } from './HomeUser';

const props = {
  myLists: [],
  myListsLoading: false,
  followingLists: [],
  followingListsLoading: false,
  myTags: [],
  myTagsLoading: false,
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
