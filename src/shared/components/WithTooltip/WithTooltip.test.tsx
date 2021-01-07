import { shallow } from 'enzyme';
import React from 'react';

import { WithTooltip } from '.';

const props = {
  parentElementId: 'someId',
  content: 'Some content',
};

describe('WithTooltip', () => {
  const wrapper = shallow(<WithTooltip {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".WithTooltip" wrapper', () => {
    expect(wrapper.find('.WithTooltip')).toHaveLength(1);
  });
});
