import { shallow } from 'enzyme';
import React from 'react';

import { SpinnerSquaredSmooth } from '.';

describe('SpinnerSquaredSmooth (Snapshot)', () => {
  it('SpinnerSquaredSmooth renders properly', () => {
    const component = shallow(<SpinnerSquaredSmooth />);
    expect(component).toMatchSnapshot();
  });
});

describe('SpinnerSquaredSmooth', () => {
  it('SpinnerSquaredSmooth is a myComponent type <div>', () => {
    const component = shallow(<SpinnerSquaredSmooth />);
    expect(component.type()).toEqual('svg');
  });
});
