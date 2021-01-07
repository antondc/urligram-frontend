import { shallow } from 'enzyme';
import React from 'react';

import { HomeUI } from './HomeUI';

describe('HomeUI', () => {
  const wrapper = shallow(<HomeUI />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Home" wrapper', () => {
    expect(wrapper.find('.Home')).toHaveLength(1);
  });
});
