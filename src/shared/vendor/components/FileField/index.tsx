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
  url?: string;
  textButton?: string;
  className?: string;
  file?: string;
  grow?: boolean;
  rounded?: boolean;
  percentCompleted?: number;
  removable?: boolean;
  accept?: any;
  size?: string;
  maxLength?: number;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  onDrop?: (acceptedFiles: File[]) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
}

export const FileField: React.FC<Props> = ({
  className,
  url,
  grow,
  label,
  textButton,
  name,
  accept,
  removable = true,
  percentCompleted,
  maxLength,
  error,
  success,
  disabled,
  onDrop,
  onChange,
  onRemove,
}) => {
  const textButtonToRender = textButton ? textButton : 'Upload file';
  const file = url && url.split('/').pop();
  const fileName = file && file.split('.').shift();
  const extension = url && url.split('.').pop();
  const shouldBeShortened = !maxLength || fileName.length <= maxLength;
  const truncatedFilename = shouldBeShortened ? file : fileName.substring(0, maxLength) + '[...].' + extension;

  return (
    <div
      className={
        'FileField ' +
        (className ? className : '') +
        (grow ? ' FileField--grow' : '') +
        (removable ? ' FileField--removable' : '') +
        (url ? ' FileField--uploaded' : '') +
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
        className="FileField-dropzone"
        name={name}
        multiple={false}
        accept={accept}
        onDrop={onDrop}
        onChange={onChange}
      >
        <Upload className="FileField-textIcon" size="small" />
        <Span bold uppercase>
          {textButtonToRender}
        </Span>
        <div className={'FileField-progress ' + (percentCompleted > 0 ? 'FileField--loading' : '')}>
          <Loader loaded={percentCompleted} grow />
        </div>
      </Dropzone>
      {url && (
        <div className="FileField-file">
          <Span bold className="FileField-name">
            {url && (
              <A href={url} title={file} targetBlank>
                {truncatedFilename}
              </A>
            )}
          </Span>
          {removable && url && <Cross className="FileField-remove" size="small" onClick={onRemove} />}
        </div>
      )}
    </div>
  );
};
