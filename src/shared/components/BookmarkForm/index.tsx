import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkCreate } from 'Modules/Bookmarks/actions/bookmarkCreate';
import { bookmarkCreateReset } from 'Modules/Bookmarks/actions/bookmarkCreateReset';
import { selectBookmarkCreationSuccess } from 'Modules/Bookmarks/selectors/selectBookmarkCreationSuccess';
import { selectBookmarksErrorLast } from 'Modules/Bookmarks/selectors/selectBookmarksErrorLast';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
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
  const bookmarkCreationSuccess = useSelector(selectBookmarkCreationSuccess);
  const bookmarkError = useSelector(selectBookmarksErrorLast);
  const allTags = useSelector(selectTagsAll);
  const tagsSearch = useSelector(selectTagsSearch);
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];

  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [isPrivateValue, setIsPrivateValue] = useState<boolean>(true);
  const [isPrivateError, setIsPrivateError] = useState<string>(undefined);
  const [urlValue, setUrlValue] = useState<string>(undefined);
  const [urlError, setUrlError] = useState<string>(undefined);
  const [tagsValue, setTagsValue] = useState<TagValue[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);

  const submitDisabled = !titleValue || !!titleError;

  const onChangeTitle = (e: React.FormEvent<HTMLInputElement>) => {
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

  const onChangeUrl = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const result = urlRemoveLeadingCharacters(value);

    setUrlValue(result);
    setSubmitSuccess(undefined);
    setUrlError(undefined);
    setSubmitError(undefined);
  };

  const onBlurUrl = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (!value.length) {
      setUrlError('Url is mandatory');

      return;
    }

    setSubmitSuccess(undefined);
    const urlHasProtocol = testUrlHasProtocol(value);

    const valueWithProtocol = urlHasProtocol ? value : 'https://' + value;

    const isValidUrl = testStringIsValidUrl(valueWithProtocol);

    if (!isValidUrl) {
      setUrlError('Url is not valid');

      return;
    }

    setUrlValue(valueWithProtocol);
    setUrlError(undefined);
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transformedTags = tagsValue.map((item) => ({ tag: item.value }));

    const data = {
      title: titleValue,
      isPrivate: isPrivateValue,
      url: urlValue,
      tags: transformedTags,
    };

    dispatch(bookmarkCreate(data));
  };

  useEffect(() => {
    if (!!bookmarkCreationSuccess) setSubmitSuccess(true);
  }, [bookmarkCreationSuccess]);

  useEffect(() => {
    setSubmitError(undefined);

    return () => {
      dispatch(bookmarkCreateReset());
    };
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
      titleValue={titleValue}
      titleError={titleError}
      onChangeTitle={onChangeTitle}
      isPrivateValue={isPrivateValue}
      isPrivateError={isPrivateError}
      onChangeIsPrivate={onChangeIsPrivate}
      urlValue={urlValue}
      urlError={urlError}
      onChangeUrl={onChangeUrl}
      onBlurUrl={onBlurUrl}
      allTags={allTags}
      tagsSearchFormatted={tagsSearchFormatted}
      tagsValue={tagsValue}
      onChangeTags={onChangeTags}
      onChangeTagsInput={onChangeTagsInput}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitSuccess={submitSuccess}
      submitError={submitError}
    />
  );
};

export default BookmarkForm;
