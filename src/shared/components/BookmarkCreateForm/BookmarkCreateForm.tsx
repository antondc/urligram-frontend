import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalTitle } from 'Components/BaseModal';
import { TagState } from 'Modules/Tags/tags.types';
import {
  ArrowRight,
  Button,
  Earth,
  FadeInOut,
  Input,
  Select,
  SelectValue,
  Spinner,
  Switch,
  TextArea,
} from '@antoniodcorrea/components';
import { GlossaryState } from 'Modules/Languages/languages.types';
import { TagValue } from '.';

import './BookmarkCreateForm.less';

interface Props {
  glossary: GlossaryState;
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  isPublicValue: boolean;
  onChangeIsPublic: (e: React.FormEvent<HTMLInputElement>) => void;
  urlSubmitted: boolean;
  urlLoading: boolean;
  urlValue: string;
  urlError: string;
  onChangeUrl: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlurUrl: (e: React.FormEvent<HTMLInputElement>) => void;
  allTags: TagState[];
  tagsSearchFormatted: TagValue[];
  tagsValue: TagValue[];
  onChangeTagsInput: (string: string) => void;
  onChangeTags: (string: SelectValue[]) => void;
  notesValue: string;
  notesError: string;
  onChangeNotes: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  submitDisabled: boolean;
  submitInProcess: boolean;
  submitSuccess: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
}

export const BookmarkCreateForm: React.FC<Props> = ({
  glossary,
  titleValue,
  titleError,
  onChangeTitle,
  isPublicValue,
  onChangeIsPublic,
  urlSubmitted,
  urlLoading,
  urlValue,
  urlError,
  onBlurUrl,
  onChangeUrl,
  allTags,
  tagsSearchFormatted,
  tagsValue,
  onChangeTagsInput,
  onChangeTags,
  notesValue,
  notesError,
  onChangeNotes,
  submitDisabled,
  submitInProcess,
  submitSuccess,
  submitError,
  onSubmit,
}) => (
  <BaseForm className="BookmarkCreateForm" onSubmit={onSubmit}>
    <BaseModalTitle>{glossary.addBookmark}</BaseModalTitle>
    <BaseFormField className="BookmarkCreateForm-url">
      <Input
        className="BookmarkCreateForm"
        name="url"
        type="text"
        label="Url"
        onChange={onChangeUrl}
        onBlur={onBlurUrl}
        value={urlValue}
        error={urlError}
        grow
        autoFocus
      />
      <FadeInOut valueToUpdate={urlValue && !urlError && !urlSubmitted && urlLoading} speed="fast">
        {urlValue && !urlError && !urlSubmitted && !urlLoading && (
          <ArrowRight className="BookmarkCreateForm-urlArrow" size="small" />
        )}
        {urlLoading && <Spinner className="BookmarkCreateForm-loader" size="medium" />}
      </FadeInOut>
    </BaseFormField>
    <FadeInOut valueToUpdate={urlSubmitted}>
      {urlSubmitted && (
        <>
          <BaseFormField>
            <Input
              name="title"
              type="text"
              label={glossary.title}
              onChange={onChangeTitle}
              onBlur={onChangeTitle}
              value={titleValue}
              error={titleError}
              grow
            />
          </BaseFormField>
          <BaseFormField>
            <Select
              className="BookmarkCreateForm-tags"
              placeholder={glossary.selectTags}
              value={tagsValue}
              defaultOptions={[]}
              options={[
                ...tagsSearchFormatted,
                ...allTags.map((item) => ({ label: item.name, value: item.name })),
              ].filter((v, i, a) => a.findIndex((t) => t.value === v.value) === i)}
              onInputChange={onChangeTagsInput}
              onChange={onChangeTags}
              maxItems={4}
              grow
              isCreatable
            />
          </BaseFormField>
          <BaseFormField>
            <BaseFormLabel>{glossary.notes}</BaseFormLabel>
            <TextArea name="notes" value={notesValue} error={!!notesError} grow onChange={onChangeNotes} />
          </BaseFormField>
          <BaseFormField>
            <BaseFormLabel>{glossary.isPublic}</BaseFormLabel>
            <div className="BookmarkCreateForm-public">
              <Switch name="isPublic" checked={isPublicValue} onChange={onChangeIsPublic} />
              <Earth
                className={
                  'BookmarkCreateForm-iconPublic' + (!!isPublicValue ? ' BookmarkCreateForm-iconPublic--active' : '')
                }
                size="medium"
              />
            </div>
          </BaseFormField>
          <BaseFormSubmit>
            <Button
              text={glossary.save}
              type="submit"
              onClick={onSubmit}
              error={!!submitError}
              success={submitSuccess}
              disabled={submitDisabled}
              loading={urlLoading || submitInProcess}
              grow
            />
            <FadeInOut valueToUpdate={!!submitError} speed="fast">
              <BaseFormError>{submitError}</BaseFormError>
            </FadeInOut>
          </BaseFormSubmit>
        </>
      )}
    </FadeInOut>
  </BaseForm>
);
