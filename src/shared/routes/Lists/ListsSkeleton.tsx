import React from 'react';

import { ListRowSkeleton } from 'Components/ListRow/ListRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

export const ListsSkeleton: React.FC = () => (
  <>
    <ListRowSkeleton id={1} />
    <Hr spacer />
    <ListRowSkeleton id={2} />
    <Hr spacer />
    <ListRowSkeleton id={3} />
    <Hr spacer />
    <ListRowSkeleton id={4} />
    <Hr spacer />
    <ListRowSkeleton id={5} />
    <Hr spacer />
    <ListRowSkeleton id={6} />
    <Hr spacer />
    <ListRowSkeleton id={7} />
    <Hr spacer />
    <ListRowSkeleton id={8} />
    <Hr spacer />
    <ListRowSkeleton id={9} />
    <Hr spacer />
    <ListRowSkeleton id={0} />
  </>
);
