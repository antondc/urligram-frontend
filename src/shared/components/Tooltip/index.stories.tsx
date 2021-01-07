import React, { useRef } from 'react';

import { Border, Hr } from '@antoniodcorrea/components';
import { Tooltip } from '.';

export default {
  component: Tooltip,
  title: 'BookmarkRow',
};

export const Default: React.ReactNode = () => {
  const elementRef1 = useRef<HTMLDivElement>(null);
  const elementRef2 = useRef<HTMLDivElement>(null);

  return (
    <div style={{ padding: '30px' }}>
      <Border ref={elementRef1}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa asperiores quasi hic exercitationem officia
        harum, excepturi quidem commodi id accusantium voluptates, quas porro rem? Incidunt architecto numquam
        praesentium esse.
      </Border>
      <Tooltip content="Ceci n’est pas une pipe" parentRef={elementRef1} />
      <Hr size="big" spacer />
      <Border ref={elementRef2}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque culpa asperiores quasi hic exercitationem officia
        harum, excepturi quidem commodi id accusantium voluptates, quas porro rem? Incidunt architecto numquam
        praesentium esse.
      </Border>
      <Tooltip content="Ceci n’est pas une pipe" parentRef={elementRef2} />
    </div>
  );
};
