import React from 'react';

import PlusCircle from 'Assets/svg/plusCircle.svg';
import A from 'Components/A';
import BaseForm, { BaseFormError, BaseFormSubmit } from 'Components/BaseForm';
import { ListState } from 'Modules/Lists/lists.types';
import { Button, FadeInOut, Input, Spinner } from '@antoniodcorrea/components';

import './BookmarkLists.less';

interface Props {
  sessionId: string;
  bookmarkId: number;
  listInputName: string;
  submitError: string;
  itemsLoading: number[];
  lists: ListState[];
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
    <ul className="BookmarkLists-lists">
      {lists?.map((item) => {
        const isBookmarkInList = !!bookmarkId && !!item?.bookmarksIds?.includes(bookmarkId);
        const wasRecentlyUpdated = recentlyUpdated?.includes(item?.id);

        return (
          <li
            className={
              'BookmarkLists-list' +
              (isBookmarkInList ? ' BookmarkLists-list--included' : '') +
              (wasRecentlyUpdated ? ' BookmarkLists-list--recentlyUpdated' : '')
            }
            key={item?.id}
          >
            <A className="BookmarkLists-listText" href={`lists/${item?.id}?sort=-updatedAt`} frontend styled={false}>
              {item?.name}
            </A>
            {itemsLoading?.includes(item?.id) ? (
              <Spinner className="BookmarkLists-loader" />
            ) : (
              <PlusCircle
                className="BookmarkLists-icon"
                onClick={() => (!!isBookmarkInList ? onListDeleteBookmark(item?.id) : onListAddBookmark(item?.id))}
                onMouseLeave={() => onIconLeave(item?.id)}
              />
            )}
          </li>
        );
      })}
    </ul>
    <FadeInOut className="BookmarkLists-bottom" valueToUpdate={showCreateList} appear>
      {showCreateList ? (
        <BaseForm onMouseLeave={onShowCreateList} onSubmit={onCreateListSubmit}>
          <Input
            className="BookmarkLists-input"
            name="listName"
            value={listInputName}
            onChange={onListTitleInputChange}
            autoFocus
            grow
          />
          <BaseFormSubmit className="BookmarkLists-submit">
            <Button text="Create" type="submit" onClick={onCreateListSubmit} error={!!submitError} grow size="small" />
            <FadeInOut valueToUpdate={!!submitError} speed="fast">
              <BaseFormError>{submitError}</BaseFormError>
            </FadeInOut>
          </BaseFormSubmit>
        </BaseForm>
      ) : (
        <BaseFormSubmit className="BookmarkLists-submit">
          <Button
            text="New list"
            type="button"
            loading={createListSubmitting}
            grow
            onClick={onShowCreateList}
            size="small"
          />
        </BaseFormSubmit>
      )}
    </FadeInOut>
  </div>
);
