import { shallow } from 'enzyme';
import React from 'react';

import { BookmarksUi } from './bookmarksUi';

const props = {
  bookmarks: [
    {
      id: 1,
      linkId: 12,
      title: 'My first bookmark',
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
      title: 'A second bookmark',
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

describe('BookmarksUi', () => {
  const wrapper = shallow(<BookmarksUi {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".Bookmarks" wrapper', () => {
    expect(wrapper.find('.Bookmarks')).toHaveLength(1);
  });
});
