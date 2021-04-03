import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentLanguageSlug } from 'Modules/Languages/selectors/selectCurrentLanguageSlug';
import { listCreate } from 'Modules/Lists/actions/listCreate';
import { listCreateReset } from 'Modules/Lists/actions/listCreateReset';
import { listUpdate } from 'Modules/Lists/actions/listUpdate';
import { selectListById } from 'Modules/Lists/selectors/selectListById';
import { selectListsErrorLast } from 'Modules/Lists/selectors/selectListsErrorLast';
import { RootState } from 'Modules/rootType';
import { selectSessionUserId } from 'Modules/Session/selectors/selectSessionUserId';
import { selectUiListModal } from 'Modules/Ui/selectors/selectUiListModal';
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
  const listModal = useSelector(selectUiListModal);
  const list = useSelector((state: RootState) => selectListById(state, { id: listModal?.listId }));
  const [nameValue, setNameValue] = useState<string>(list?.name);
  const [nameError, setNameError] = useState<string>(undefined);
  const [descriptionValue, setDescriptionValue] = useState<string>(list?.description);
  const [descriptionError, setDescriptionError] = useState<string>(undefined);
  const [isPrivateValue, setIsPrivateValue] = useState<boolean>(list?.isPrivate);
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

  const onSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    setSubmitInProcess(true);

    const data = {
      listId: list?.id,
      listName: nameValue,
      listDescription: descriptionValue,
      listIsPrivate: isPrivateValue,
    };

    const response = !!list?.id ? await dispatch(listUpdate(data)) : await dispatch(listCreate(data));

    if (!!response?.id) closeModal();

    if (!list?.id && !!response?.id) {
      setSubmitInProcess(false);
      setSubmitSuccess(true);

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
