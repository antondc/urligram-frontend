import React from 'react';

import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import BookmarkLists from 'Components/BookmarkLists';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { EditCircle, Flex, Private, Space, Span, Tag, Vote } from 'Vendor/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  userId: string;
  bookmark: Partial<BookmarkState>;
  recentlyCreated: boolean;
  sessionUserBookmarkedLink: boolean;
  createdAtFormatted: string;
  onVote: (vote: boolean | null) => void;
  onEdit: () => void;
}

export const BookmarkRow: React.FC<Partial<BookmarkRow>> = ({
  userId,
  bookmark,
  onVote,
  sessionUserBookmarkedLink,
  createdAtFormatted,
  recentlyCreated,
  onEdit,
}) => (
  <div
    className={'BookmarkRow' + (recentlyCreated ? ' BookmarkRow-recentlyCreated' : '')}
    data-test-id="BookmarkRow"
    key={bookmark?.id}
  >
    <div className="BookmarkRow-main">
      <Flex vertical="baseline" growVertical={false} horizontal="left" noWrap>
        <img className="BookmarkRow-favicon" src={bookmark?.favicon} />
        <Space />
        <Span weight="semiBold" className="BookmarkRow-title">
          <A className="BookmarkRow-link" href={bookmark?.url} targetBlank styled={false}>
            {bookmark?.title}
          </A>
        </Span>
      </Flex>
      <div className="BookmarkRow-mainBottom">
        <Span size="nano">
          {!!bookmark?.statistics?.timesBookmarked && (
            <>
              Shared by
              <Space />
              <Span size="nano" weight="extraBold">
                {bookmark?.statistics?.timesBookmarked}
              </Span>
              <Space />
              user
              {bookmark?.statistics?.timesBookmarked !== 1 ? 's' : ''}
            </>
          )}
          {!!bookmark?.statistics?.timesBookmarked && !!bookmark?.statistics?.absoluteVote && (
            <>
              <Space />·<Space />
            </>
          )}
          {!!bookmark?.statistics?.absoluteVote && (
            <>
              Total votes
              <Space />
              <Span size="nano" weight="extraBold">
                {bookmark?.statistics?.absoluteVote}
              </Span>
            </>
          )}
          <Space />·<Space />
          Created at {createdAtFormatted}
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
        {!!sessionUserBookmarkedLink && <EditCircle className="BookmarkRow-icon" size="micro" onClick={onEdit} />}
        {!!sessionUserBookmarkedLink && (
          <div className="BookmarkRow-icon BookmarkRow-iconLists">
            <BookmarkLists bookmarkId={bookmark?.id} />
          </div>
        )}
        <Vote
          className="BookmarkRow-iconVote"
          vote={bookmark?.statistics?.vote}
          loading={bookmark?.statistics?.loading}
          changeVote={onVote}
        />
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
