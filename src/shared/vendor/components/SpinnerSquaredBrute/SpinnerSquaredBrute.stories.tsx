import React from 'react';

import { storiesOf } from '@storybook/react';
import { SpinnerSquaredBrute } from '.';

export default {
  component: SpinnerSquaredBrute,
  title: 'SpinnerSquaredBrute',
};

storiesOf('SpinnerSquaredBrute', module).add('Default', () => <SpinnerSquaredBrute />);
