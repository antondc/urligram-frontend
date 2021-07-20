import React from 'react';

import EditCircle from 'Assets/svg/editCircle.svg';
import List from 'Assets/svg/list.svg';
import Private from 'Assets/svg/private.svg';
import A from 'Components/A';
import BookmarkActions from 'Components/BookmarkActions';
import BookmarkListsPopOverOrSheet from 'Components/BookmarkListsPopOverOrSheet';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { Space, Tag, Tooltip, Vote } from 'Vendor/components';

import './BookmarkRow.less';

interface BookmarkRow extends BookmarkState {
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
      {!!sessionUserBookmarkedLink && <EditCircle className="BookmarkRow-icon BookmarkRow-iconEdit" onClick={onEdit} />}
      {!!sessionUserBookmarkedLink && (
        <span className="BookmarkRow-icon BookmarkRow-iconLists">
          <List id={`BookmarkRow-${bookmark?.id}`} onClick={onListsClick} />
          <BookmarkListsPopOverOrSheet bookmarkId={bookmark?.id} />
        </span>
      )}
      <BookmarkActions
        className="BookmarkRow-icon BookmarkRow-iconBookmark"
        linkId={bookmark?.linkId}
        bookmarkId={bookmark?.id}
      />
      {!!bookmark?.isPrivate && <Private className="BookmarkRow-icon BookmarkRow-iconPrivate" />}
      <RenderInPortal>
        <Tooltip
          parentElementId={`BookmarkRow-iconAverageVote-${bookmark?.id}`}
          content="Users in this list"
          delay={0.5}
        />
      </RenderInPortal>
      <div className="BookmarkRow-iconAverageVote" id={`BookmarkRow-iconAverageVote-${bookmark?.id}`}>
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
);

export default BookmarkRow;
