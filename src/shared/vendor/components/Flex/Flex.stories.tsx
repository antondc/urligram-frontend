import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { Flex, FlexHorizontal, FlexVertical } from '.';

export default {
  component: Flex,
  title: 'Flex',
  decorators: [withKnobs],
};

const knobs = {
  type1: (): FlexHorizontal =>
    select('Horizontal wrapper', [undefined, 'center', 'left', 'right', 'even', 'around', 'between'], 'around'),
  type2: (): FlexVertical => select('vertical wrapper', [undefined, 'center', 'top', 'bottom'], 'center'),
  type3: (): FlexHorizontal =>
    select('Horizontal children', [undefined, 'center', 'left', 'right', 'even', 'around', 'between'], 'around'),
  type4: (): FlexVertical => select('vertical children', [undefined, 'center', 'top', 'bottom'], 'center'),
};

export const Default: React.FC = () => (
  <div style={{ width: '300px', height: '200px', background: 'black', padding: '5px' }}>
    <Flex horizontal={knobs.type1()} vertical={knobs.type2()}>
      <div style={{ width: '200px', height: '150px', background: 'white', padding: '5px' }}>
        <Flex horizontal={knobs.type3()} vertical={knobs.type4()}>
          <div style={{ width: '20px', height: '20px', background: 'black' }} />
          <div style={{ width: '20px', height: '20px', background: 'black' }} />
          <div style={{ width: '20px', height: '20px', background: 'black' }} />
        </Flex>
      </div>
    </Flex>
  </div>
);
