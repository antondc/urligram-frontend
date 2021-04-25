import React from 'react';

import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { Span } from '.';

export default {
  component: Span,
  title: 'Span',
  decorators: [withKnobs],
};

const knobs = {
  text: (): string =>
    text(
      'Span',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum aut tempore enim cum cupiditate nihil dolores quo aperiam sit id atque, vel eius? Ab doloribus dolore earum laboriosam incidunt eveniet? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum aut tempore enim cum cupiditate nihil dolores quo aperiam sit id atque, vel eius? Ab doloribus dolore earum laboriosam incidunt eveniet'
    ),
  bold: (): boolean => boolean('Bold', false),
  disabled: (): boolean => boolean('Disabled', false),
};

export const Normal: React.FC = () => (
  <Span bold={knobs.bold()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);

export const Small: React.FC = () => (
  <Span size="small" bold={knobs.bold()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);

export const Micro: React.FC = () => (
  <Span size="micro" bold={knobs.bold()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);

export const Nano: React.FC = () => (
  <Span size="nano" bold={knobs.bold()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);
