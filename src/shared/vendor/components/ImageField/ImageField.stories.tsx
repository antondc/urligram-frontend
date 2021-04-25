import React, { useState } from 'react';

import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { WithUploadLogic } from '../WithUploadLogic/WithUploadLogic';
import { ImageField } from '.';

export default {
  component: ImageField,
  title: 'ImageField',
  decorators: [withKnobs],
};

const knobs = {
  grow: (): boolean => boolean('Grow', false),
  error: (): boolean => boolean('Error', false),
  success: (): boolean => boolean('Success', false),
  rounded: (): boolean => boolean('Rounded', false),
  disabled: (): boolean => boolean('Disabled', false),
  maxLength: (): number => number('Max length', undefined),
  url: (): string => text('Url', 'https://i.picsum.photos/id/1067/1500/1000.jpg'),
};

export const Default: React.FC = () => {
  const [value, setValue] = useState(undefined);
  const ImageFieldWithUploadApi = WithUploadLogic(ImageField);

  return (
    <>
      <H1>Image field</H1>
      <Hr spacer size="big" />
      <ImageFieldWithUploadApi
        label="My file"
        name="Some file"
        maxLength={knobs.maxLength()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        rounded={knobs.rounded()}
        urlApiUpload="http://0.0.0.0:3000/api/v1/upload"
        url={value}
        onUploaded={(url): void => setValue(url)}
        onRemove={(): void => setValue(undefined)}
      />
    </>
  );
};
