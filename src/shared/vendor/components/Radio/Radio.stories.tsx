import React, { useState } from 'react';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Border } from '../Border';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Radio } from '.';

export default {
  component: Radio,
  title: 'Radio',
  decorators: [withKnobs],
};

const knobs = {
  grow: (): boolean => boolean('Grow', false),
  inline: (): boolean => boolean('Inline', false),
};

export const Empty: React.FC = () => {
  const [value, setValue] = useState('2');

  return (
    <>
      <H1>Radio button</H1>
      <Hr spacer size="micro" />
      <Hr size="micro" />
      <Hr spacer />
      <Border>
        <Radio
          value={value}
          name="gender"
          options={[
            {
              value: '1',
              label: 'Option 1',
            },
            {
              value: '2',
              label: 'Option 2',
            },
            {
              value: '3',
              label: 'Option 3',
            },
          ]}
          onChange={(e): void => {
            setValue(e.currentTarget.value);
          }}
          grow={knobs.grow()}
          inline={knobs.inline()}
        />
      </Border>
    </>
  );
};
