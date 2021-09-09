import React from 'react';

import { TagState } from 'Modules/Tags/tags.types';
import { Button2, FadeInOut, Input2, Select, SelectValue, Switch } from 'Vendor/components';
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
  <form className="BookmarkUpdateForm" onSubmit={onSubmit}>
    <h2 className="BookmarkUpdateForm-title">Update Bookmark</h2>
    <div className="BookmarkUpdateForm-inputField">
      <Input2
        name="title"
        type="text"
        label="Title"
        onChange={onChangeTitle}
        onBlur={onChangeTitle}
        value={titleValue}
        error={titleError}
        grow
      />
    </div>
    <div className="BookmarkUpdateForm-inputField">
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
    </div>
    <div className="BookmarkUpdateForm-inputField">
      <div className="BookmarkUpdateForm-private">Is Private</div>
      <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
    </div>

    <Button2
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
      <div className="BookmarkUpdateForm-error">{submitError}</div>
    </FadeInOut>
  </form>
);
