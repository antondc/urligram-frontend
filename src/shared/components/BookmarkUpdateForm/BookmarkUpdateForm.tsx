import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalTitle } from 'Components/BaseModal';
import { TagState } from 'Modules/Tags/tags.types';
import { Button, FadeInOut, Input, Select, SelectValue, Switch } from 'Vendor/components';
import { TagValue } from '.';

import './BookmarkUpdateForm.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  isPrivateValue: boolean;
  onChangeIsPrivate: (e: React.FormEvent<HTMLInputElement>) => void;
  allTags: TagState[];
  tagsSearchFormatted: TagValue[];
  tagsValue: TagValue[];
  onChangeTagsInput: (string: string) => void;
  onChangeTags: (string: SelectValue[]) => void;
  submitDisabled: boolean;
  submitting: boolean;
  submitSuccess: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
}

export const BookmarkUpdateForm: React.FC<Props> = ({
  titleValue,
  titleError,
  onChangeTitle,
  isPrivateValue,
  onChangeIsPrivate,
  allTags,
  tagsSearchFormatted,
  tagsValue,
  onChangeTagsInput,
  onChangeTags,
  submitDisabled,
  submitting,
  submitSuccess,
  submitError,
  onSubmit,
}) => (
  <BaseForm className="BookmarkUpdateForm" onSubmit={onSubmit}>
    <BaseModalTitle>Update Bookmark</BaseModalTitle>
    <BaseFormField>
      <Input
        name="title"
        type="text"
        label="Title"
        onChange={onChangeTitle}
        onBlur={onChangeTitle}
        value={titleValue}
        error={titleError}
        grow
      />
    </BaseFormField>
    <BaseFormField>
      <Select
        className="BookmarkUpdateForm-tags"
        placeholder="Select tags"
        value={tagsValue}
        defaultOptions={[]}
        options={[...tagsSearchFormatted, ...allTags.map((item) => ({ label: item.name, value: item.name }))].filter(
          (v, i, a) => a.findIndex((t) => t.value === v.value) === i
        )}
        onInputChange={onChangeTagsInput}
        onChange={onChangeTags}
        maxItems={4}
        grow
        isCreatable
      />
    </BaseFormField>
    <BaseFormField>
      <BaseFormLabel>Is Private</BaseFormLabel>
      <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
    </BaseFormField>
    <BaseFormSubmit>
      <Button
        text="Save"
        type="submit"
        onClick={onSubmit}
        error={!!submitError}
        success={submitSuccess}
        disabled={submitDisabled}
        loading={submitting}
        grow
      />
      <FadeInOut valueToUpdate={!!submitError} speed="fast">
        <BaseFormError>{submitError}</BaseFormError>
      </FadeInOut>
    </BaseFormSubmit>
  </BaseForm>
);
