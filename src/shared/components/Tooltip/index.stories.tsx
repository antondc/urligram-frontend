import React from 'react';

import { Border, Hr } from '@antoniodcorrea/components';
import { Tooltip } from '.';

export default {
  component: Tooltip,
  title: 'BookmarkRow',
};

export const Default: React.ReactNode = () => (
  <div style={{ padding: '30px' }}>
    <Border id="element1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa asperiores quasi hic exercitationem officia
      harum, excepturi quidem commodi id accusantium voluptates, quas porro rem? Incidunt architecto numquam praesentium
      esse.
    </Border>
    <Tooltip content="Ceci n’est pas une pipe" parentElementId="element1" />
    <Hr size="big" spacer />
    <Border id="element2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa asperiores quasi hic exercitationem officia
      harum, excepturi quidem commodi id accusantium voluptates, quas porro rem? Incidunt architecto numquam praesentium
      esse.
    </Border>
    <Tooltip content="Ceci n’est pas une pipe" parentElementId="element2" />
  </div>
);
