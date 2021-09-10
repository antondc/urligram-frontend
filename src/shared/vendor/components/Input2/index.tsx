import React, { HTMLProps } from 'react';

import { Space } from '..';

import './Input2.less';

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'autoComplete'> {
  name: string;
  placeholder?: string;
  value?: string | number;
  label?: string;
  className?: string;
  autoComplete?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean;
  error?: boolean | string;
  success?: boolean;
  disabled?: boolean;
  grow?: boolean;
  type?: 'text' | 'date' | 'input' | 'password' | 'email' | 'number' | 'tel' | 'url';
  pattern?: string;
  autoFocus?: boolean;
}

export const Input2: React.FC<Props> = ({
  name,
  value = '',
  label,
  className,
  autoComplete = false,
  spellCheck = false,
  readOnly = false,
  error,
  success,
  disabled,
  grow,
  autoFocus,
  pattern,
  type,
  placeholder = '',
  ...props
}) => (
  <div
    className={
      'Input2 ' +
      (className ? className : '') +
      (!!error ? ' Input2--error' : '') +
      (success ? ' Input2--success' : '') +
      (disabled ? ' Input2--disabled' : '') +
      (readOnly ? ' Input2--readOnly' : '') +
      (grow ? ' Input2--grow' : '')
    }
  >
    {label && (
      <label className="Input2-label" htmlFor={'Input2-' + name}>
        {label}
      </label>
    )}
    <input
      name={name}
      className="Input2-input"
      id={'Input2-' + name}
      value={value}
      placeholder={placeholder}
      size={1} // Fix for Firefox. Input2 width changes with font-size size https://stackoverflow.com/questions/49284045/why-does-font-size-increase-an-inputs-width
      autoComplete={autoComplete ? 'on' : 'off'}
      required
      spellCheck={spellCheck ? 'true' : 'false'}
      disabled={disabled}
      readOnly={readOnly}
      type={type}
      pattern={pattern}
      autoFocus={autoFocus}
      results={2}
      {...props}
    />
    <div className="Input2-errorContent">
      {error}
      {/* Space to force height when there is no error present */}
      <Space />
    </div>
  </div>
);
