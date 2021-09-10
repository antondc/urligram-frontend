import React, { HTMLProps } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import uniqueId from 'lodash/uniqueId';

import './TextArea.less';

interface Props extends HTMLProps<HTMLTextAreaElement> {
  name: string;
  value?: string;
  label?: string;
  className?: string;
  spellCheck?: boolean;
  readOnly?: boolean;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  grow?: boolean;
  maxLength?: number;
  onChange?: (e) => void;
}

export const TextArea: React.FC<Props> = ({
  name,
  value = '',
  label,
  className,
  spellCheck = false,
  readOnly = false,
  error,
  success,
  disabled,
  grow,
  onChange,
  maxLength,
}) => {
  const id = uniqueId();

  return (
    <div
      className={
        'TextArea ' +
        (className ? className : '') +
        (error ? ' TextArea--error' : '') +
        (success ? ' TextArea--success' : '') +
        (disabled ? ' TextArea--disabled' : '') +
        (readOnly ? ' TextArea--readOnly' : '') +
        (grow ? ' TextArea--grow' : '')
      }
    >
      {label && (
        <label className="TextArea-label" htmlFor={'Input-' + id}>
          {label}
        </label>
      )}
      <TextareaAutosize
        id={'Input-' + id}
        name={name}
        className="TextArea-textArea"
        value={value}
        onChange={onChange}
        placeholder=" "
        spellCheck={spellCheck}
        maxLength={maxLength}
      />
    </div>
  );
};
