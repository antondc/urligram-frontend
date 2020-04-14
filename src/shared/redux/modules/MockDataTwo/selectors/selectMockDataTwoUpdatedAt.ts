import { createSelector } from 'reselect';
import { selectMockDataTwo } from './selectMockDataTwo';
import { MockDataTwoState } from './../mockDataTwo.types';

export const selectMockDataTwoUpdatedAt = createSelector(
  selectMockDataTwo,
  (MockDataTwo: MockDataTwoState): string => MockDataTwo.updatedAt || ''
);
