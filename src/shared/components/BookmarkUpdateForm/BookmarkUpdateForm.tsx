import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalTitle } from 'Components/BaseModal';
import { TagState } from 'Modules/Tags/tags.types';
import { Button, Earth, FadeInOut, Input, Select, SelectValue, Switch, TextArea } from '@antoniodcorrea/components';
import { TagValue } from '.';

import './BookmarkUpdateForm.less';

interface Props {
  urlValue: string;
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  isPublicValue: boolean;
  onChangeIsPublic: (e: React.FormEvent<HTMLInputElement>) => void;
  allTags: TagState[];
  tagsSearchFormatted: TagValue[];
  tagsValue: TagValue[];
  onChangeTagsInput: (string: string) => void;
  onChangeTags: (string: SelectValue[]) => void;
  notesValue: string;
  notesError: string;
  onChangeNotes: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  submitDisabled: boolean;
  submitting: boolean;
  submitSuccess: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
  onUrlInputClick: (e: React.FormEvent<HTMLInputElement>) => void;
}

export const BookmarkUpdateForm: React.FC<Props> = ({
  urlValue,
  titleValue,
  titleError,
  onChangeTitle,
  isPublicValue,
  onChangeIsPublic,
  allTags,
  tagsSearchFormatted,
  tagsValue,
  onChangeTagsInput,
  onChangeTags,
  notesValue,
  notesError,
  onChangeNotes,
  submitDisabled,
  submitting,
  submitSuccess,
  submitError,
  onSubmit,
  onUrlInputClick,
}) => (
  <BaseForm className="BookmarkUpdateForm" onSubmit={onSubmit}>
    <BaseModalTitle>Update Bookmark</BaseModalTitle>
    <BaseFormField>
      <Input
        className="BookmarkUpdateForm-url"
        name="url"
        label="Url"
        type="text"
        value={urlValue}
        onClick={onUrlInputClick}
        grow
        readOnly
      />
    </BaseFormField>
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
      <BaseFormLabel>Notes</BaseFormLabel>
      <TextArea name="notes" value={notesValue} error={!!notesError} grow onChange={onChangeNotes} />
    </BaseFormField>
    <BaseFormField>
      <BaseFormLabel>Is Public</BaseFormLabel>
      <div className="BookmarkUpdateForm-public">
        <Switch name="isPublic" checked={isPublicValue} onChange={onChangeIsPublic} />
        <Earth
          className={
            'BookmarkUpdateForm-iconPublic' + (!!isPublicValue ? ' BookmarkUpdateForm-iconPublic--active' : '')
          }
          size="medium"
        />
      </div>
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
