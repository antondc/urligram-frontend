import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { Frame } from 'Vendor/components';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { BookmarkRow } from './BookmarkRow';
import { BookmarkRowSkeleton } from './BookmarkRowSkeleton';

export default {
  component: BookmarkRow,
  title: 'BookmarkRow',
  decorators: [withKnobs],
};

const noop = () => {};

const items = [
  {
    id: 1,
    createdAtFormatted: '3 may 2019',
    bookmark: {
      linkId: 12,
      title: 'The Geography of Nowhere - Wikipedia',
      img: 'https://www.google.com/s2/favicons?domain=https://en.wikipedia.org',
      tags: [
        { id: 3, name: 'Cool' },
        { id: 7, name: 'Taf' },
        { id: 1, name: 'Cool' },
        { id: 4, name: 'Aaa' },
        { id: 2, name: 'Interesting' },
        { id: 8, name: 'Rgsg' },
        { id: 5, name: 'Interesting' },
        { id: 6, name: 'Cool' },
        { id: 9, name: 'Cool' },
        { id: 10, name: 'AeFu' },
      ],
      favicon: 'https://www.google.com/s2/favicons?domain=https://en.wikipedia.org',
      statistics: {
        absoluteVote: 43,
        timesVoted: 123,
        averageVote: 155,
        timesBookmarked: 20,
        vote: false,
        loading: false,
      },
      loading: false,
      isOwnBookmark: false,
      userBookmarkedLink: false,
      isPrivate: true,
    },
    onVote: noop,
    sessionUserBookmarkedLink: true,
  },
  {
    id: 1,
    createdAtFormatted: '3 may 2019',
    bookmark: {
      linkId: 12,
      title: 'Cross-Origin Resource Sharing (CORS) - HTTP | MDN',
      img: 'https://www.google.com/s2/favicons?domain=https://developer.mozilla.org',
      tags: [
        { id: 3, name: 'Cool' },
        { id: 7, name: 'Taf' },
        { id: 1, name: 'Cool' },
        { id: 4, name: 'Aaa' },
        { id: 2, name: 'Interesting' },
        { id: 8, name: 'Rgsg' },
        { id: 5, name: 'Interesting' },
        { id: 6, name: 'Cool' },
        { id: 9, name: 'Cool' },
        { id: 10, name: 'AeFu' },
      ],
      favicon: 'https://www.google.com/s2/favicons?domain=https://developer.mozilla.org',
      statistics: {
        absoluteVote: 43,
        timesVoted: 123,
        averageVote: 13,
        timesBookmarked: 20,
        vote: false,
        loading: false,
      },
      loading: false,
      isOwnBookmark: false,
      userBookmarkedLink: false,
    },
    onVote: noop,
    sessionUserBookmarkedLink: true,
  },
  {
    id: 1,
    createdAtFormatted: '3 may 2019',
    bookmark: {
      linkId: 12,
      title: 'Clean Architecture — A little introduction - DEV Community',
      img: 'https://www.google.com/s2/favicons?domain=https://dev.to',
      tags: [
        { id: 3, name: 'Cool' },
        { id: 7, name: 'Taf' },
        { id: 1, name: 'Cool' },
        { id: 4, name: 'Aaa' },
        { id: 2, name: 'Interesting' },
        { id: 8, name: 'Rgsg' },
        { id: 5, name: 'Interesting' },
        { id: 6, name: 'Cool' },
        { id: 9, name: 'Cool' },
        { id: 10, name: 'AeFu' },
      ],
      favicon: 'https://www.google.com/s2/favicons?domain=https://dev.to',
      statistics: {
        absoluteVote: 43,
        timesVoted: 123,
        averageVote: 645,
        timesBookmarked: 20,
        vote: false,
        loading: false,
      },
      loading: false,
      isOwnBookmark: false,
      userBookmarkedLink: false,
    },
    onVote: noop,
    sessionUserBookmarkedLink: true,
  },
  {
    id: 1,
    createdAtFormatted: '3 may 2019',
    bookmark: {
      linkId: 12,
      title: 'Entrepreneurship 101: Who is your customer? | edX',
      img: 'https://www.google.com/s2/favicons?domain=https://www.edx.org',
      tags: [
        { id: 3, name: 'Cool' },
        { id: 7, name: 'Taf' },
        { id: 1, name: 'Cool' },
        { id: 4, name: 'Aaa' },
        { id: 2, name: 'Interesting' },
        { id: 8, name: 'Rgsg' },
        { id: 5, name: 'Interesting' },
        { id: 6, name: 'Cool' },
        { id: 9, name: 'Cool' },
        { id: 10, name: 'AeFu' },
      ],
      favicon: 'https://www.google.com/s2/favicons?domain=https://www.edx.org',
      statistics: {
        absoluteVote: 43,
        timesVoted: 123,
        averageVote: 23,
        timesBookmarked: 20,
        vote: false,
        loading: false,
      },
      loading: false,
      isOwnBookmark: false,
      userBookmarkedLink: false,
    },
    onVote: noop,
    sessionUserBookmarkedLink: true,
  },
  {
    id: 1,
    createdAtFormatted: '3 may 2019',
    bookmark: {
      linkId: 12,
      title: 'A 5G future – O’Reilly',
      img: 'https://www.google.com/s2/favicons?domain=https://www.oreilly.com',
      tags: [
        { id: 3, name: 'Cool' },
        { id: 7, name: 'Taf' },
        { id: 1, name: 'Cool' },
        { id: 4, name: 'Aaa' },
        { id: 2, name: 'Interesting' },
        { id: 8, name: 'Rgsg' },
        { id: 5, name: 'Interesting' },
        { id: 6, name: 'Cool' },
        { id: 9, name: 'Cool' },
        { id: 10, name: 'AeFu' },
      ],
      favicon: 'https://www.google.com/s2/favicons?domain=https://www.oreilly.com',
      statistics: {
        absoluteVote: 43,
        timesVoted: 123,
        averageVote: 432,
        timesBookmarked: 20,
        vote: false,
        loading: false,
      },
      loading: false,
      isOwnBookmark: false,
      userBookmarkedLink: false,
    },
    onVote: noop,
    sessionUserBookmarkedLink: true,
  },
];

const allItems = [...items, ...items, ...items];
const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <ProviderWrapper>
    <Frame weight="none" borders={false}>
      <Frame borders={false}>
        {!knobs.skeleton()
          ? allItems.map((item, index) => <BookmarkRow key={index} {...item} />)
          : allItems?.map((item, index) => <BookmarkRowSkeleton key={index} {...item} />)}
      </Frame>
    </Frame>
  </ProviderWrapper>
);
