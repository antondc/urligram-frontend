import React from 'react';

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { Span, SpanWeight } from '.';

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
  weight: (): SpanWeight =>
    select('Weight', ['regular', 'medium', 'semiBold', 'bold', 'extraBold', undefined], undefined),
  disabled: (): boolean => boolean('Disabled', false),
};

export const Normal: React.FC = () => (
  <Span weight={knobs.weight()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);

export const Small: React.FC = () => (
  <Span size="small" weight={knobs.weight()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);

export const Micro: React.FC = () => (
  <Span size="micro" weight={knobs.weight()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);

export const Nano: React.FC = () => (
  <Span size="nano" weight={knobs.weight()} disabled={knobs.disabled()}>
    {knobs.text()}
  </Span>
);
