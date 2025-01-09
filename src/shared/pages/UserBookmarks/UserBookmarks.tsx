import React from 'react';
import Helmet from 'react-helmet';

import Bookmark from 'Assets/svg/bookmark.svg';
import Clock from 'Assets/svg/spinner6.svg';
import BookmarkRow from 'Components/BookmarkRow';
import { BookmarkRowSkeletonGroup } from 'Components/BookmarkRow/BookmarkRowSkeletonGroup';
import CardItem from 'Components/CardItem';
import NoResults from 'Components/NoResults';
import Pagination from 'Components/Pagination';
import SubHeader from 'Components/SubHeader';
import { BookmarksByKey } from 'Modules/Bookmarks/bookmarks.types';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { TagState } from 'Modules/Tags/tags.types';
import { UserState } from 'Modules/Users/users.types';
import { DEFAULT_PAGE_SIZE, SITE_TITLE } from 'Root/src/shared/constants';
import { FadeInOut, SelectValue } from '@antoniodcorrea/components';

import './UserBookmarks.less';

interface Props {
  glossary: GlossaryState;
  user: UserState;
  bookmarksByKey: BookmarksByKey;
  bookmarksIds: number[];
  bookmarksLoading: boolean;
  currentHref: string;
  page: {
    size: number;
    offset: number;
  };
  totalItems: number;
  sort: string;
  tagsSearchFormatted: {
    label: string;
    value: string;
  }[];
  onInputChange: (string: string) => void;
  onChange: (string: SelectValue[]) => void;
  onAddBookmarkClick: () => void;
  allTags: TagState[];
  currentQueryParamFilterTags: SelectValue[];
}

export const UserBookmarks: React.FC<Props> = ({
  glossary,
  user,
  bookmarksByKey,
  bookmarksIds,
  bookmarksLoading,
  page,
  totalItems,
  currentHref,
  sort,
  tagsSearchFormatted,
  onInputChange,
  onChange,
  allTags,
  currentQueryParamFilterTags,
}) => (
  <div className="UserBookmarks">
    <Helmet title={`${SITE_TITLE} · ${glossary.userBookmarks}`} />
    <SubHeader
      // title props
      title={`@${user?.name}`}
      titleHref={`/users/${user?.id}`}
      leftIcon={<Bookmark />}
      // select props
      selectPlaceholder={glossary.selectTags}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      selectDefaultOptions={allTags.map((item) => ({ label: item.name, value: item.name }))}
      selectOptions={[
        ...tagsSearchFormatted,
        ...allTags.map((item) => ({ label: item.name, value: item.name })),
      ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)}
      onSelectInputChange={onInputChange}
      onSelectChange={onChange}
      // sort props
      sortLoading={bookmarksLoading}
      sortByOptions={[
        { label: glossary.bookmarked, field: 'timesbookmarked', icon: Bookmark },
        { label: glossary.created, field: 'createdAt', icon: Clock },
      ]}
      url={currentHref}
      currentSort={sort}
    />
    <div className="UserBookmarks-bookmarks">
      {bookmarksLoading ? (
        <BookmarkRowSkeletonGroup length={bookmarksIds?.length || DEFAULT_PAGE_SIZE} />
      ) : (
        bookmarksIds?.map((id) => (
          <FadeInOut valueToUpdate={bookmarksByKey[id]?.deleting} appear key={id}>
            {!bookmarksByKey[id]?.deleting && (
              <CardItem key={id}>
                <BookmarkRow id={id} />
              </CardItem>
            )}
          </FadeInOut>
        ))
      )}
      {!bookmarksLoading && !bookmarksIds?.length && <NoResults content={`ⵁ ${glossary.weDidNotFindAnyBookmark}.`} />}
    </div>
    <Pagination totalItems={totalItems} itemsPerPage={page?.size} offset={page?.offset} path={currentHref} />
  </div>
);
