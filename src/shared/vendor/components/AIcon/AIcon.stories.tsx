import React from 'react';

import { select, text, withKnobs } from '@storybook/addon-knobs';
import { AIcon, Size } from '.';

export default {
  component: AIcon,
  title: 'AIcon',
  decorators: [withKnobs],
};

const knobs = {
  text: (): string => text('Text', 'The quick brown fox jumps over the lazy dog'),
  size: (): Size => select('Size', ['small', 'normal'], 'normal'),
};

export const Default: React.FC = () => <AIcon size={knobs.size()}>{knobs.text()}</AIcon>;
