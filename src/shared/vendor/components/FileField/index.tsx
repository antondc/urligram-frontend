import React from 'react';

import { URLWrapper } from 'Services/URLWrapper';
import { FileField as FileFieldUi } from './FileField';

import './FileField.less';

export interface Props {
  name?: string;
  label?: string;
  fileUrl?: string;
  buttonText?: string;
  className?: string;
  grow?: boolean;
  rounded?: boolean;
  percentCompleted?: number;
  removable?: boolean;
  accept?: string;
  size?: string;
  maxLength?: number;
  maxSize?: number;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadFiles: (file: File) => void;
  onRemove?: (url: string) => void;
}

export const FileField: React.FC<Props> = ({
  className,
  fileUrl,
  grow,
  label,
  buttonText,
  name,
  accept,
  removable = true,
  percentCompleted,
  rounded,
  maxLength,
  maxSize,
  size,
  error,
  success,
  disabled,
  uploadFiles,
  onRemove,
}) => {
  const fileUrlWrapper = new URLWrapper(fileUrl);
  const filename = fileUrlWrapper.getFilename();
  const buttonTextToRender = buttonText ? buttonText : 'Upload file';
  const shouldBeShortened = !maxLength || filename.length <= maxLength;
  const extension = fileUrl && fileUrl.split('.').pop();
  const truncatedFilename = shouldBeShortened ? filename.substring(0, maxLength) + '[...].' + extension : filename;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files || !files.length) return;

    const file = files[0];

    uploadFilesToServer(file);
  };

  const onDropAccepted = (files: File[]) => {
    if (!files || !files.length) return;
    const file = files[0];

    uploadFilesToServer(file);
  };

  const uploadFilesToServer = async (file: File) => {
    await uploadFiles(file);
  };

  const onFileRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onRemove(fileUrl);
  };

  return (
    <FileFieldUi
      name={name}
      label={label}
      fileUrl={fileUrl}
      buttonText={buttonText}
      className={className}
      grow={grow}
      rounded={rounded}
      maxSize={maxSize}
      percentCompleted={percentCompleted}
      removable={removable}
      accept={accept}
      size={size}
      error={error}
      success={success}
      disabled={disabled}
      buttonTextToRender={buttonTextToRender}
      truncatedFilename={truncatedFilename}
      onDropAccepted={onDropAccepted}
      onChange={onChange}
      onFileRemove={onFileRemove}
    />
  );
};
