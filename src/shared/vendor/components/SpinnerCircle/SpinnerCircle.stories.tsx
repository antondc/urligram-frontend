import React from 'react';

import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { Fade, FadeSpeed } from '../Fade';
import { Frame } from '../Frame';
import { Hr } from '../Hr';
import { Span } from '../Span';
import { Vote } from '../Vote';
import { SpinnerCircle, SpinnerCircleSize } from '.';

export default {
  component: SpinnerCircle,
  title: 'SpinnerCircle',
  decorators: [withKnobs],
};

const knobs = {
  mounted: (): boolean => boolean('Mounted', true),
  speed: (): FadeSpeed => select('Speed', [undefined, 'fastest', 'fast', 'normal', 'slow'], 'fast'),
  size: (): SpinnerCircleSize => select('Size', [undefined, 'nano', 'small', 'medium'], undefined),
};

export const Default: React.FC = () => (
  <>
    <Hr spacer />
    <div style={{ width: '300px', position: 'relative' }}>
      <Fade mounted={knobs.mounted()} speed={knobs.speed()} position="absolute">
        <SpinnerCircle size={knobs.size()} />
      </Fade>
      <Frame>
        <Span bold>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime eos necessitatibus fuga inventore eaque
          dolorum aliquam. Eius a consectetur ut, assumenda tenetur odio rem, molestiae in quos, excepturi nisi facere.
        </Span>
      </Frame>
    </div>
    <Hr spacer />
    <Hr spacer />
    <Vote changeVote={() => null} loading={knobs.mounted()} />
  </>
);
