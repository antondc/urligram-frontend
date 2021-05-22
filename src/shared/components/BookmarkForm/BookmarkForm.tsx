import React from 'react';

import { TagState } from 'Modules/Tags/tags.types';
import {
  ArrowRight,
  Button,
  FadeInOut,
  Flex,
  Hr,
  Input,
  Select,
  SelectValue,
  Span,
  SpinnerLoader,
  Switch,
} from 'Vendor/components';
import { TagValue } from '.';

import './BookmarkForm.less';

interface Props {
  titleValue: string;
  titleError: string;
  onChangeTitle: (e: React.FormEvent<HTMLInputElement>) => void;
  isPrivateValue: boolean;
  isPrivateError: string;
  onChangeIsPrivate: (e: React.FormEvent<HTMLInputElement>) => void;
  urlSubmitted: boolean;
  urlLoading: boolean;
  urlValue: string;
  urlError: string;
  onChangeUrl: (e: React.FormEvent<HTMLInputElement>) => void;
  // onBlurUrl: (e: React.FormEvent<HTMLInputElement>) => void;
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

export const BookmarkForm: React.FC<Props> = ({
  titleValue,
  titleError,
  onChangeTitle,
  isPrivateValue,
  isPrivateError,
  onChangeIsPrivate,
  urlSubmitted,
  urlLoading,
  urlValue,
  urlError,
  // onBlurUrl,
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
  <form className="BookmarkForm" onSubmit={onSubmit}>
    <Flex growVertical={false} horizontal="left" vertical="baseline" noWrap>
      <Input
        name="url"
        type="text"
        label="Url"
        onChange={onChangeUrl}
        // onBlur={onBlurUrl}
        value={urlValue}
        error={urlError}
        grow
        autoFocus
      />
      <FadeInOut valueToUpdate={urlValue && !urlError && !urlSubmitted && urlLoading} speed="fast">
        {urlValue && !urlError && !urlSubmitted && !urlLoading && (
          <ArrowRight className="BookmarkForm-urlArrow" size="small" />
        )}
        {urlLoading && <SpinnerLoader className="BookmarkForm-loader" />}
      </FadeInOut>
    </Flex>
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!urlError} speed="fast">
      <Span className="BookmarkForm-error" size="small">
        {urlError}
      </Span>
    </FadeInOut>
    <Hr spacer />
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
      <Span className="BookmarkForm-error" size="small">
        {titleError}
      </Span>
    </FadeInOut>
    <Hr spacer />
    <Select
      className="BookmarkForm-tags"
      label="Select tags"
      value={tagsValue}
      defaultOptions={[]}
      options={[...tagsSearchFormatted, ...allTags?.map((item) => ({ label: item.name, value: item.name }))].filter(
        (v, i, a) => a.findIndex((t) => t.value === v.value) === i
      )}
      onInputChange={onChangeTagsInput}
      onChange={onChangeTags}
      maxItems={4}
      grow
      isCreatable
    />
    <Hr spacer />
    <Span size="small" className="BookmarkForm-private">
      Is Private
    </Span>
    <Hr size="micro" spacer />
    <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!isPrivateError} speed="fast">
      <Span className="BookmarkForm-error" size="small">
        {isPrivateError}
      </Span>
    </FadeInOut>
    <Hr spacer />
    <Hr size="big" spacer />
    <Button
      text="Save"
      type="submit"
      onClick={onSubmit}
      error={!!submitError}
      success={submitSuccess}
      disabled={submitDisabled}
      loading={urlLoading || submitInProcess}
      grow
    />
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!submitError} speed="fast">
      <Span className="BookmarkForm-error" size="small">
        {submitError}
      </Span>
    </FadeInOut>
  </form>
);
