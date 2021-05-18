import React from 'react';

import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import BookmarkLists from 'Components/BookmarkLists';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { Border, Edit, Flex, Private, Span, Tag, Vote } from 'Vendor/components';

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
  <Border
    grow
    className={'BookmarkRow' + (recentlyCreated ? ' BookmarkRow-recentlyCreated' : '')}
    data-test-id="BookmarkRow"
    key={bookmark?.id}
  >
    <div className="BookmarkRow-left">
      <Flex vertical="top" growVertical={false} horizontal="left" noWrap>
        <img className="BookmarkRow-favicon" src={bookmark?.favicon} />
        <Span bold className="BookmarkRow-title">
          <A className="BookmarkRow-link" href={bookmark?.url} targetBlank styled={false}>
            {bookmark?.title}
          </A>
        </Span>
      </Flex>
      <Span className="BookmarkRow-url">
        <A href={bookmark?.url} targetBlank>
          <Span size="micro">{bookmark?.url}</Span>
        </A>
      </Span>
    </div>
    <div className="BookmarkRow-center">
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
    <div className="BookmarkRow-right">
      <Flex horizontal="right" growVertical={false} vertical="top" noWrap>
        {!!bookmark?.isPrivate && <Private size="micro" className="BookmarkRow-icon BookmarkRow-private" />}
        {!!sessionUserBookmarkedLink && (
          <>
            <BookmarkLists bookmarkId={bookmark?.id} />
            <Edit size="micro" className="BookmarkRow-icon BookmarkRow-edit" onClick={onEdit} />
          </>
        )}
        <Vote
          className="BookmarkRow-icon BookmarkRow-vote"
          vote={bookmark?.statistics?.vote}
          changeVote={onVote}
          loading={bookmark?.statistics?.loading}
        />
      </Flex>
      <div className="BookmarkRow-stats">
        <Span size="micro" className="BookmarkRow-stat BookmarkRow-statVote">
          <Span size="small" className="BookmarkRow-statIcon">
            ▲
          </Span>
          {bookmark?.statistics?.absoluteVote || 0}
        </Span>
        <Span size="micro" className="BookmarkRow-stat  BookmarkRow-statBookmarks">
          <Span size="small" className="BookmarkRow-statIcon">
            ⚭
          </Span>
          {bookmark?.statistics?.timesBookmarked || 0}
        </Span>
      </div>
    </div>
    <BookmarkActions className="BookmarkRow-actionButton" linkId={bookmark?.linkId} bookmarkId={bookmark?.id} />
  </Border>
);

export default BookmarkRow;
