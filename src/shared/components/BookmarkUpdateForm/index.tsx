import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bookmarkErrorsClear } from 'Modules/Bookmarks/actions/bookmarkErrorsClear';
import { bookmarkLoadById } from 'Modules/Bookmarks/actions/bookmarkLoadById';
import { bookmarkUpdate } from 'Modules/Bookmarks/actions/bookmarkUpdate';
import { selectBookmarksById } from 'Modules/Bookmarks/selectors/selectBookmarkById';
import { selectBookmarksErrorLast } from 'Modules/Bookmarks/selectors/selectBookmarksErrorLast';
import { notesLoadByLinkId } from 'Modules/Notes/actions/notesLoadByLinkId';
import { RootState } from 'Modules/rootType';
import { tagsSearchLoad } from 'Modules/Tags/actions/tagsSearchLoad';
import { selectTagsAll } from 'Modules/Tags/selectors/selectAllTags';
import { selectTagsSearch } from 'Modules/Tags/selectors/selectTagsSearch';
import { selectUiBookmarkUpdateModal } from 'Modules/Ui/selectors/selectUiBookmarkUpdateModal';
import { usersLoadByLinkId } from 'Modules/Users/actions/usersLoadByLinkId';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import { BookmarkUpdateForm as BookmarkFormUi } from './BookmarkUpdateForm';

import './BookmarkUpdateForm.less';

export type TagValue = {
  label: string;
  value: string;
};

interface Props {
  closeModal: () => void;
  setLocked?: (value: boolean) => void;
}

const BookmarkUpdateForm: React.FC<Props> = ({ closeModal, setLocked }) => {
  const dispatch = useDispatch();
  const bookmarkError = useSelector(selectBookmarksErrorLast);
  const allTags = useSelector(selectTagsAll);
  const tagsSearch = useSelector(selectTagsSearch);
  const tagsSearchFormatted = tagsSearch?.map((item) => ({ label: item.name, value: item.name })) || [];
  const { bookmarkId } = useSelector(selectUiBookmarkUpdateModal);
  const bookmark = useSelector((state: RootState) => selectBookmarksById(state, { bookmarkId }));
  const [titleValue, setTitleValue] = useState<string>(undefined);
  const [titleError, setTitleError] = useState<string>(undefined);
  const [isPrivateValue, setIsPrivateValue] = useState<boolean>(false);
  const [tagsValue, setTagsValue] = useState<TagValue[]>([]);
  const [notesValue, setNotesValue] = useState<string>(undefined);
  const [notesError, setNotesError] = useState<string>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
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
    setSubmitError(undefined);
  };

  const onChangeTagsInput = (string: string) => {
    setSubmitSuccess(undefined);

    !!string && dispatch(tagsSearchLoad(string));
  };

  const onChangeNotes = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    setNotesError(undefined);
    setSubmitSuccess(undefined);
    setSubmitError(undefined);

    setNotesValue(value);
  };

  const onChangeTags = (values) => {
    const tags: TagValue[] = values;
    setTagsValue(tags || []);
  };

  const onUrlInputClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    window?.open(bookmark?.url);
  };

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setLocked(true);

    try {
      const transformedTags = tagsValue.map((item) => ({ tag: item.value }));

      const data = {
        bookmarkId: bookmarkId,
        title: titleValue,
        isPrivate: isPrivateValue,
        order: 1,
        tags: transformedTags,
        notes: notesValue,
      };

      const bookmark = await dispatch(bookmarkUpdate(data));
      dispatch(bookmarkLoadById({ bookmarkId }));

      if (!!bookmark?.id) {
        setSubmitting(false);
        setLocked(false);
        setSubmitSuccess(true);
        dispatch(notesLoadByLinkId({ linkId: bookmark.linkId }));
        dispatch(usersLoadByLinkId({ linkId: bookmark.linkId }));

        setTimeout(() => {
          closeModal();
        }, DELAY_SLOW_MS);

        return;
      }
    } finally {
      setSubmitting(false);
      setLocked(false);
    }
  };

  useEffect(() => {
    setSubmitError(undefined);
    setTitleError(undefined);
    setTitleValue(bookmark?.title);
    setIsPrivateValue(bookmark?.isPrivate);
    setTagsValue(bookmark?.tags?.map((item) => ({ label: item.name, value: item.name })));
    setNotesValue(bookmark?.notes);
  }, []);

  useEffect(() => {
    if (bookmarkError?.field === 'title') {
      setTitleError(bookmarkError?.message);

      return;
    }

    if (bookmarkError?.message) setSubmitError(bookmarkError?.message);

    return () => {
      dispatch(bookmarkErrorsClear());
    };
  }, [bookmarkError]);

  return (
    <BookmarkFormUi
      urlValue={bookmark?.url}
      titleValue={titleValue}
      titleError={titleError}
      onChangeTitle={onChangeTitle}
      isPrivateValue={isPrivateValue}
      onChangeIsPrivate={onChangeIsPrivate}
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
      submitting={submitting}
      submitSuccess={submitSuccess}
      submitError={submitError}
      onUrlInputClick={onUrlInputClick}
    />
  );
};

export default BookmarkUpdateForm;
