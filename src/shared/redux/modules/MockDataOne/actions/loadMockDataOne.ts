import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import mockDataOne from 'Modules/MockDataOne/mockDataOne.data.json';
import { MockDataOneApiResponse } from 'Modules/MockDataOne/mockDataOne.types';
import { receiveMockDataOne } from './receiveMockDataOne';
import { requestMockDataOne } from './requestMockDataOne';

export const loadMockDataOne = (): ThunkAction<any, any, any, Action> => (dispatch?: Dispatch) => {
  if (isBrowser) {
    const response: MockDataOneApiResponse = mockDataOne;
    dispatch(requestMockDataOne());
    dispatch(receiveMockDataOne(response.data.MockDataOne));

    return;
  }

  const response: MockDataOneApiResponse = mockDataOne;

  return response.data;
};
