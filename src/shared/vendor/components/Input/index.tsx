import React, { HTMLProps } from 'react';

import { Space } from '..';

import './Input.less';

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

export const Input: React.FC<Props> = ({
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
      'Input ' +
      (className ? className : '') +
      (!!error ? ' Input--error' : '') +
      (success ? ' Input--success' : '') +
      (disabled ? ' Input--disabled' : '') +
      (readOnly ? ' Input--readOnly' : '') +
      (grow ? ' Input--grow' : '')
    }
  >
    {label && (
      <label className="Input-label" htmlFor={'Input-' + name}>
        {label}
      </label>
    )}
    <input
      name={name}
      className="Input-input"
      id={'Input-' + name}
      value={value}
      placeholder={placeholder}
      size={1} // Fix for Firefox. Input width changes with font-size size https://stackoverflow.com/questions/49284045/why-does-font-size-increase-an-inputs-width
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
    <div className="Input-errorContent">
      {error}
      {/* Space to force height when there is no error present */}
      <Space />
    </div>
  </div>
);
