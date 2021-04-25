import { shallow } from 'enzyme';
import React from 'react';

import { Palette } from '.';

const defaultProps = {};

describe('Palette (Snapshot)', () => {
  it('Palette renders properly', () => {
    const component = shallow(<Palette {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });
});

describe('Palette', () => {
  it('Palette is a myComponent type <div>', () => {
    const component = shallow(<Palette {...defaultProps} />);
    expect(component.type()).toEqual('div');
  });
});
