import { shallow } from 'enzyme';
import React from 'react';

import { LinksVisitor as LinksVisitorUi } from './LinksVisitor';

const props = {
  linksIds: [1, 2],
  popularLists: [
    {
      id: 3,
      name: 'Third list',
      image: '',
      description: 'More links',
      isPrivate: false,
      userId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      createdAt: '2021-01-08T17:22:29.000Z',
      updatedAt: '2021-01-08T17:22:29.000Z',
      membersIds: [],
      bookmarksIds: [1, 2, 3],
      tags: [],
    },
  ],
  loading: false,
};

describe('LinksVisitorUi', () => {
  const wrapper = shallow(<LinksVisitorUi {...props} />);

  test('component renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('has a ".LinksVisitor" wrapper', () => {
    expect(wrapper.find('.LinksVisitor')).toHaveLength(1);
  });
});
