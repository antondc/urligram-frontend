import React from 'react';

import A from 'Components/A';
import { ListState } from 'Modules/Lists/lists.types';
import { Button, FadeInOut, Hr, Input, PlusCircleWithBackground, Span, SpinnerCircularBrute } from 'Vendor/components';

import './BookmarkLists.less';

interface Props {
  sessionId: string;
  bookmarkId: number;
  listInputName: string;
  submitError: string;
  itemsLoading: number[];
  lists: ListState[];
  onListEnter: () => void;
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
  lists,
  onListEnter,
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
  <div className="BookmarkLists">
    <ul className="BookmarkLists-lists" onMouseEnter={onListEnter}>
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
            key={item?.id}
          >
            <Span className="BookmarkList-listsItemText" weight="semiBold">
              <A href={`lists/${item?.id}?sort=-updatedAt`} frontend>
                {item?.name}
              </A>
            </Span>
            {itemsLoading?.includes(item?.id) ? (
              <SpinnerCircularBrute className="BookmarkLists-listsItemLoader" />
            ) : (
              <PlusCircleWithBackground
                className={'BookmarkLists-listsItemIcon'}
                onClick={() => (!!isBookmarkInList ? onListDeleteBookmark(item?.id) : onListAddBookmark(item?.id))}
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
  </div>
);

export default BookmarkLists;
