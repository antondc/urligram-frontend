import React from 'react';

import { ProviderWrapper } from 'Tools/storybook/provider';
import { H1, Hr } from 'Vendor/components';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import Pagination from './index';

export default {
  component: Pagination,
  title: 'Pagination',
  decorators: [withKnobs],
};

const knobs = {
  totalItems: (): number => number('Total Items', 100),
  itemsPerPage: (): number => number('Items per page', 10),
  offset: (): number => number('Offset', 30),
  pageNeighbours: (): number => number('Page neigbours', 2),
  path: (): string => text('Path', 'https://example.com'),
};

export const Default: React.FC = () => (
  <ProviderWrapper>
    <H1>Pagination</H1>
    <Hr spacer />
    <Pagination
      totalItems={knobs.totalItems()}
      itemsPerPage={knobs.itemsPerPage()}
      offset={knobs.offset()}
      pageNeighbours={knobs.pageNeighbours()}
      path={knobs.path()}
    />
  </ProviderWrapper>
);
