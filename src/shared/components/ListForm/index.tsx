import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { listCreate } from 'Modules/Lists/actions/listCreate';
import { listCreateReset } from 'Modules/Lists/actions/listCreateReset';
import { listDelete } from 'Modules/Lists/actions/listDelete';
import { listUpdate } from 'Modules/Lists/actions/listUpdate';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { selectListsErrorLast } from 'Modules/Lists/selectors/selectListsErrorLast';
import { RootState } from 'Modules/rootType';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { selectUiListModal } from 'Modules/Ui/selectors/selectUiListModal';
import { DELAY_SLOW_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { urlRemoveLeadingCharacters } from '@antoniodcorrea/utils';
import { ListForm as ListFormUi } from './ListForm';

import './ListForm.less';

interface Props {
  closeModal: () => void;
  setLocked: (locked: boolean) => void;
}

const ListForm: React.FC<Props> = ({ closeModal, setLocked }) => {
  const dispatch = useDispatch();
  const listError = useSelector(selectListsErrorLast);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const sessionId = useSelector(selectSessionUserId);
  const listModal = useSelector(selectUiListModal);
  const list = useSelector((state: RootState) => selectListById(state, { id: listModal?.listId }));
  const [nameValue, setNameValue] = useState<string>(list?.name);
  const [nameError, setNameError] = useState<string>(undefined);
  const [descriptionValue, setDescriptionValue] = useState<string>(list?.description);
  const [descriptionError, setDescriptionError] = useState<string>(undefined);
  const [isPublicValue, setIsPublicValue] = useState<boolean>(list?.isPublic);
  const [submitting, setSubmitting] = useState<boolean>(undefined);
  const [removing, setRemoving] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const submitDisabled = !nameValue || !!nameError || !descriptionValue || !!descriptionError;
  const isUpdate = !!list?.id || !!removing;

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const result = urlRemoveLeadingCharacters(value);

    setNameValue(result);
    setNameError(undefined);
    setSubmitSuccess(undefined);
    setSubmitError(undefined);
  };

  const onChangeDescription = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setDescriptionValue(value);
    setDescriptionError(undefined);
    setSubmitSuccess(undefined);
    setSubmitError(undefined);
  };

  const onChangeIsPublic = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    setIsPublicValue(checked);
    setSubmitSuccess(undefined);
    setSubmitError(undefined);
  };

  const onBlurTitle = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!nameValue) {
      setNameError('List name is required');

      return;
    }
  };

  const onBlurDescription = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!descriptionValue) {
      setDescriptionError('List description is required');

      return;
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setLocked(true);

    try {
      const data = {
        listId: list?.id,
        listName: nameValue,
        listDescription: descriptionValue,
        listIsPublic: isPublicValue,
      };

      const response = !!list?.id ? await dispatch(listUpdate(data)) : await dispatch(listCreate(data));

      if (!!response?.id) closeModal();

      if (!list?.id && !!response?.id) {
        setSubmitSuccess(true);

        setTimeout(() => {
          history.push(`/${currentLanguageSlug}/users/${sessionId}/lists?sort=-createdAt`);

          return;
        }, DELAY_SLOW_MS);
      }
    } finally {
      setSubmitting(false);
      setLocked(false);
      setSubmitting(false);
    }
  };

  const onRemove = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRemoving(true);
    setLocked(true);

    try {
      await dispatch(listDelete({ listId: list?.id }));

      setTimeout(() => {
        closeModal();
        history.push(`/${currentLanguageSlug}/users/${sessionId}/lists`);
      }, DELAY_SLOW_MS);
    } finally {
      setRemoving(false);
      setLocked(false);
    }
  };

  useEffect(() => {
    if (listError?.field === 'name') {
      setNameError(listError?.message);

      return;
    }

    if (listError?.field === 'description') {
      setDescriptionError(listError?.message);

      return;
    }

    if (listError?.message) setSubmitError(listError?.message);
  }, [listError]);

  useEffect(() => {
    setSubmitError(undefined);

    return () => {
      dispatch(listCreateReset());
    };
  }, []);

  return (
    <ListFormUi
      isUpdate={isUpdate}
      nameValue={nameValue}
      nameError={nameError}
      onChangeName={onChangeName}
      descriptionValue={descriptionValue}
      descriptionError={descriptionError}
      onChangeDescription={onChangeDescription}
      isPublicValue={isPublicValue}
      onChangeIsPublic={onChangeIsPublic}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitting={submitting}
      removing={removing}
      submitSuccess={submitSuccess}
      submitError={submitError}
      onBlurTitle={onBlurTitle}
      onBlurDescription={onBlurDescription}
      onRemove={onRemove}
    />
  );
};

export default ListForm;
