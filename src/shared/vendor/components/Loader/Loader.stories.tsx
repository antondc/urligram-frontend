import React from 'react';

import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Loader } from '.';

export default {
  component: Loader,
  title: 'Loader',
  decorators: [withKnobs],
};

const knobs = {
  loaded: (): number => number('Loaded', 20, { range: true, min: 0, max: 100, step: 1 }),
  error: (): boolean => boolean('Error', false),
  grow: (): boolean => boolean('Grow', false),
};

export const Default: React.FC = () => (
  <div>
    <H1>Loader</H1>
    <Hr spacer />
    <Hr size="micro" />
    <Hr spacer />
    <Hr spacer />
    <Loader loaded={knobs.loaded()} error={knobs.error()} grow={knobs.grow()} />
  </div>
);
