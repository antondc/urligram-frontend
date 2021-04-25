import React, { useState } from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Range } from '.';

export default {
  component: Range,
  title: 'Range',
  decorators: [withKnobs],
};

const knobs = {
  name: (): string => text('Name', 'name'),
  value: (): string => text('Value', 'Some value'),
  placeholder: (): string => text('Placeholder', 'placeholder'),
  label: (): string => text('Label', 'label'),
  readOnly: (): boolean => boolean('Read only', false),
  error: (): boolean => boolean('Error', false),
  success: (): boolean => boolean('Success', false),
  disabled: (): boolean => boolean('Disabled', false),
  grow: (): boolean => boolean('Grow', false),
};

export const Empty: React.FC = () => {
  const [value1, setValue1] = useState('');

  return (
    <div>
      <H1>Range</H1>
      <Hr spacer />
      <Range
        name="My Range"
        label="This is my range"
        value={value1}
        onChange={(e): void => setValue1(e.target.value)}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        min={0}
        max={100}
      />
      <Hr spacer />
    </div>
  );
};
