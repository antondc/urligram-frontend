import React from 'react';
import Dropzone from 'react-dropzone';

import { Loader } from '../Loader';
import { Cross, Upload } from '../Svg';

import './ImageField.less';

export type FileType = '.jpg,.jpeg,.png' | 'image/*' | '.jpg,.jpeg' | '.png' | '.pdf' | 'video/*' | 'audio/*';

export interface Props {
  className: string;
  name: string;
  label: string;
  image: string;
  grow: boolean;
  percentCompleted: number;
  removable: boolean;
  accept: FileType;
  maxSize: number;
  error: boolean;
  success: boolean;
  disabled: boolean;
  rounded: boolean;
  onDropAccepted: (acceptedFiles: File[]) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (e: React.MouseEvent) => void;
}

export const ImageField: React.FC<Props> = ({
  className,
  image,
  grow,
  rounded,
  name,
  removable,
  accept,
  maxSize,
  percentCompleted,
  error,
  success,
  disabled,
  onDropAccepted,
  onChange,
  onFileRemove,
}) => {
  const fileName = image && image.split('/').pop();
  const hasImage = !!image;
  const loading = percentCompleted > 0 && percentCompleted < 100;

  return (
    <div
      className={
        'ImageField ' +
        (className ? className : ' ') +
        (grow ? ' ImageField--grow' : '') +
        (rounded ? ' ImageField--rounded' : '') +
        (image ? ' ImageField--uploaded' : '') +
        (error ? ' ImageField--error' : '') +
        (success ? ' ImageField--success' : '') +
        (disabled || loading ? ' ImageField--disabled' : '') +
        (hasImage ? ' ImageField--hasImage' : '')
      }
    >
      {hasImage && <img className="ImageField-image" src={image} alt={fileName} title={fileName} />}
      <div className={'ImageField-progress ' + (percentCompleted > 0 ? 'ImageField--loading' : '')}>
        <Loader loaded={percentCompleted} grow />
      </div>
      <Dropzone
        multiple={false}
        accept={accept}
        maxSize={maxSize}
        onDropAccepted={onDropAccepted}
        disabled={disabled || loading}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} onChange={onChange} name={name} type="file" />

            {!loading && <div className="ImageField-overlay" />}
          </div>
        )}
      </Dropzone>
      {!loading && <Upload className="ImageField-icon ImageField-upload" size="big" />}
      {removable && <Cross className="ImageField-icon ImageField-remove" size="small" onClick={onFileRemove} />}
    </div>
  );
};
