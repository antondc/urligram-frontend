import React, { useState } from 'react';

import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { WithUploadLogic } from '../WithUploadLogic/WithUploadLogic';
import { FileField } from '.';

export default {
  component: FileField,
  title: 'FileField',
  decorators: [withKnobs],
};

const knobs = {
  grow: (): boolean => boolean('Grow', false),
  error: (): boolean => boolean('Error', false),
  success: (): boolean => boolean('Success', false),
  disabled: (): boolean => boolean('Disabled', false),
  maxLength: (): number => number('Max length', undefined),
  removable: (): boolean => boolean('Removable', true),
  url: (): string => text('Url', 'https://antoniodiaz.me/cv/antonio_diaz_correa_cv.pdf'),
};

export const Default: React.FC = () => {
  const [value, setValue] = useState(undefined);

  return (
    <>
      <H1>File field</H1>
      <Hr spacer size="big" />
      <FileField
        label="My file"
        name="Some file"
        removable={knobs.removable()}
        maxLength={knobs.maxLength()}
        url={value}
        grow={knobs.grow()}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        onChange={(event): void => setValue(event.target.value)}
        onRemove={(): void => setValue(undefined)}
      />
    </>
  );
};

export const ExampleFileFieldWithUploadApi: React.FC = () => {
  const [value, setValue] = useState('Some value');
  const FileFieldWithUploadApi = WithUploadLogic(FileField);

  return (
    <>
      <H1>File field</H1>
      <Hr spacer size="big" />
      <FileFieldWithUploadApi
        label="My file"
        name="Some file"
        removable={knobs.removable()}
        maxLength={knobs.maxLength()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        url={value}
        urlApiUpload="http://0.0.0.0:3000/api/v1/upload"
        onUploaded={(url): void => setValue(url)}
        onRemove={(): void => setValue(undefined)}
      />
    </>
  );
};
