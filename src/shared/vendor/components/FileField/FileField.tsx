import React from 'react';
import Dropzone from 'react-dropzone';

import { A } from '../A';
import { Hr } from '../Hr';
import { Loader } from '../Loader';
import { Span } from '../Span';
import { Cross, Upload } from '../Svg';

import './FileField.less';

export interface Props {
  name?: string;
  label?: string;
  fileUrl?: string;
  buttonText?: string;
  className?: string;
  grow?: boolean;
  rounded?: boolean;
  maxSize: number;
  percentCompleted?: number;
  removable?: boolean;
  accept?: string;
  size?: string;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  buttonTextToRender: string;
  truncatedFilename: string;
  onDropAccepted: (acceptedFiles: File[]) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (e: React.MouseEvent) => void;
}

export const FileField: React.FC<Props> = ({
  className,
  fileUrl,
  grow,
  label,
  name,
  accept,
  removable = true,
  maxSize,
  percentCompleted,
  error,
  success,
  disabled,
  buttonTextToRender,
  truncatedFilename,
  onDropAccepted,
  onChange,
  onFileRemove,
}) => {
  const loading = percentCompleted > 0 && percentCompleted < 100;

  return (
    <div
      className={
        'FileField ' +
        (className ? className : '') +
        (grow ? ' FileField--grow' : '') +
        (removable ? ' FileField--removable' : '') +
        (fileUrl ? ' FileField--uploaded' : '') +
        (error ? ' FileField--error' : '') +
        (success ? ' FileField--success' : '') +
        (disabled ? ' FileField--disabled' : '')
      }
    >
      {label && (
        <label className="FileField-label">
          <Span bold>{label}</Span>
        </label>
      )}
      <Hr spacer size="micro" />
      <Dropzone
        multiple={false}
        accept={accept}
        maxSize={maxSize}
        onDropAccepted={onDropAccepted}
        disabled={disabled || loading}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="FileField-dropzone">
            <input {...getInputProps()} onChange={onChange} name={name} type="file" />
            <Upload className="FileField-textIcon" size="small" />
            <Span bold uppercase>
              {buttonTextToRender}
            </Span>
            <div className={'FileField-progress ' + (percentCompleted > 0 ? 'FileField--loading' : '')}>
              <Loader loaded={percentCompleted} grow />
            </div>
          </div>
        )}
      </Dropzone>
      {fileUrl && (
        <div className="FileField-file">
          <Span bold className="FileField-name">
            {fileUrl && (
              <A href={fileUrl} title={fileUrl} targetBlank styled={false}>
                {truncatedFilename}
              </A>
            )}
          </Span>
          {removable && fileUrl && <Cross className="FileField-remove" size="small" onClick={onFileRemove} />}
        </div>
      )}
    </div>
  );
};
