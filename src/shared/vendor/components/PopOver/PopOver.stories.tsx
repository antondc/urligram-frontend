import React from 'react';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import { Border } from '../Border';
import { Fade } from '../Fade';
import { Hr } from '../Hr';
import { PopOver } from '.';

export default {
  component: PopOver,
  title: 'PopOver',
  decorators: [withKnobs],
};

const knobs = {
  mounted: (): boolean => boolean('Mounted', true),
};

export const Default: React.FC = () => (
  <div style={{ width: '300px' }}>
    <Border>
      d 7e 3c 5f b9 5c 16 3f 48 a1 76 c9 f8 2f a5 f5 cf aa c1 93 55 c1 a4 08 2c 4e 22 1e c0 38 57 c5 6f f5 e6 a4 65 56
      2b 2b 5f 2e d1 e5 3a 96 fc 37 bc cf c1 ba 99 b3 4b f8 1d 77 4a 43 4a 37 6c 59 03 2f a7 c2 9c 0f b1 ef 27 ea 7d 7f
      9e 66 ba 0
    </Border>
    <Hr spacer />
    <Border id="MyElement">
      0c 72 a8 1a eb 2b e8 31 68 fe ee dc d3 cd 005 ce 74 97 69 01 26 83 a8 78 9c 17 55 a0 fa 6a f5 31 e7 86 8b 5a b3 30
      ff 30 e1 a1 51 39 d7 44 0e f6 c1 95 72 23 e9 3c 13 69 ad 38 5b b5 64 66 a1 94
    </Border>
    <Hr spacer />
    <Border>
      9d 15 53 98 53 50 c7 21 2f ca 74 2d 3e 2b 90 1d 3e de 94 14 54 17 5b ce 06 ff f2 ea ff 0e b5 8d 5d 20 0b 7f 40 ca
      64 8c e1 58 4d 13 50 1b 65 ce 74 97 69 2d 0e a4 a3 3a 60 44 1f 6e
    </Border>
    <Hr spacer />
    <Border>
      a2 ca ef 23 2f 8d 51 df 6a 8a af 71 c3 1c 74 ef 27 2d 1c e9 c4 a3 ef 82 38 7b 64 1e a5 bd f9 ac 46 ea b6 40 5a 44
      9c 9d 90 a1 c4 a4 28 cace 47 c4 ea 5e 1b e3 ba 7b ba 97 76 8b ce c8 1e 2f 5f 03 01 9b b6 b4 aa 62 a7 36 51 e0 52
      8d 2d 01 57 8b c9 7f fe 6a 67 35 bb a3
    </Border>
    <Hr spacer />

    <Fade mounted={knobs.mounted()}>
      <PopOver elementId="MyElement" placement="right-start">
        <Border padding="big">
          <ul style={{ maxHeight: '200px', overflowY: 'scroll', padding: '10px' }}>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
            <li>Six</li>
            <li>Seven</li>
            <li>Nine</li>
            <li>Ten</li>
            <li>Eleven</li>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
            <li>Six</li>
            <li>Seven</li>
            <li>Nine</li>
            <li>Ten</li>
            <li>Eleven</li>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <li>Four</li>
            <li>Five</li>
            <li>Six</li>
            <li>Seven</li>
            <li>Nine</li>
            <li>Ten</li>
            <li>Eleven</li>
          </ul>
        </Border>
      </PopOver>
    </Fade>
  </div>
);
