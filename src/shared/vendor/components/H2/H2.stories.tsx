import React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';
import { H2 } from '.';

export default {
  component: H2,
  title: 'H2',
  decorators: [withKnobs],
};

const knobs = {
  text: (): string => text('Text', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'),
};

export const Default: React.FC = () => <H2>{knobs.text()}</H2>;
