import React from 'react';

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { Span } from '../Span';
import { Frame } from '.';

export default {
  component: Frame,
  title: 'Frame',
  decorators: [withKnobs],
};

const knobs = {
  weight: (): 'thin' | 'thick' => select('Frame', ['thin', 'thick'], 'thin'),
  padding: (): 'small' | 'normal' | 'big' => select('Padding', ['small', 'normal', 'big'], 'normal'),
  text: (): string => text('Text', 'Lorem ipsum dolor'),
  grow: (): boolean => boolean('Grow', false),
};

export const Default: React.FC = () => (
  <div style={{ width: '300px' }}>
    <Frame grow={knobs.grow()} weight={knobs.weight()} padding={knobs.padding()}>
      <Span weight="semiBold">{knobs.text()}</Span>
    </Frame>
  </div>
);
