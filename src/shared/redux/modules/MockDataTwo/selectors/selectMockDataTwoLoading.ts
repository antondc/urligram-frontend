import { createSelector } from 'reselect';
import get from 'lodash/get';

import { MockDataTwoState } from './../mockDataTwo.types';
import { selectMockDataTwo } from './selectMockDataTwo';

export const selectMockDataTwoLoading = createSelector(selectMockDataTwo, (MockDataTwo: MockDataTwoState): boolean =>
  get(MockDataTwo, 'loading', false)
);
