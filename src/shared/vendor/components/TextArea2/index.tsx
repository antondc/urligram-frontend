import React, { HTMLProps } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import uniqueId from 'lodash/uniqueId';

import './TextArea2.less';

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

export const TextArea2: React.FC<Props> = ({
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
        'TextArea2 ' +
        (className ? className : '') +
        (error ? ' TextArea2--error' : '') +
        (success ? ' TextArea2--success' : '') +
        (disabled ? ' TextArea2--disabled' : '') +
        (readOnly ? ' TextArea2--readOnly' : '') +
        (grow ? ' TextArea2--grow' : '')
      }
    >
      {label && (
        <label className="TextArea2-label" htmlFor={'Input-' + id}>
          {label}
        </label>
      )}
      <TextareaAutosize
        id={'Input-' + id}
        name={name}
        className="TextArea2-textArea"
        value={value}
        onChange={onChange}
        placeholder=" "
        spellCheck={spellCheck}
        maxLength={maxLength}
      />
    </div>
  );
};
