import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useScrollBeforeCallback } from 'Hooks/useScrollBeforeCallback';
import { bookmarksLoad } from 'Modules/Bookmarks/actions/bookmarksLoad';
import { selectBookmarksCurrentIds } from 'Modules/Bookmarks/selectors/selectBookmarksCurrentIds';
import { selectBookmarksLoading } from 'Modules/Bookmarks/selectors/selectBookmarksLoading';
import { selectBookmarksMetaSort } from 'Modules/Bookmarks/selectors/selectBookmarksMetaSort';
import { selectBookmarksTotalItems } from 'Modules/Bookmarks/selectors/selectBookmarkTotalItems';
import { selectCurrentGlossary } from 'Modules/Languages/selectors/selectCurrentGlossary';
import { selectCurrentFullUrl } from 'Modules/Routes/selectors/selectCurrentFullUrl';
import { selectCurrentRouteQueryParamFilter } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamFilter';
import { selectCurrentRouteQueryParamPage } from 'Modules/Routes/selectors/selectCurrentRouteQueryParamPage';
import { selectSession } from 'Modules/Session/selectors/selectSession';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { uiResetModalsState } from 'Modules/Ui/actions/uiResetModalsState';
import history from 'Services/History';
import { isDomAvailable, URLWrapper } from '@antoniodcorrea/utils';
import { Home as HomeUi } from './Home';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const glossary = useSelector(selectCurrentGlossary);
  const bookmarksIds = useSelector(selectBookmarksCurrentIds);
  const loading = useSelector(selectBookmarksLoading) && isDomAvailable;
  const page = useSelector(selectCurrentRouteQueryParamPage);
  const totalItems = useSelector(selectBookmarksTotalItems);
  const currentHref = useSelector(selectCurrentFullUrl);
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
  const { scrollBeforeCallback } = useScrollBeforeCallback();

  const onInputChange = (string: string) => {
    !!string && dispatch(tagsSearchLoad(string));
  };

  const onChange = (values) => {
    const tags: string[] = values?.map((item) => item.value);
    const myUrl = new URLWrapper(window.document.location.href);

    myUrl.upsertSearchParams({ filter: { tags } });
    myUrl.deleteSearchParam('page[offset]'); // Restart page on new search
    const redirectPath = myUrl.getPathAndSearch();

    scrollBeforeCallback(() => history.push(redirectPath));
  };

  useEffect(() => {
    dispatch(bookmarksLoad());
  }, [currentHref, session?.id]);

  useEffect(() => () => dispatch(uiResetModalsState()), []);

  return (
    <HomeUi
      glossary={glossary}
      bookmarksIds={bookmarksIds}
      loading={loading}
      page={page}
      totalItems={totalItems}
      currentHref={currentHref}
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
