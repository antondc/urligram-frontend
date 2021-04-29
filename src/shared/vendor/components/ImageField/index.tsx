import React from 'react';
import Dropzone from 'react-dropzone';

import { Loader } from '../Loader';
import { Upload } from '../Svg';

import './ImageField.less';

export interface Props {
  name?: string;
  label?: string;
  url?: string;
  textButton?: string;
  className?: string;
  file?: string;
  grow?: boolean;
  percentCompleted?: number;
  accept?: string;
  size?: string;
  maxLength?: number;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  onDrop?: (acceptedFiles: File[]) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

export const ImageField: React.FC<Props> = ({
  className,
  url,
  grow,
  rounded,
  name,
  accept,
  percentCompleted,
  error,
  success,
  disabled,
  onDrop,
  onChange,
}) => {
  const fileName = url && url.split('/').pop();
  const hasImage = !!url;

  return (
    <div
      className={
        'ImageField ' +
        (className ? className : '') +
        (grow ? ' ImageField--grow' : '') +
        (rounded ? ' ImageField--rounded' : '') +
        (url ? ' ImageField--uploaded' : '') +
        (error ? ' ImageField--error' : '') +
        (success ? ' ImageField--success' : '') +
        (disabled ? ' ImageField--disabled' : '') +
        (hasImage ? ' ImageField--hasImage' : '')
      }
    >
      {hasImage && <img className="ImageField-image" src={url} alt={fileName} title={fileName} />}
      <div className={'ImageField-progress ' + (percentCompleted > 0 ? 'ImageField--loading' : '')}>
        <Loader loaded={percentCompleted} grow />
      </div>
      {hasImage && <div className={'ImageField-background'} />}
      <Dropzone
        className={'ImageField-upload'}
        name={name}
        multiple={false}
        accept={accept}
        onDrop={onDrop}
        onChange={onChange}
        disabled={disabled}
      >
        <Upload className="ImageField-icon" />
      </Dropzone>
    </div>
  );
};
