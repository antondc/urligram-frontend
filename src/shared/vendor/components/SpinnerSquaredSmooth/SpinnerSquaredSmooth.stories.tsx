import React from 'react';

import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { Fade } from '../Fade';
import { Frame } from '../Frame';
import { Span } from '../Span';
import { SpinnerSquaredSmooth, SpinnerSquaredSmoothSize, SpinnerSquaredSmoothSpeed } from '.';

export default {
  component: SpinnerSquaredSmooth,
  title: 'SpinnerSquaredSmooth',
  decorators: [withKnobs],
};

const knobs = {
  mounted: (): boolean => boolean('Mounted', true),
  speed: (): SpinnerSquaredSmoothSpeed => select('Speed', [undefined, 'fast', 'normal', 'slow'], 'fast'),
  size: (): SpinnerSquaredSmoothSize => select('Size', [undefined, 'nano', 'small', 'medium'], undefined),
};

export const Default: React.ReactNode = () => (
  <div>
    <div style={{ width: '300px', position: 'relative', left: '50px' }}>
      <Frame>
        <Fade mounted={knobs.mounted()} position="absolute">
          <SpinnerSquaredSmooth size={knobs.size()} speed="normal" />
        </Fade>
        <Span weight="semiBold">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eos necessitatibus fuga inventore eaque
          dolorum aliquam. Eius a consectetur ut, assumenda tenetur odio rem, molestiae in quos, excepturi nisi facere.
        </Span>
      </Frame>
    </div>
  </div>
);
