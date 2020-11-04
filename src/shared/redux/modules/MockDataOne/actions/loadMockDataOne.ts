import { Dispatch } from 'redux';

import mockDataOne from 'Modules/MockDataOne/mockDataOne.data.json';
import { MockDataOneApiResponse } from 'Modules/MockDataOne/mockDataOne.types';
import { receiveMockDataOne } from './receiveMockDataOne';
import { requestMockDataOne } from './requestMockDataOne';

export const loadMockDataOne = () => (dispatch?: Dispatch) => {
  if (isBrowser) {
    const response: MockDataOneApiResponse = mockDataOne;
    dispatch(requestMockDataOne());
    dispatch(receiveMockDataOne(response.data.MockDataOne));

    return;
  }

  const response: MockDataOneApiResponse = mockDataOne;

  return response.data;
};
