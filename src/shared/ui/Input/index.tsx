import React from 'react';

import { Loupe } from '../Svg';

import './Input.less';

interface Props {
  name: string;
  value?: string | number;
  label?: string;
  className?: string;
  autoComplete?: boolean;
  spellCheck?: boolean;
  readOnly?: boolean;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  grow?: boolean;
  type?: 'date' | 'search' | 'input';
  pattern?: string;
  onChange?: (e) => void;
  onKeyDown?: (e) => void;
  onKeyPress?: (e) => void;
  onFocus?: (e) => void;
  onClick?: (e) => void;
  onBlur?: (e) => void;
}

const Input: React.FC<Props> = ({
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
  onChange,
  onKeyDown,
  onKeyPress,
  onFocus,
  onClick,
  onBlur,
  pattern,
  type,
}) => {
  const isSearch = type === 'search';

  return (
    <div
      className={
        'Input ' +
        (className ? className : '') +
        (error ? ' Input--error' : '') +
        (success ? ' Input--success' : '') +
        (disabled ? ' Input--disabled' : '') +
        (readOnly ? ' Input--readOnly' : '') +
        (grow ? ' Input--grow' : '')
      }
    >
      <input
        name={name}
        className="Input-input"
        id={'Input-' + name}
        value={value}
        placeholder=" "
        autoComplete={autoComplete ? 'on' : 'off'}
        required
        spellCheck={spellCheck ? 'true' : 'false'}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        type={type}
        pattern={pattern}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onClick={onClick}
        onBlur={onBlur}
        results={2}
      />
      {label && (
        <label className="Input-label" htmlFor={'Input-' + name}>
          {label}
        </label>
      )}
      {isSearch && (
        <div className="Input-svgBackground" onClick={onClick}>
          <Loupe className="Input-svg" size="normal" />
        </div>
      )}
    </div>
  );
};

export default Input;
