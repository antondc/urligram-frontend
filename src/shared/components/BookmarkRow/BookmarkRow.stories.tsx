import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { FadeInOut, Frame, Hr } from 'Vendor/components';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { BookmarkRow } from './BookmarkRow';
import { BookmarkRowSkeleton } from './BookmarkRowSkeleton';

export default {
  component: BookmarkRow,
  title: 'BookmarkRow',
  decorators: [withKnobs],
};

const noop = () => {};

const props = {
  id: 1,
  bookmark: {
    linkId: 12,
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos eveniet ut, autem mollitia culpa soluta obcaecati, laborum eos iusto cupiditate aspernatur veniam ipsum necessitatibus neque. Veritatis quisquam ex nam deleniti.',
    url: 'https://en.wikipedia.org/wiki/Khanty',
    img: 'https://picsum.photos/id/123/300/200',
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
    favicon: 'https://www.google.com/s2/favicons?domain=www.aeroprakt.com',
    statistics: {
      absoluteVote: 0,
      timesVoted: 0,
      averageVote: 0,
      timesBookmarked: 0,
      vote: false,
      loading: false,
    },
    loading: false,
    isOwnBookmark: false,
    userBookmarkedLink: false,
  },
  onVote: noop,
  sessionUserBookmarkedLink: true,
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
};

export const Default: React.ReactNode = () => (
  <ProviderWrapper>
    <Frame weight="none">
      <Frame>
        <FadeInOut valueToUpdate={knobs.skeleton()} speed="fastest" appear>
          {!knobs.skeleton() ? (
            <>
              <BookmarkRow {...props} />
              <BookmarkRow {...props} />
              <BookmarkRow {...props} />
              <BookmarkRow {...props} />
              <BookmarkRow {...props} />
            </>
          ) : (
            <>
              <BookmarkRowSkeleton {...props} />
              <BookmarkRowSkeleton {...props} />
              <BookmarkRowSkeleton {...props} />
              <BookmarkRowSkeleton {...props} />
              <BookmarkRowSkeleton {...props} />
            </>
          )}
        </FadeInOut>
      </Frame>
    </Frame>
  </ProviderWrapper>
);
