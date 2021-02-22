import React from 'react';

import { select, withKnobs } from '@storybook/addon-knobs';
import { SortBy } from '.';

export default {
  component: SortBy,
  title: 'SortBy',
  decorators: [withKnobs],
};

const options = [
  {
    label: 'Id',
    field: 'id',
  },
  {
    label: 'Rating',
    field: 'rating',
  },
  {
    label: 'Vote',
    field: 'vote',
  },
  {
    label: 'Created At',
    field: 'createdat',
  },
];

const knobs = {
  activeSort: (): string =>
    select(
      'activeSort',
      [undefined, ...options.map((item) => item.field), ...options.map((item) => `-${item.field}`)],
      'id'
    ),
};

export const Default: React.FC = () => (
  <SortBy
    href="http://www.example.com/en/user/1?page[size]=10&filter[tag]=politics"
    options={options}
    activeSort={knobs.activeSort()}
  />
);
