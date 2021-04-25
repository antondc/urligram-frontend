import React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { A } from '.';

export default {
  component: A,
  title: 'A',
  decorators: [withKnobs],
};

const knobs = {
  href: (): string => text('Href', 'http://example.com'),
  text: (): string => text('Text', 'The quick brown fox jumps over the lazy dog'),
  styled: (): boolean => boolean('Styled', true),
  targetBlank: (): boolean => boolean('Target', false),
  disabled: (): boolean => boolean('Disabled', false),
  underlined: (): boolean => boolean('Underlined', false),
};

export const Default: React.FC = () => (
  <A
    onClick={action('button-click')}
    targetBlank={knobs.targetBlank()}
    href={knobs.href()}
    styled={knobs.styled()}
    disabled={knobs.disabled()}
    underlined={knobs.underlined()}
  >
    {knobs.text()}
  </A>
);
