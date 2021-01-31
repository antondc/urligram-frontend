import { shallow } from 'enzyme';
import React from 'react';

import { ListsUser as ListsUserUi } from './ListsUser';

const props = {
  listsIds: [1, 2],
  popularLists: [],
  loading: true,
};

describe('ListsUserUi', () => {
  const wrapper = shallow(<ListsUserUi {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".ListsUser" wrapper', () => {
    expect(wrapper.find('.ListsUser')).toHaveLength(1);
  });
});
