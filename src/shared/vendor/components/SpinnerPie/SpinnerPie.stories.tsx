import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { SpinnerPie } from '.';

export default {
  component: SpinnerPie,
  title: 'SpinnerPie',
  decorators: [withKnobs],
};

export const Default: React.FC = () => <SpinnerPie />;
