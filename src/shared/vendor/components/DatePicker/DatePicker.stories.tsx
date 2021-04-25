import React, { useState } from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Span } from '../Span';
import { DatePicker } from '.';

export default {
  component: DatePicker,
  title: 'DatePicker',
  decorators: [withKnobs],
};

const knobs = {
  value: (): string => text('Value', 'Some value'),
  placeholder: (): string => text('Placeholder', 'placeholder'),
  label: (): string => text('Label', 'label'),
  readOnly: (): boolean => boolean('Read only', false),
  inline: (): boolean => boolean('Inline', false),
  error: (): boolean => boolean('Error', false),
  success: (): boolean => boolean('Success', false),
  disabled: (): boolean => boolean('Disabled', false),
  grow: (): boolean => boolean('Grow', false),
};

export const Empty: React.FC = () => {
  const [value1, setValue1] = useState(new Date());

  return (
    <>
      <H1>DatePicker</H1>
      <Hr spacer size="big" />
      <Span>Value: {JSON.stringify(value1)}</Span>
      <Hr spacer size="zero" />
      <DatePicker
        name="Date"
        label="Date"
        inline={knobs.inline()}
        value={value1}
        onChange={(date): void => setValue1(date)}
      />
    </>
  );
};
