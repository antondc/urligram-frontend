import React from 'react';
import { shallow } from 'enzyme';
import { HomeUI } from './HomeUI';

const props = {
  bookmarks: [
    {
      id: 1,
      title: 'My first bookmark',
      url: 'http://example.com/path',
      img: 'https://picsum.photos/id/123/300/200',
      tags: [{ id: 2, name: 'Media' }],
      vote: undefined,
    },
    {
      id: 2,
      title: 'A second bookmark',
      url: 'http://example.com/path',
      img: 'https://picsum.photos/id/21/300/200',
      tags: [{ id: 4, name: 'Long text' }],
      vote: true,
    },
  ],
};

describe('HomeUI', () => {
  const wrapper = shallow(<HomeUI {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Main" wrapper', () => {
    expect(wrapper.find('.Home')).toHaveLength(1);
  });

  test('renders appropiate number of items', () => {
    expect(wrapper.find('LinkCard')).toHaveLength(2);
  });
});
