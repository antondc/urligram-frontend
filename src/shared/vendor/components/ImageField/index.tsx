import React from 'react';

import { FileType, ImageField as ImageFieldUi } from './ImageField';

export interface Props {
  name?: string;
  className?: string;
  image: string;
  grow?: boolean;
  rounded?: boolean;
  label?: string;
  removable?: boolean;
  accept?: FileType;
  percentCompleted: number;
  disabled?: boolean;
  maxSize?: number;
  error?: boolean;
  success?: boolean;
  uploadFiles: (file: File) => void;
  onRemove?: (url: string) => void;
}

export const ImageField: React.FC<Props> = ({
  className,
  grow,
  rounded,
  label,
  image,
  name,
  accept,
  removable = false,
  maxSize,
  disabled,
  error,
  success,
  percentCompleted,
  uploadFiles,
  onRemove,
}) => {
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

    onRemove(image);
  };

  return (
    <ImageFieldUi
      className={className}
      grow={grow}
      image={image}
      label={label}
      name={name}
      accept={accept}
      maxSize={maxSize}
      removable={removable}
      percentCompleted={percentCompleted}
      rounded={rounded}
      disabled={disabled}
      error={error}
      success={success}
      onDropAccepted={onDropAccepted}
      onChange={onChange}
      onFileRemove={onFileRemove}
    />
  );
};
