import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarksLoad } from 'Modules/Bookmarks/actions/bookmarksLoad';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { sectionsPopularListsLoad } from 'Modules/Sections/actions/sectionsPopularListsLoad';
import { selectPopularLists } from 'Modules/Sections/selectors/selectPopularLists';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import history from 'Services/History';
import { URLWrapper } from 'Services/URLWrapper';
import { Bookmarks as BookmarksUi } from './Bookmarks';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const popularLists = useSelector(selectPopularLists);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const loading = useSelector(selectBookmarksLoading);
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const url = useSelector(selectCurrentFullUrl);
  const sort = useSelector(selectBookmarksMetaSort);

  const tagsSearch = useSelector(selectTagsSearch);
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];
  const allTags = useSelector(selectTagsAll);
  const currentQueryParamFilter = useSelector(selectCurrentRouteQueryParamFilter);
  const currentQueryParamFilterTags =
    currentQueryParamFilter?.tags?.map((item) => ({
      label: item.toString(),
      value: item,
    })) || [];

  useEffect(() => {
    // dispatch(sectionsPopularListsLoad());
  }, []);

  useEffect(() => {
    dispatch(bookmarksLoad());
    dispatch(tagsSearchLoad());
  }, [url]);

  const onInputChange = (string: string) => {
    !!string && dispatch(tagsSearchLoad(string));
  };

  const onChange = (values) => {
    const tags: string[] = values?.map((item) => item.value);
    const myUrl = new URLWrapper(window.document.location.href);

    myUrl.upsertSearchParams({ filter: { tags } });
    const redirectPath = myUrl.getPathAndSearch();

    history.push(redirectPath);
  };

  return (
    <BookmarksUi
      bookmarksIds={bookmarksIds}
      popularLists={popularLists}
      loading={loading}
      page={page}
      totalItems={totalItems}
      url={url}
      sort={sort}
      tagsSearchFormatted={tagsSearchFormatted}
      allTags={allTags}
      onInputChange={onInputChange}
      currentQueryParamFilterTags={currentQueryParamFilterTags}
      onChange={onChange}
    />
  );
};
export default Home;
