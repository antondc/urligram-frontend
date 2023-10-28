import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { noop } from '@antoniodcorrea/utils';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import { BookmarkRowNew, BookmarkRowNewProps } from './BookmarkRowNew';
import { BookmarkRowNewSkeleton } from './BookmarkRowNewSkeleton';

export default {
  component: BookmarkRowNew,
  title: 'BookmarkRowNew',
  decorators: [withKnobs],
};

const props: BookmarkRowNewProps = {
  bookmark: {
    id: 100,
    order: 10000,
    url: 'https://google.com',
    linkId: 100,
    img: '',
    favicon: 'https://www.google.com/s2/favicons?domain=https://developers.google.com',
    userId: 'e4e2bb46-c210-4a47-9e84-f45c789fcec1',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    createdAt: 1622238859,
    updatedAt: 1622238859,
    users: ['e4e2bb46-c210-4a47-9e84-f45c789fcec1'],
    bookmarksRelated: [
      {
        id: 94,
        title: 'The Village',
        userId: 'e4e2bb46-c210-4a47-9e84-f45c789fcec1',
      },
    ],
    isPublic: true,
    tags: [
      {
        id: 160,
        name: 'Lorem',
      },
      {
        id: 185,
        name: 'Ipsum',
      },
      {
        id: 185,
        name: 'Dolor',
      },
    ],
    statistics: {
      absoluteVote: null,
      timesVoted: 0,
      averageVote: null,
      timesBookmarked: 537,
      vote: null,
      loading: false,
    },
    bookmarkReceivedFrom: [],
    bookmarkSentTo: [],
  },
  withInfoButton: true,
  tags: [
    {
      id: 160,
      name: 'Lorem',
    },
    {
      id: 185,
      name: 'Ipsum',
    },
    {
      id: 185,
      name: 'Dolor',
    },
  ],
  domain: 'https://google.com',
  bookmarkActionIconsMounted: true,
  recentlyCreated: false,
  viewPending: false,
  sessionUserBookmarkedLink: true,
  createdAtFormatted: 'May 18, 2021',
  tagsHref: '',
  uiScreenTypeIsMobile: true,
  onEdit: noop,
  onListsClick: noop,
  onMobileBookmarkActionsIconClick: noop,
  onMobileBookmarkActionsBackgroundClick: noop,
  bookmarkViewed: noop,
  bookmarkIdInAnyOfMyLists: false,
  publicLoading: false,
  onPublicClick: noop,
};

const knobs = {
  skeleton: (): boolean => boolean('Skeleton', false),
  mountIconsMobile: (): boolean => boolean('Icons mobile mounted', false),
};

export const Default: React.FC = () => (
  <ProviderWrapper>
    {!knobs.skeleton() ? (
      <>
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
        <BookmarkRowNew
          {...props}
          uiScreenTypeIsMobile={knobs.mountIconsMobile()}
          bookmarkActionIconsMounted={knobs.mountIconsMobile()}
        />
      </>
    ) : (
      <>
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
        <BookmarkRowNewSkeleton id={props.bookmark.id} />
      </>
    )}
  </ProviderWrapper>
);
