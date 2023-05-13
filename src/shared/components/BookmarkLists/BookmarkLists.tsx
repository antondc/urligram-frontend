import React from 'react';

import PlusCircle from 'Assets/svg/plusCircle.svg';
import A from 'Components/A';
import BaseForm, { BaseFormError, BaseFormSubmit } from 'Components/BaseForm';
import { RenderInPortal } from 'Components/Portal';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { ListState } from 'Modules/Lists/lists.types';
import { Button, FadeInOut, Input, Spinner, Tooltip } from '@antoniodcorrea/components';

import './BookmarkLists.less';

type ListStateExtended = ListState & {
  isActive: boolean;
  wasRecentlyUpdated: boolean;
};

interface Props {
  bookmark: BookmarkState;
  glossary: GlossaryState;
  sessionId: string;
  listInputName: string;
  submitError: string;
  itemsLoading: number[];
  lists: ListStateExtended[];
  onListAddBookmark: (listId?: number) => void;
  onListDeleteBookmark: (listId?: number) => void;
  onCreateListSubmit: (e: React.FormEvent<HTMLElement>) => void;
  onListTitleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  showCreateList: boolean;
  createListSubmitting: boolean;
  onShowCreateList: (e: React.MouseEvent<HTMLElement>) => void;
  onIconLeave: (listId: number) => void;
}

export const BookmarkLists: React.FC<Props> = ({
  bookmark,
  glossary,
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
  onIconLeave,
}) => (
  <div className="BookmarkLists">
    <ul className="BookmarkLists-lists">
      {lists?.map((item) => (
        <React.Fragment key={item?.id}>
          <li
            id={`BookmarkLists-list--${item.id}`}
            className={
              'BookmarkLists-list' +
              (item?.isActive ? ' BookmarkLists-list--included' : '') +
              (item?.wasRecentlyUpdated ? ' BookmarkLists-list--recentlyUpdated' : '') +
              (!bookmark.isPublic && item.isPublic ? ' BookmarkLists-list--disallowed' : '')
            }
          >
            <A className="BookmarkLists-listText" href={`lists/${item?.id}?sort=-updatedAt`} frontend styled={false}>
              {item?.name}
            </A>
            {itemsLoading?.includes(item?.id) ? (
              <Spinner className="BookmarkLists-loader" />
            ) : (
              <PlusCircle
                className="BookmarkLists-icon"
                onClick={() => (!!item?.isActive ? onListDeleteBookmark(item?.id) : onListAddBookmark(item?.id))}
                onMouseLeave={() => onIconLeave(item?.id)}
              />
            )}
          </li>
          {!bookmark.isPublic && item.isPublic && (
            <RenderInPortal>
              <Tooltip
                parentElementId={`BookmarkLists-list--${item.id}`}
                content="You can not add private bookmarks to public lists"
                delay={1}
              />
            </RenderInPortal>
          )}
        </React.Fragment>
      ))}
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
            <Button
              text={glossary.create}
              type="submit"
              onClick={onCreateListSubmit}
              error={!!submitError}
              grow
              size="small"
            />
            <FadeInOut valueToUpdate={!!submitError} speed="fast">
              <BaseFormError>{submitError}</BaseFormError>
            </FadeInOut>
          </BaseFormSubmit>
        </BaseForm>
      ) : (
        <BaseFormSubmit className="BookmarkLists-submit">
          <Button
            text={glossary.newList}
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
