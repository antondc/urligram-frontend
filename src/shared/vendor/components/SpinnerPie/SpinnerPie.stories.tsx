import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { SpinnerPie, SpinnerPieSize } from '.';

export default {
  component: SpinnerPie,
  title: 'SpinnerPie',
  decorators: [withKnobs],
};

const knobs = {
  size: (): SpinnerPieSize =>
    select('Size', [undefined, 'nano', 'micro', 'small', 'normal', 'medium', 'big', 'biggest', 'huge'], undefined),
};
export const Default: React.FC = () => <SpinnerPie size={knobs.size()} />;
