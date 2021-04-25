import React from 'react';

import { TagState } from 'Modules/Tags/tags.types';
import {
  ArrowRight,
  Button,
  Fade,
  FadeInOut,
  Flex,
  Hr,
  Input,
  Select,
  SelectValue,
  Span,
  SpinnerCircle,
  Switch,
} from 'Vendor/components';
import { TagValue } from '.';

import './BookmarkCreateForm.less';

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
  isPrivateError,
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
  <form className="BookmarkCreateForm" onSubmit={onSubmit}>
    <Flex growVertical={false} horizontal="left" vertical="bottom" noWrap>
      <Input
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
      <Fade mounted={urlValue && !urlError && !urlSubmitted}>
        <ArrowRight className="BookmarkCreateForm-urlArrow" size="small" />
      </Fade>
    </Flex>
    <Hr size="nano" spacer />
    <FadeInOut valueToUpdate={!!urlError} speed="fast">
      <Span className="BookmarkCreateForm-error" size="small">
        {urlError}
      </Span>
    </FadeInOut>
    <Hr spacer />
    <FadeInOut valueToUpdate={urlSubmitted}>
      {urlSubmitted && (
        <>
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
            <Span className="BookmarkCreateForm-error" size="small">
              {titleError}
            </Span>
          </FadeInOut>
          <Hr spacer />
          <Select
            className="BookmarkCreateForm-tags"
            label="Select tags"
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
          <Hr spacer />
          <Span size="small" className="BookmarkCreateForm-private">
            Is Private
          </Span>
          <Hr size="micro" spacer />
          <Switch name="isPrivate" checked={isPrivateValue} onChange={onChangeIsPrivate} />
          <Hr size="nano" spacer />
          <FadeInOut valueToUpdate={!!isPrivateError} speed="fast">
            <Span className="BookmarkCreateForm-error" size="small">
              {isPrivateError}
            </Span>
          </FadeInOut>
          <Hr spacer />
          <Hr size="big" spacer />
          <Button
            text="Enter"
            type="submit"
            onClick={onSubmit}
            error={!!submitError}
            success={submitSuccess}
            disabled={submitDisabled}
            grow
          />
          <Hr size="nano" spacer />
          <FadeInOut valueToUpdate={!!submitError} speed="fast">
            <Span className="BookmarkCreateForm-error" size="small">
              {submitError}
            </Span>
          </FadeInOut>
        </>
      )}
    </FadeInOut>
    <Fade mounted={urlLoading || submitInProcess} position="absolute">
      <SpinnerCircle background />
    </Fade>
  </form>
);
