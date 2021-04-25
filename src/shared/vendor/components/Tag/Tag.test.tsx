import { shallow } from 'enzyme';
import React from 'react';

import { Tag } from '.';

const defaultProps = {};

describe('Tag (Snapshot)', () => {
  it('Tag renders properly', () => {
    const component = shallow(<Tag {...defaultProps}>Test</Tag>);
    expect(component).toMatchSnapshot();
  });
});

describe('Tag', () => {
  it('Tag is a myComponent type <div>', () => {
    const component = shallow(<Tag {...defaultProps}>Test</Tag>);
    expect(component.type()).toEqual('div');
  });
});
