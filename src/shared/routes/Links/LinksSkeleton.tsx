import React from 'react';

import { LinkRowSkeleton } from 'Components/LinkRow/LinkRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

export const LinksSkeleton: React.FC = () => (
  <>
    <LinkRowSkeleton id={1} />
    <Hr spacer />
    <LinkRowSkeleton id={2} />
    <Hr spacer />
    <LinkRowSkeleton id={3} />
    <Hr spacer />
    <LinkRowSkeleton id={4} />
    <Hr spacer />
    <LinkRowSkeleton id={5} />
    <Hr spacer />
    <LinkRowSkeleton id={6} />
    <Hr spacer />
    <LinkRowSkeleton id={7} />
    <Hr spacer />
    <LinkRowSkeleton id={8} />
    <Hr spacer />
    <LinkRowSkeleton id={9} />
    <Hr spacer />
    <LinkRowSkeleton id={10} />
  </>
);
