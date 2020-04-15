import { createSelector } from 'reselect';
import { selectMockDataTwo } from './selectMockDataTwo';
import { MockDataTwoState } from './../mockDataTwo.types';

export const selectMockDataTwoLoading = createSelector(
  selectMockDataTwo,
  (MockDataTwo: MockDataTwoState): boolean => MockDataTwo.loading
);
