import React from 'react';

import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import {
  Border,
  Button,
  Fade,
  FadeInOut,
  Hr,
  Input,
  List,
  PlusCircleWithBackground,
  PopOver,
  Span,
  SpinnerLoader,
} from '@antoniodcorrea/components';

import './BookmarkLists.less';

interface Props {
  bookmarkId: number;
  mounted: boolean;
  listInputName: string;
  submitError: string;
  itemsLoading: number[];
  lists: ListState[];
  onListEnter: () => void;
  onListLeave: () => void;
  onListsClick: () => void;
  onListAddBookmark: (listId?: number) => void;
  onCreateListSubmit: (e: React.FormEvent<HTMLElement>) => void;
  onListTitleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  showCreateList: boolean;
  onShowCreateList: (e: React.MouseEvent<HTMLElement>) => void;
}

export const BookmarkLists: React.FC<Props> = ({
  bookmarkId,
  mounted,
  lists,
  onListLeave,
  onListEnter,
  onListsClick,
  onListAddBookmark,
  itemsLoading,
  listInputName,
  submitError,
  showCreateList,
  onCreateListSubmit,
  onShowCreateList,
  onListTitleInputChange,
}) => (
  <span className="BookmarkLists" id={`BookmarkLists-${bookmarkId}`}>
    <List className="BookmarkLists-listIcon" size="small" onClick={onListsClick} />
    <RenderInPortal elementId={`BookmarkLists-portal--${bookmarkId}`}>
      <Fade mounted={mounted}>
        <PopOver elementId={`BookmarkLists-${bookmarkId}`} placement="right-start">
          <Border onMouseLeave={onListLeave} onMouseEnter={onListEnter}>
            <ul className="BookmarkLists-lists">
              {lists?.map((item) => {
                const isBookmrkInList = !!item?.bookmarksIds?.includes(bookmarkId);

                return (
                  <li
                    className={
                      'BookmarkLists-listsItem' + (isBookmrkInList ? ' BookmarkLists-listsItem--included' : '')
                    }
                    key={item.id}
                  >
                    <Span className="BookmarkList-listsItemText" bold>
                      {item.name}
                    </Span>
                    {itemsLoading?.includes(item.id) ? (
                      <SpinnerLoader className="BookmarkLists-listsItemLoader" />
                    ) : (
                      <PlusCircleWithBackground
                        className="BookmarkLists-listsItemIcon"
                        onClick={() => onListAddBookmark(item?.id)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
            <Hr size="small" spacer />
            <Hr size="nano" />
            <Hr size="small" spacer />
            <FadeInOut valueToUpdate={showCreateList} appear>
              {showCreateList ? (
                <form onMouseLeave={onShowCreateList} onSubmit={onCreateListSubmit}>
                  <Input
                    className="BookmarkLists-listNameInput"
                    name="listName"
                    value={listInputName}
                    onChange={onListTitleInputChange}
                    autoFocus
                    grow
                  />
                  <Hr size="small" spacer />
                  <Button
                    className="BookmarkLists-button"
                    text="Create"
                    type="submit"
                    onClick={onCreateListSubmit}
                    error={!!submitError}
                    grow
                  />
                  <Hr size="nano" spacer />
                  <FadeInOut valueToUpdate={!!submitError} speed="fast">
                    <Span className="BookmarkLists-error" size="small">
                      {submitError}
                    </Span>
                  </FadeInOut>
                </form>
              ) : (
                <Button
                  className="BookmarkLists-button"
                  text="Create list"
                  type="button"
                  size="small"
                  grow
                  onClick={onShowCreateList}
                />
              )}
            </FadeInOut>
          </Border>
        </PopOver>
      </Fade>
    </RenderInPortal>
  </span>
);

export default BookmarkLists;
