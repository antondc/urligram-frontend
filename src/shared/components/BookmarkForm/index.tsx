import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { BookmarkState } from 'Modules/Bookmarks/bookmarks.types';
import { selectBookmarksErrorLast } from 'Modules/Bookmarks/selectors/selectBookmarksErrorLast';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { DEFAULT_PROTOCOL, DELAY_MEDIUM_MS, EXTENSION_CHROME, EXTENSION_FIREFOX } from 'Root/src/shared/constants';
import HttpClient from 'Services/HttpClient';
import { identifyBrowser } from 'Tools/utils/browser/identifyBrowser';
import { testStringIsValidUrl } from 'Tools/utils/url/testStringIsValidUrl';
import { testUrlHasProtocol } from 'Tools/utils/url/testUrlHasProtocol';
import { urlRemoveLeadingCharacters } from 'Tools/utils/url/urlRemoveLeadingCharacters';
import { BookmarkForm as BookmarkFormUi } from './BookmarkForm';

import './BookmarkForm.less';

export type TagValue = {
  label: string;
  value: string;
};

const BookmarkForm: React.FC = () => {
  const dispatch = useDispatch();
  const bookmarkError = useSelector(selectBookmarksErrorLast);
  const allTags = useSelector(selectTagsAll);
  const tagsSearch = useSelector(selectTagsSearch);
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];
  const [urlSubmitted, setUrlSubmitted] = useState<boolean>(false);
  const [urlLoading, setUrlLoading] = useState<boolean>(false);
  const [urlValue, setUrlValue] = useState<string>(undefined);
  const [urlError, setUrlError] = useState<string>(undefined);
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [isPrivateValue, setIsPrivateValue] = useState<boolean>(false);
  const [isPrivateError, setIsPrivateError] = useState<string>(undefined);
  const [tagsValue, setTagsValue] = useState<TagValue[]>([]);
  const [submitInProcess, setSubmitInProcess] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const submitDisabled = !titleValue || !!titleError;
  const userAgent = identifyBrowser();
  const debouncedRetrieveBookmarkOrUrlInfo = useCallback(
    debounce(async (value) => await retrieveBookmarkOrUrlInfo(value), DELAY_MEDIUM_MS),
    []
  );

  const onChangeUrl = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (urlLoading) return;

    const urlWithoutLeadingCharacters = urlRemoveLeadingCharacters(value);
    setUrlValue(urlWithoutLeadingCharacters);
    setUrlError(undefined);
    setUrlSubmitted(false);
    setTitleValue(undefined);
    setTitleError(undefined);
    setTagsValue([]);
    setIsPrivateValue(false);
    setSubmitSuccess(undefined);
    setSubmitError(undefined);

    debouncedRetrieveBookmarkOrUrlInfo(value);
  };

  const retrieveBookmarkOrUrlInfo = async (value) => {
    setUrlLoading(true);
    try {
      const bookmark = await getBookmarkFromServer(value);

      setTitleValue(bookmark?.title);
      const tags = bookmark?.tags.map((item) => ({
        label: item.name,
        value: item.name,
      }));
      setTagsValue(tags);
    } catch (error) {
      await getUrlInfoFromServer(value);
    } finally {
      setUrlLoading(false);
    }
  };

  const getUrlInfoFromServer = async (url: string) => {
    if (!url) {
      setUrlError('Url is mandatory');
      setUrlLoading(false);

      return;
    }
    setSubmitSuccess(undefined);
    const urlHasProtocol = testUrlHasProtocol(url);
    const valueWithProtocol = urlHasProtocol ? url : DEFAULT_PROTOCOL + url;
    const isValidUrl = testStringIsValidUrl(valueWithProtocol);

    if (!isValidUrl) {
      setUrlError('Url is not valid');

      return;
    }

    setUrlLoading(true);
    try {
      const encodedUrl = encodeURIComponent(valueWithProtocol);

      const {
        data: { attributes: urlInfo },
      } = await HttpClient.get(`/links/url?url=${encodedUrl}`);

      if (urlInfo?.title) setTitleValue(urlInfo?.title);

      setUrlSubmitted(true);
      setUrlValue(valueWithProtocol);
      setUrlError(undefined);
      setSubmitError(undefined);
    } catch (error) {
      setUrlError(error?.message);
    } finally {
      setUrlLoading(false);
    }
  };

  const getBookmarkFromServer = async (url: string): Promise<BookmarkState> => {
    const encodedUrl = encodeURIComponent(url);

    const {
      data: { attributes },
    } = await HttpClient.get(`/users/me/bookmarks/url?url=${encodedUrl}`);

    if (!attributes) return;
    setTitleValue(attributes.title);
    const tags = attributes?.tags.map((item) => ({
      label: item.name,
      value: item.name,
    }));
    setTagsValue(tags);

    return attributes;
  };

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!urlSubmitted) {
      // onBlurUrl();

      return;
    }

    setSubmitInProcess(true);
    const transformedTags = tagsValue.map((item) => ({ tag: item.value }));

    const data = {
      title: titleValue,
      isPrivate: isPrivateValue,
      url: urlValue,
      tags: transformedTags,
    };

    try {
      await dispatch(bookmarkCreate(data));
      setSubmitSuccess(true);
    } finally {
      setSubmitInProcess(false);
    }
  };

  const onChangeTitle = async (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTitleValue(value);

    setSubmitSuccess(undefined);
    setTitleError(undefined);
    setSubmitError(undefined);
  };

  const onChangeIsPrivate = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    setIsPrivateValue(checked);
    setSubmitSuccess(undefined);
    setIsPrivateError(undefined);
    setSubmitError(undefined);
  };

  const onChangeTagsInput = (string: string) => {
    setSubmitSuccess(undefined);

    !!string && dispatch(tagsSearchLoad(string));
  };

  const onChangeTags = (values) => {
    const tags: TagValue[] = values;
    setTagsValue(tags || []);
  };

  const getDataFromTab = () => {
    // TODO: this should be in a service
    if (userAgent === EXTENSION_FIREFOX) {
      browser.tabs.query({ currentWindow: true, active: true }).then((queryInfo) => {
        browser.tabs.get(queryInfo[0].id).then((tab) => {
          setTitleValue(tab?.title);
          setUrlValue(tab?.url);
          setUrlSubmitted(true);
          getBookmarkFromServer(tab?.url);
        });
      });
    }
    if (userAgent === EXTENSION_CHROME) {
      chrome.tabs.query(
        {
          active: true,
          lastFocusedWindow: true,
        },
        ([tab]) => {
          setTitleValue(tab?.title);
          setUrlValue(tab?.url);
          setUrlSubmitted(true);
          getBookmarkFromServer(tab?.url);
        }
      );
    }
  };

  useEffect(() => {
    setSubmitError(undefined);
    getDataFromTab();
  }, []);

  useEffect(() => {
    getDataFromTab();
  }, []);

  useEffect(() => {
    if (bookmarkError?.field === 'title') {
      setTitleError(bookmarkError?.message);

      return;
    }

    if (bookmarkError?.field === 'url') {
      setUrlError(bookmarkError?.message);

      return;
    }

    if (bookmarkError?.message) setSubmitError(bookmarkError?.message);
  }, [bookmarkError]);

  return (
    <>
      <BookmarkFormUi
        urlSubmitted={urlSubmitted}
        titleValue={titleValue}
        titleError={titleError}
        onChangeTitle={onChangeTitle}
        isPrivateValue={isPrivateValue}
        isPrivateError={isPrivateError}
        onChangeIsPrivate={onChangeIsPrivate}
        urlLoading={urlLoading}
        urlValue={urlValue}
        urlError={urlError}
        onChangeUrl={onChangeUrl}
        // onBlurUrl={onBlurUrl}
        allTags={allTags}
        tagsSearchFormatted={tagsSearchFormatted}
        tagsValue={tagsValue}
        onChangeTags={onChangeTags}
        onChangeTagsInput={onChangeTagsInput}
        onSubmit={onSubmit}
        submitDisabled={submitDisabled}
        submitInProcess={submitInProcess}
        submitSuccess={submitSuccess}
        submitError={submitError}
      />
    </>
  );
};

export default BookmarkForm;
