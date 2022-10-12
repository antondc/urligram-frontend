import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarksLoadByUserId } from 'Modules/Bookmarks/actions/bookmarksLoadByUserId';
import { selectBookmarksErrorLast } from 'Modules/Bookmarks/selectors/selectBookmarksErrorLast';
import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { selectCurrentRoute } from 'Modules/Routes/selectors/selectCurrentRoute';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { DEFAULT_PROTOCOL, DELAY_SLOW_MS } from 'Root/src/shared/constants';
import { Routes } from 'Router/routes';
import history from 'Services/History';
import HttpClient from 'Services/HttpClient';
import { testStringIsValidUrl } from 'Tools/utils/url/testStringIsValidUrl';
import { testUrlHasProtocol } from 'Tools/utils/url/testUrlHasProtocol';
import { urlRemoveLeadingCharacters } from 'Tools/utils/url/urlRemoveLeadingCharacters';
import { BookmarkCreateForm as BookmarkFormUi } from './BookmarkCreateForm';

import './BookmarkCreateForm.less';

export type TagValue = {
  label: string;
  value: string;
};

interface Props {
  closeModal: () => void;
  setLocked?: (value: boolean) => void;
}

const BookmarkCreateForm: React.FC<Props> = ({ closeModal, setLocked }) => {
  const dispatch = useDispatch();
  const bookmarkError = useSelector(selectBookmarksErrorLast);
  const allTags = useSelector(selectTagsAll);
  const tagsSearch = useSelector(selectTagsSearch);
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const currentRoute = useSelector(selectCurrentRoute);
  const currentRouteName = currentRoute?.name;
  const sessionId = useSelector(selectSessionUserId);
  const [urlSubmitted, setUrlSubmitted] = useState<boolean>(false);
  const [urlLoading, setUrlLoading] = useState<boolean>(false);
  const [urlValue, setUrlValue] = useState<string>(undefined);
  const [urlError, setUrlError] = useState<string>(undefined);
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [isPrivateValue, setIsPrivateValue] = useState<boolean>(false);
  const [tagsValue, setTagsValue] = useState<TagValue[]>([]);
  const [notesValue, setNotesValue] = useState<string>(undefined);
  const [notesError, setNotesError] = useState<string>(undefined);
  const [submitInProcess, setSubmitInProcess] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const submitDisabled = !titleValue || !!titleError;

  const onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const result = urlRemoveLeadingCharacters(value);

    setUrlValue(result);
    setUrlError(undefined);
    setUrlSubmitted(false);
    setTitleValue(undefined);
    setTitleError(undefined);
    setTagsValue([]);
    setIsPrivateValue(false);
    setSubmitSuccess(undefined);
    setSubmitError(undefined);
  };

  const onBlurUrl = async () => {
    if (urlSubmitted) return;
    if (!urlValue) {
      setUrlError('Url is mandatory');

      return;
    }
    setLocked(true);
    setSubmitSuccess(undefined);
    const urlHasProtocol = testUrlHasProtocol(urlValue);

    const valueWithProtocol = urlHasProtocol ? urlValue : DEFAULT_PROTOCOL + urlValue;

    const isValidUrl = testStringIsValidUrl(valueWithProtocol);

    if (!isValidUrl) {
      setUrlError('Url is not valid');

      return;
    }

    try {
      setUrlLoading(true);
      const encodedUrl = encodeURIComponent(valueWithProtocol);

      const {
        data: { attributes: urlInfo },
      } = await HttpClient.get(`links/url?url=${encodedUrl}`);

      if (urlInfo?.title) setTitleValue(urlInfo?.title);

      setUrlSubmitted(true);
      setUrlValue(valueWithProtocol);
      setUrlError(undefined);
      setSubmitError(undefined);
    } catch (error) {
      setUrlError(error?.message);
    } finally {
      setUrlLoading(false);
      setLocked(false);
    }
  };

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTitleValue(value);
    setSubmitSuccess(undefined);
    setTitleError(undefined);
    setSubmitError(undefined);
  };

  const onChangeNotes = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNotesError(undefined);
    setSubmitSuccess(undefined);
    setSubmitError(undefined);

    setNotesValue(value);
  };

  const onChangeIsPrivate = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    setIsPrivateValue(checked);
    setSubmitSuccess(undefined);
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

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (!urlSubmitted) {
      onBlurUrl();

      return;
    }

    setSubmitInProcess(true);
    setLocked(true);
    const transformedTags = tagsValue.map((item) => ({ tag: item.value }));

    const data = {
      title: titleValue,
      isPrivate: isPrivateValue,
      url: urlValue,
      tags: transformedTags,
      notes: notesValue,
    };

    const response = await dispatch(bookmarkCreate(data));
    setSubmitInProcess(false);
    setLocked(false);

    if (response?.title) {
      setSubmitSuccess(true);

      setTimeout(() => {
        if (currentRouteName === Routes.UserBookmarks.name) {
          dispatch(bookmarksLoadByUserId(sessionId));
        } else {
          history.push(`/${currentLanguageSlug}/users/${sessionId}/bookmarks?sort=-createdAt`);
        }

        closeModal();
      }, DELAY_SLOW_MS);

      return;
    }
  };

  useEffect(() => {
    setSubmitError(undefined);
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
    <BookmarkFormUi
      urlSubmitted={urlSubmitted}
      titleValue={titleValue}
      titleError={titleError}
      onChangeTitle={onChangeTitle}
      isPrivateValue={isPrivateValue}
      onChangeIsPrivate={onChangeIsPrivate}
      urlLoading={urlLoading}
      urlValue={urlValue}
      urlError={urlError}
      onChangeUrl={onChangeUrl}
      onBlurUrl={onBlurUrl}
      allTags={allTags}
      tagsSearchFormatted={tagsSearchFormatted}
      tagsValue={tagsValue}
      onChangeTags={onChangeTags}
      onChangeTagsInput={onChangeTagsInput}
      notesValue={notesValue}
      notesError={notesError}
      onChangeNotes={onChangeNotes}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitInProcess={submitInProcess}
      submitSuccess={submitSuccess}
      submitError={submitError}
    />
  );
};

export default BookmarkCreateForm;
