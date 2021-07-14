import React from 'react';

import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { EditCircle, List, Private, Space, Tag, Tooltip, Vote } from 'Vendor/components';
import { RenderInPortal } from '../Portal';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
  userId: string;
  bookmark: Partial<BookmarkState>;
  recentlyCreated: boolean;
  sessionUserBookmarkedLink: boolean;
  createdAtFormatted: string;
  pathForTagLink: string;
  onVote: (vote: boolean | null) => void;
  onEdit: () => void;
  onListsClick: () => void;
}

export const BookmarkRow: React.FC<Partial<BookmarkRow>> = ({
  userId,
  bookmark,
  onVote,
  sessionUserBookmarkedLink,
  createdAtFormatted,
  pathForTagLink,
  recentlyCreated,
  onEdit,
  onListsClick,
}) => (
  <div
    className={'BookmarkRow' + (recentlyCreated ? ' BookmarkRow-recentlyCreated' : '')}
    data-test-id="BookmarkRow"
    key={bookmark?.id}
  >
    <div className="BookmarkRow-title">
      <img className="BookmarkRow-favicon" src={bookmark?.favicon} />
      <A className="BookmarkRow-link" href={bookmark?.url} targetBlank styled={false}>
        {bookmark?.title}
      </A>
    </div>
    <div className="BookmarkRow-details">
      {!!bookmark?.statistics?.timesBookmarked && (
        <>
          Shared by
          <Space />
          {bookmark?.statistics?.timesBookmarked}
          <Space />
          user
          <span>{bookmark?.statistics?.timesBookmarked !== 1 ? 's' : ''}</span>
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
          {bookmark?.statistics?.absoluteVote}
        </>
      )}
      <Space />·<Space />
      Created at {createdAtFormatted}
    </div>
    <div className="BookmarkRow-tags">
      {bookmark?.tags?.map((item) => (
        <A
          className="BookmarkRow-tag"
          href={`${pathForTagLink}?filter[tags][]=${item.name}`}
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
      <div className="BookmarkRow-iconsFirst">
        {!!bookmark?.isPrivate && <Private size="micro" className="BookmarkRow-icon BookmarkRow-private" />}
        {!!sessionUserBookmarkedLink && (
          <EditCircle className="BookmarkRow-icon BookmarkRow-editButton" size="micro" onClick={onEdit} />
        )}
        {!!sessionUserBookmarkedLink && (
          <List className="BookmarkRow-icon BookmarkRow-iconLists" onClick={onListsClick} />
        )}

        <BookmarkActions
          className="BookmarkRow-icon BookmarkRow-actionButton"
          linkId={bookmark?.linkId}
          bookmarkId={bookmark?.id}
        />
      </div>
      <div className="BookmarkRow-iconsSecond">
        <RenderInPortal>
          <Tooltip
            parentElementId={`BookmarkRow-averageVote-${bookmark?.id}`}
            content="Users in this list"
            delay={0.5}
          />
        </RenderInPortal>
        <div className="BookmarkRow-averageVote" id={`BookmarkRow-averageVote-${bookmark?.id}`}>
          {bookmark?.statistics?.absoluteVote || 0}
        </div>
        <Vote
          className="BookmarkRow-iconVote"
          vote={bookmark?.statistics?.vote}
          loading={bookmark?.statistics?.loading}
          changeVote={onVote}
        />
      </div>
    </div>
  </div>
);

export default BookmarkRow;
