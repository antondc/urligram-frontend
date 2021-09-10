import React, { useState } from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Input } from '../Input';
import { TextArea } from '.';

export default {
  component: TextArea,
  title: 'TextArea',
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

export const Empty: React.ReactNode = () => {
  const [value, setValue] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, ab est qui reiciendis, sint vero aperiam vel soluta, mollitia laboriosam voluptate rem sed odit architecto labore ut harum libero perferendis!'
  );
  const [value2, setValue2] = useState(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, ab est qui reiciendis, sint vero aperiam vel soluta, mollitia laboriosam voluptate rem sed odit architecto labore ut harum libero perferendis!'
  );

  return (
    <div>
      <H1>TextArea</H1>
      <Hr size="micro" />
      <Hr spacer size="big" />
      <TextArea
        name={knobs.name()}
        label="My textarea"
        value={value}
        readOnly={knobs.readOnly()}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow
        onChange={(e): void => setValue(e.currentTarget.value)}
      />
      <Hr spacer />
      <Hr size="zero" />
      <Input
        name={knobs.name()}
        label="My data"
        value={value2}
        readOnly={knobs.readOnly()}
        error={knobs.error()}
        success={knobs.success()}
        disabled={knobs.disabled()}
        grow
        onChange={(e): void => setValue2(e.currentTarget.value)}
      />
    </div>
  );
};
