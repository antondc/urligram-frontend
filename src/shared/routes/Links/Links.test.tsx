import { shallow } from 'enzyme';
import React from 'react';

import { LinksUi } from './linksUi';

const props = {
  linksIds: [1, 2],
};

describe('LinksUi', () => {
  const wrapper = shallow(<LinksUi {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Links" wrapper', () => {
    expect(wrapper.find('.Links')).toHaveLength(1);
  });
});
