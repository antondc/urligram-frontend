import { shallow } from 'enzyme';
import React from 'react';

import { LinksUi } from './linksUi';

const props = {
  links: [
    {
      id: 1,
      linkId: 12,
      title: 'My first link',
      url: 'http://example.com/path',
      img: 'https://picsum.photos/id/123/300/200',
      tags: [{ id: 2, name: 'Media' }],
      statistics: {
        absoluteVote: 0,
        timesVoted: 0,
        averageVote: 0,
        timesBookmarked: 0,
        vote: false,
      },
    },
    {
      id: 2,
      linkId: 15,
      title: 'A second link',
      url: 'http://example.com/path',
      img: 'https://picsum.photos/id/21/300/200',
      tags: [{ id: 4, name: 'Long text' }],
      statistics: {
        absoluteVote: 0,
        timesVoted: 0,
        averageVote: 0,
        timesBookmarked: 0,
        vote: false,
      },
    },
  ],
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
