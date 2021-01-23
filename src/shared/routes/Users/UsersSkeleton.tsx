import React from 'react';

import { UserRowSkeleton } from 'Components/UserRow/UserRowSkeleton';
import { Hr } from '@antoniodcorrea/components';

export const UsersSkeleton: React.FC = () => (
  <>
    <UserRowSkeleton id="1" />
    <Hr spacer />
    <UserRowSkeleton id="2" />
    <Hr spacer />
    <UserRowSkeleton id="3" />
    <Hr spacer />
    <UserRowSkeleton id="4" />
    <Hr spacer />
    <UserRowSkeleton id="5" />
    <Hr spacer />
    <UserRowSkeleton id="6" />
    <Hr spacer />
    <UserRowSkeleton id="7" />
    <Hr spacer />
    <UserRowSkeleton id="8" />
    <Hr spacer />
    <UserRowSkeleton id="9" />
    <Hr spacer />
    <UserRowSkeleton id="10" />
  </>
);
