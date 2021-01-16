import { RootState } from 'Modules/rootType';
import { MockDataTwoState } from '../mockDataTwo.types';

export const selectMockDataTwo = (state: RootState): MockDataTwoState => state.MockDataTwo;
