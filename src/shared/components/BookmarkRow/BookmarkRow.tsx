import React from 'react';

import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import BookmarkLists from 'Components/BookmarkLists';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { Flex, Private, Space, Span, Tag, TextButton } from 'Vendor/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  userId: string;
  bookmark: Partial<BookmarkState>;
  recentlyCreated: boolean;
  sessionUserBookmarkedLink: boolean;
  onVote: (vote: boolean | null) => void;
  onEdit: () => void;
}

export const BookmarkRow: React.FC<Partial<BookmarkRow>> = ({
  userId,
  bookmark,
  onVote,
  sessionUserBookmarkedLink,
  recentlyCreated,
  onEdit,
}) => (
  <div
    className={'BookmarkRow' + (recentlyCreated ? ' BookmarkRow-recentlyCreated' : '')}
    data-test-id="BookmarkRow"
    key={bookmark?.id}
  >
    <div className="BookmarkRow-main">
      <Flex vertical="top" growVertical={false} horizontal="left" noWrap>
        <img className="BookmarkRow-favicon" src={bookmark?.favicon} />
        <Span bold className="BookmarkRow-title">
          <A className="BookmarkRow-link" href={bookmark?.url} targetBlank styled={false}>
            {bookmark?.title}
          </A>
        </Span>
      </Flex>
      <div className="BookmarkRow-mainBottom">
        <Span size="nano">Shared by</Span>
        <Space />
        <Span size="nano" bold>
          {bookmark?.statistics?.timesBookmarked || 0}
        </Span>
        <Space />
        <Span size="nano">
          user
          {bookmark?.statistics?.timesBookmarked !== 1 ? 's' : ''}
        </Span>
        {!!sessionUserBookmarkedLink && (
          <>
            <Space />·<Space />
            <Span className="BookmarkRow-editButton" size="nano" bold>
              <TextButton size="nano" text="Edit" onClick={onEdit} />
            </Span>
          </>
        )}
        <Space />·<Space />
        <Span
          className={
            'BookmarkRow-voteButton' +
            (bookmark?.statistics?.loading ? ' BookmarkRow-voteButton--loading' : '') +
            (bookmark?.statistics?.vote === true ? ' BookmarkRow-voteButton--active' : '')
          }
          size="nano"
          bold
          onClick={() => onVote(bookmark?.statistics?.vote === true ? null : true)}
        >
          {bookmark?.statistics?.vote === true ? 'Upvoted' : 'Upvote'}
        </Span>
        <Space />
        <Span size="nano" bold>
          /
        </Span>
        <Space />
        <Span
          className={
            'BookmarkRow-voteButton' +
            (bookmark?.statistics?.loading ? ' BookmarkRow-voteButton--loading' : '') +
            (bookmark?.statistics?.vote === false ? ' BookmarkRow-voteButton--active' : '')
          }
          size="nano"
          bold
          onClick={() => onVote(bookmark?.statistics?.vote === false ? null : false)}
        >
          {bookmark?.statistics?.vote === false ? 'Downvoted' : 'Downvote'}
        </Span>
        <Space />·<Space />
        <Span size="nano">Ranking</Span>
        <Space />
        <Span size="nano" bold>
          {bookmark?.statistics?.absoluteVote || 0}
        </Span>
      </div>
    </div>
    <div className="BookmarkRow-tags">
      {bookmark?.tags?.map((item) => (
        <A
          className="BookmarkRow-tag"
          href={`users/${userId}/bookmarks?filter[tags][]=${item.name}`}
          key={item.id}
          styled={false}
          frontend
        >
          <Tag size="nano" variant="simple">
            {item.name}
          </Tag>
        </A>
      ))}
    </div>
    <div className="BookmarkRow-icons">
      <Flex horizontal="right" growVertical={false} vertical="top" noWrap>
        {!!bookmark?.isPrivate && <Private size="micro" className="BookmarkRow-icon BookmarkRow-private" />}
        {!!sessionUserBookmarkedLink && (
          <div className="BookmarkRow-icon BookmarkRow-iconLists">
            <BookmarkLists bookmarkId={bookmark?.id} />
          </div>
        )}
        <BookmarkActions
          className="BookmarkRow-icon BookmarkRow-actionButton"
          linkId={bookmark?.linkId}
          bookmarkId={bookmark?.id}
        />
      </Flex>
    </div>
  </div>
);

export default BookmarkRow;
