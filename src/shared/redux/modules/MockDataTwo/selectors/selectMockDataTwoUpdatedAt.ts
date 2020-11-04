import { createSelector } from 'reselect';

import { MockDataTwoState } from './../mockDataTwo.types';
import { selectMockDataTwo } from './selectMockDataTwo';

export const selectMockDataTwoUpdatedAt = createSelector(
  selectMockDataTwo,
  (MockDataTwo: MockDataTwoState): string => MockDataTwo.updatedAt || ''
);
