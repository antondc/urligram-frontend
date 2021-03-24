import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { listCreate } from 'Modules/Lists/actions/listCreate';
import { listCreateReset } from 'Modules/Lists/actions/listCreateReset';
import { selectListsErrorLast } from 'Modules/Lists/selectors/selectListsErrorLast';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { DELAY_MEDIUM_MS } from 'Root/src/shared/constants';
import history from 'Services/History';
import { urlRemoveLeadingCharacters } from 'Tools/utils/url/urlRemoveLeadingCharacters';
import { ListForm as ListFormUi } from './ListForm';

import './ListForm.less';

export type TagValue = {
  label: string;
  value: string;
};

interface Props {
  closeModal: () => void;
}

const ListForm: React.FC<Props> = ({ closeModal }) => {
  const dispatch = useDispatch();
  const listError = useSelector(selectListsErrorLast);
  const currentLanguageSlug = useSelector(selectCurrentLanguageSlug);
  const sessionId = useSelector(selectSessionUserId);
  const [nameValue, setNameValue] = useState<string>(undefined);
  const [nameError, setNameError] = useState<string>(undefined);
  const [descriptionValue, setDescriptionValue] = useState<string>(undefined);
  const [descriptionError, setDescriptionError] = useState<string>(undefined);
  const [isPrivateValue, setIsPrivateValue] = useState<boolean>(false);
  const [isPrivateError, setIsPrivateError] = useState<string>(undefined);
  const [submitInProcess, setSubmitInProcess] = useState<boolean>(undefined);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(undefined);
  const [submitError, setSubmitError] = useState<string>(undefined);
  const submitDisabled = !nameValue || !!nameError || !descriptionValue || !!descriptionError;

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

  const onChangeIsPrivate = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked } = e.currentTarget;

    setIsPrivateValue(checked);
    setSubmitSuccess(undefined);
    setIsPrivateError(undefined);
    setSubmitError(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitInProcess(true);

    const data = {
      listName: nameValue,
      listDescription: descriptionValue,
      listIsPrivate: isPrivateValue,
    };

    const list = await dispatch(listCreate(data));

    if (!!list.id) {
      setSubmitInProcess(false);
      setSubmitSuccess(true);
      closeModal();

      setTimeout(() => {
        history.push(`/${currentLanguageSlug}/users/${sessionId}/lists`);
      }, DELAY_MEDIUM_MS);

      return;
    }
    setSubmitInProcess(false);
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
      nameValue={nameValue}
      nameError={nameError}
      onChangeName={onChangeName}
      descriptionValue={descriptionValue}
      descriptionError={descriptionError}
      onChangeDescription={onChangeDescription}
      isPrivateValue={isPrivateValue}
      isPrivateError={isPrivateError}
      onChangeIsPrivate={onChangeIsPrivate}
      onSubmit={onSubmit}
      submitDisabled={submitDisabled}
      submitInProcess={submitInProcess}
      submitSuccess={submitSuccess}
      submitError={submitError}
    />
  );
};

export default ListForm;
