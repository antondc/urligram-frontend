import React from 'react';

import BaseForm, { BaseFormError, BaseFormField, BaseFormLabel, BaseFormSubmit } from 'Components/BaseForm';
import { BaseModalTitle } from 'Components/BaseModal';
import { TagState } from 'Modules/Tags/tags.types';
import { ArrowRight, Button2, FadeInOut, Input, Select, SelectValue, SpinnerPie, Switch } from 'Vendor/components';
import { TagValue } from '.';

import './BookmarkCreateForm.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  isPrivateValue: boolean;
  onChangeIsPrivate: (e: React.FormEvent<HTMLInputElement>) => void;
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
  submitDisabled: boolean;
  submitInProcess: boolean;
  submitSuccess: boolean;
  submitError: string;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
}

export const BookmarkCreateForm: React.FC<Props> = ({
  titleValue,
  titleError,
  onChangeTitle,
  isPrivateValue,
  onChangeIsPrivate,
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
  submitDisabled,
  submitInProcess,
  submitSuccess,
  submitError,
  onSubmit,
}) => (
  <BaseForm className="BookmarkCreateForm" onSubmit={onSubmit}>
    <BaseModalTitle>Add a Bookmark</BaseModalTitle>
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
        {urlLoading && <SpinnerPie className="BookmarkCreateForm-loader" size="medium" />}
      </FadeInOut>
    </BaseFormField>
    <FadeInOut valueToUpdate={urlSubmitted}>
      {urlSubmitted && (
        <>
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
              className="BookmarkCreateForm-tags"
              placeholder="Select tags"
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
              // isCreatable
            />
          </BaseFormField>
          <BaseFormField>
            <BaseFormLabel>Is Private</BaseFormLabel>
            <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
          </BaseFormField>
          <BaseFormSubmit>
            <Button2
              text="Save"
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
