import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { BookmarksGetApiResponse, BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import HttpClient from 'Services/HttpClient';
import { LocaleFormattedDate } from 'Tools/utils/Date/localeFormattedDate';
import { HeaderSecond as HeaderSecondUi } from './HeaderSecond';

import './HeaderSecond.less';

const HeaderSecond: React.FC = () => {
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const dateNowMs = Math.floor(Date.now() / 1000);
  const date = new LocaleFormattedDate({ unixTime: dateNowMs, locale: currentLanguageSlug });
  const formattedDate = date.getLocaleFormattedDate();
  const [bookmarks, setBookmarks] = useState<BookmarkState[]>([]);

  useEffect(() => {
    const asyncFunction = async () => {
      const { data } = await HttpClient.get<void, BookmarksGetApiResponse>('/bookmarks?page[size]=20');

      const bookmarksArray = data?.map((item) => item.attributes);
      setBookmarks(bookmarksArray);
    };

    asyncFunction();
  }, []);

  return <HeaderSecondUi formattedDate={formattedDate} bookmarks={bookmarks} />;
};

export default HeaderSecond;
