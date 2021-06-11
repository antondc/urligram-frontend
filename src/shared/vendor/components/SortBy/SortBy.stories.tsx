import React from 'react';

import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { SortBy } from '.';

export default {
  component: SortBy,
  title: 'SortBy',
  decorators: [withKnobs],
};

const knobs = {
  sort: (): string => select('Sort', ['sort1', '-sort1', 'sort2', '-sort2', 'sort3', '-sort3', undefined], '-sort1'),
  loading: (): boolean => boolean('Loading', false),
};

export const Default: React.FC = () => (
  <div style={{ padding: '10px' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <SortBy
        href="http://example.com"
        options={[
          {
            label: 'sort1',
            field: 'sort1',
          },
          {
            label: 'sort2',
            field: 'sort2',
          },
          {
            label: 'sort3',
            field: 'sort3',
          },
        ]}
        currentSort={knobs.sort()}
        loading={knobs.loading()}
      />
    </div>
  </div>
);
