import { Dispatch } from 'redux';

import mockDataTwo from 'Modules/MockDataTwo/mockDataTwo.data.json';
import { MockDataTwoApiResponse } from 'Modules/MockDataTwo/mockDataTwo.types';
import { receiveMockDataTwo } from './receiveMockDataTwo';
import { requestMockDataTwo } from './requestMockDataTwo';

export const loadMockDataTwo = () => (dispatch?: Dispatch) => {
  if (isBrowser) {
    const response: MockDataTwoApiResponse = mockDataTwo;
    dispatch(requestMockDataTwo());
    setTimeout(() => {
      const updatedMockDataTwo = Object.assign(response.data.MockDataTwo, { updatedAt: new Date().toISOString() });
      dispatch(receiveMockDataTwo(updatedMockDataTwo));
    }, 1000);

    return;
  }

  const response: MockDataTwoApiResponse = mockDataTwo;

  return response.data;
};
