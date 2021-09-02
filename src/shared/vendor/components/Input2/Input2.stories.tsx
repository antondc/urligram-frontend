import React, { useState } from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Input2 } from '.';

export default {
  component: Input2,
  title: 'Input2',
  decorators: [withKnobs],
};

const knobs = {
  name: (): string => text('Field Name', 'name'),
  value: (): string => text('Value', 'Some value'),
  placeholder: (): string => text('Placeholder', 'placeholder'),
  label: (): string => text('Label', 'label'),
  readOnly: (): boolean => boolean('Read only', false),
  errorText: (): string => text('Error Text', undefined),
  errorBoolean: (): boolean => boolean('Error Boolean', false),
  success: (): boolean => boolean('Success', false),
  disabled: (): boolean => boolean('Disabled', false),
  grow: (): boolean => boolean('Grow', true),
};

export const Empty: React.FC = () => {
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  return (
    <div style={{ width: '500px' }}>
      <Input2
        name="name_example"
        label="Name"
        placeholder="Enter a name"
        value={value2}
        readOnly={knobs.readOnly()}
        error={knobs.errorText() || knobs.errorBoolean()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        onChange={(e): void => setValue2(e.currentTarget.value)}
      />
      <Input2
        name="password_example"
        label="Password"
        placeholder="Enter a password"
        type="password"
        value={value3}
        readOnly={knobs.readOnly()}
        error={knobs.errorText() || knobs.errorBoolean()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        onChange={(e): void => setValue3(e.currentTarget.value)}
      />
      <Input2
        name="name_example"
        label="Name"
        placeholder="Enter a date"
        type="date"
        value={value4}
        readOnly={knobs.readOnly()}
        error={knobs.errorText() || knobs.errorBoolean()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={false}
        onChange={(e): void => setValue4(e.currentTarget.value)}
      />
    </div>
  );
};
