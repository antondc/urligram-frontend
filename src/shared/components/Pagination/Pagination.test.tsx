import { shallow } from 'enzyme';
import React from 'react';

import Pagination from '.';

const defaultProps = {
  totalItems: 100,
  itemsPerPage: 7,
  offset: 14,
  path: 'http://example.com',
};

describe('Pagination (Snapshot)', () => {
  it('Pagination renders properly', () => {
    const component = shallow(<Pagination {...defaultProps} />);
    expect(component).toMatchSnapshot();
  });
});
