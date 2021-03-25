import { BookmarkState } from './bookmarks.types';

export const mockBookmark: BookmarkState = {
  id: 0,
  userId: 'string',
  title: 'string',
  url: 'string',
  img: 'string',
  favicon: 'string',
  linkId: 0,
  tags: [
    {
      id: 0,
      name: 'string',
    },
  ],
  isPrivate: true,
  users: ['string'],
  createdAt: 'string',
  updatedAt: 'string',
  statistics: {
    absoluteVote: 0,
    timesVoted: 0,
    averageVote: 0,
    timesBookmarked: 0,
    vote: true,
    loading: false,
  },
};
