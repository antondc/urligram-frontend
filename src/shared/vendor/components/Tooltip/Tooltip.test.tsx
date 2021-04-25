import { shallow } from 'enzyme';
import React from 'react';

import { Tooltip } from '.';

const props = {
  parentElementId: 'someId',
  content: 'Some content',
};

describe('Tooltip', () => {
  const wrapper = shallow(<Tooltip {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Tooltip" wrapper', () => {
    expect(wrapper.find('.Tooltip')).toHaveLength(1);
  });
});
