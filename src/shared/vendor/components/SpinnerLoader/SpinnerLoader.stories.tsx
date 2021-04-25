import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { Hr } from '../Hr';
import { SpinnerLoader, SpinnerLoaderSize } from '.';

export default {
  component: SpinnerLoader,
  title: 'SpinnerLoader',
  decorators: [withKnobs],
};

const knobs = {
  size: (): SpinnerLoaderSize =>
    select('Size', ['nano', 'micro', 'small', 'normal', 'medium', 'big', 'biggest', 'huge', undefined], 'big'),
};

export const Default: React.FC = () => (
  <>
    <Hr spacer />
    <div style={{ width: '300px', position: 'relative', background: 'tomato' }}>
      <SpinnerLoader size={knobs.size()} />
    </div>
  </>
);
