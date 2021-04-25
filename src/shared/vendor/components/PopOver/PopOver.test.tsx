import { shallow } from 'enzyme';
import React from 'react';

import { PopOver } from '.';

const props = {
  elementId: 'someId',
  content: 'Some content',
};

describe('PopOver', () => {
  const wrapper = shallow(<PopOver {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".PopOver" wrapper', () => {
    expect(wrapper.find('.PopOver')).toHaveLength(1);
  });
});
