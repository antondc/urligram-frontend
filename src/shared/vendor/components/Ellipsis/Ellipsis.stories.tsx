import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { Ellipsis } from '.';

export default {
  title: 'Ellipsis',
  component: Ellipsis,
  decorators: [withKnobs],
};

const size = () => select('Size', [undefined, 'normal', 'small', 'micro', 'nano'], undefined);

export const Default: React.FC = () => <Ellipsis size={size()} />;
