import React from 'react';

import A from 'Components/A';
import { RenderInPortal } from 'Components/Portal';
import { ListState } from 'Modules/Lists/lists.types';
import {
  Button,
  Fade,
  FadeInOut,
  Frame,
  Hr,
  Input,
  List,
  PlusCircleWithBackground,
  PopOver,
  Span,
  SpinnerLoader,
} from 'Vendor/components';

import './BookmarkLists.less';

interface Props {
  sessionId: string;
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
  onListDeleteBookmark: (listId?: number) => void;
  onCreateListSubmit: (e: React.FormEvent<HTMLElement>) => void;
  onListTitleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  showCreateList: boolean;
  createListSubmitting: boolean;
  onShowCreateList: (e: React.MouseEvent<HTMLElement>) => void;
  recentlyUpdated: number[];
  onIconLeave: (listId: number) => void;
}

export const BookmarkLists: React.FC<Props> = ({
  bookmarkId,
  mounted,
  lists,
  onListLeave,
  onListEnter,
  onListsClick,
  onListAddBookmark,
  onListDeleteBookmark,
  itemsLoading,
  listInputName,
  submitError,
  showCreateList,
  onCreateListSubmit,
  createListSubmitting,
  onShowCreateList,
  onListTitleInputChange,
  recentlyUpdated,
  onIconLeave,
}) => (
  <span className="BookmarkLists" id={`BookmarkLists-${bookmarkId}`}>
    <List className="BookmarkLists-listIcon" size="micro" onClick={onListsClick} />
    <RenderInPortal elementId={`BookmarkLists-portal--${bookmarkId}`}>
      <Fade mounted={mounted}>
        <PopOver elementId={`BookmarkLists-${bookmarkId}`} placement="right-start">
          <Frame onMouseLeave={onListLeave} onMouseEnter={onListEnter}>
            <ul className="BookmarkLists-lists">
              {lists?.map((item) => {
                const isBookmarkInList = !!item?.bookmarksIds?.includes(bookmarkId);
                const wasRecentlyUpdated = recentlyUpdated?.includes(item?.id);

                return (
                  <li
                    className={
                      'BookmarkLists-listsItem' +
                      (isBookmarkInList ? ' BookmarkLists-listsItem--included' : '') +
                      (wasRecentlyUpdated ? ' BookmarkLists-listsItem--recentlyUpdated' : '')
                    }
                    key={item.id}
                  >
                    <Span className="BookmarkList-listsItemText" bold>
                      <A href={`lists/${item?.id}?sort=-updatedAt`} frontend onClick={onListLeave}>
                        {item.name}
                      </A>
                    </Span>
                    {itemsLoading?.includes(item.id) ? (
                      <SpinnerLoader className="BookmarkLists-listsItemLoader" />
                    ) : (
                      <PlusCircleWithBackground
                        className={'BookmarkLists-listsItemIcon'}
                        onClick={() =>
                          !!isBookmarkInList ? onListDeleteBookmark(item?.id) : onListAddBookmark(item?.id)
                        }
                        onMouseLeave={() => onIconLeave(item?.id)}
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
                  text="New list"
                  type="button"
                  size="small"
                  loading={createListSubmitting}
                  grow
                  onClick={onShowCreateList}
                />
              )}
            </FadeInOut>
          </Frame>
        </PopOver>
      </Fade>
    </RenderInPortal>
  </span>
);

export default BookmarkLists;
