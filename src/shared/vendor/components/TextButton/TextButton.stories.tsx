import React from 'react';

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { TextButton, TextButtonIcon } from '.';

export default {
  component: TextButton,
  title: 'TextButton',
  decorators: [withKnobs],
};

const knobs = {
  text: (): string => text('TextButton', 'Click me!'),
  icon: (): TextButtonIcon => select('Icon', ['ArrowRight'], 'ArrowRight'),
  disabled: (): boolean => boolean('Disabled', false),
};

export const Default: React.FC = () => (
  <TextButton text={knobs.text()} icon={knobs.icon()} disabled={knobs.disabled()} />
);
