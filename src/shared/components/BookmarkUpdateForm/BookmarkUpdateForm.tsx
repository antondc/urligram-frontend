import React from 'react';

import { TagState } from 'Modules/Tags/tags.types';
import { Button, FadeInOut, Frame, Hr, Input, Select, SelectValue, Span, Switch } from 'Vendor/components';
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
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!titleError} speed="fast">
      <Span className="BookmarkUpdateForm-error" size="small">
        {titleError}
      </Span>
    </FadeInOut>
    <Hr spacer />
    <Frame padding="none" grow>
      <Select
        className="BookmarkUpdateForm-tags"
        label="Select tags"
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
    </Frame>
    <Hr spacer />
    <Span size="small" className="BookmarkUpdateForm-private">
      Is Private
    </Span>
    <Hr size="micro" spacer />
    <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
    <Hr spacer />
    <Hr size="big" spacer />
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
      <Span className="BookmarkUpdateForm-error" size="small">
        {submitError}
      </Span>
    </FadeInOut>
  </form>
);
