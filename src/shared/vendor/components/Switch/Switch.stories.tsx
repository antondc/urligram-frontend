import React, { useState } from 'react';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Frame } from '../Frame';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Span } from '../Span';
import { Switch } from '.';

export default {
  component: Switch,
  title: 'Switch',
  decorators: [withKnobs],
};

const knobs = {
  checked: (): boolean => boolean('Value', true),
};

export const Empty: React.FC = () => {
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(true);
  const [value3, setValue3] = useState(false);

  return (
    <>
      <H1>Switches</H1>
      <Hr spacer />
      <Frame>
        <Span bold>With default value</Span>
        <Hr spacer size="small" />
        <Switch name="Test" checked={knobs.checked()} />
        <Hr spacer size="small" />
        <Hr size="nano" />
        <Hr spacer />
        <Span bold>Other situations</Span>
        <Hr spacer size="small" />
        <Switch name="Test" checked={value1} onChange={(e): void => setValue1(e.currentTarget.checked)} />
        <Hr spacer size="small" />
        <Switch name="Test2" checked={value2} onChange={(e): void => setValue2(e.currentTarget.checked)} />
        <Hr spacer size="small" />
        <Switch name="Test3" checked={value3} onChange={(e): void => setValue3(e.currentTarget.checked)} />
        <Hr spacer size="small" />
      </Frame>
      <Hr spacer />
      <Hr size="micro" />
    </>
  );
};
