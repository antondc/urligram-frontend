import React, { useState } from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Button } from '../Button';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Input } from '.';

export default {
  component: Input,
  title: 'Input',
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
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [success, setSuccess] = useState(undefined);

  const onSubmit = (): void => {
    setSuccess(true);
  };

  return (
    <div onSubmit={onSubmit} style={{ padding: '10px' }}>
      <H1>Input</H1>
      <Hr spacer />

      <Hr spacer size="zero" />
      <Input
        type="date"
        name="date_example"
        label="My date"
        value={value4}
        readOnly={knobs.readOnly()}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        onChange={(e): void => setValue4(e.currentTarget.value)}
      />
      <Hr spacer size="zero" />
      <Input
        name="password_example"
        label="Insert password"
        value={value2}
        readOnly={knobs.readOnly()}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        onChange={(e): void => setValue2(e.currentTarget.value)}
      />
      <Hr spacer size="zero" />
      <Input
        name="repeat_password_example"
        label="Repeat password"
        value={value3}
        readOnly={knobs.readOnly()}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        onChange={(e): void => setValue3(e.currentTarget.value)}
      />
      <Hr spacer size="zero" />
      <Input
        type="search"
        name="search_example"
        label="Search"
        value={value1}
        readOnly={knobs.readOnly()}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow={knobs.grow()}
        onChange={(e): void => setValue1(e.currentTarget.value)}
      />
      <Hr spacer />
      <Button text="Submit" onClick={onSubmit} success={success} grow={knobs.grow()} />
    </div>
  );
};
