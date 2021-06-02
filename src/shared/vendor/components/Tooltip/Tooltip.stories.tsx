import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { Frame } from '../Frame';
import { Hr } from '../Hr';
import { Tooltip } from '.';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [withKnobs],
};
const knobs = {
  placement: (): 'top' | 'bottom' | 'right' | 'left' =>
    select('Placement', ['top', 'bottom', 'right', 'left'], undefined),
};

export const Default: React.FC = () => (
  <div style={{ padding: '200px', border: '1px solid' }}>
    <Frame id="MyElement1">
      <span>Element with tooltip delayed</span>
    </Frame>

    <Tooltip
      placement={knobs.placement()}
      parentElementId="MyElement1"
      content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, rem. Quo eos error non totam sint obcaecati voluptatibus possimus eaque fuga esse minus provident, eligendi aliquam unde quisquam laborum reiciendis."
    />
    <Hr spacer />
    <Frame id="MyElement2">
      <span>Element with tooltip not delayed</span>
    </Frame>

    <Tooltip
      placement={knobs.placement()}
      delay={0}
      parentElementId="MyElement2"
      content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, rem. Quo eos error non totam sint obcaecati voluptatibus possimus eaque fuga esse minus provident, eligendi aliquam unde quisquam laborum reiciendis."
    />
  </div>
);
