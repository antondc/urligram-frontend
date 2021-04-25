import React from 'react';

import { Hr } from '../Hr';
import { SkeletonItem } from '.';

export default {
  component: SkeletonItem,
  title: 'SkeletonItem',
};

export const Default: React.FC = () => (
  <div style={{ width: '100px', border: '1px solid', padding: '10px', borderRadius: '2px' }}>
    <SkeletonItem className="Classname" /> <SkeletonItem className="Classname" /> <SkeletonItem className="Classname" />
    <Hr spacer size="small" />
    <SkeletonItem className="Classname" hollow /> <SkeletonItem className="Classname" hollow />{' '}
    <SkeletonItem className="Classname" hollow />
    <Hr spacer size="small" />
    <SkeletonItem className="Classname" />
  </div>
);
