import { Dispatch } from 'redux';
import { MockDataOneApiResponse } from '../mockDataOne.types';
import { requestMockDataOne } from './requestMockDataOne';
import { receiveMockDataOne } from './receiveMockDataOne';
import mockDataOne from '../mockDataOne.data.json';

export const loadMockDataOne = () => {
  if (isBrowser) {
    return (dispatch: Dispatch) => {
      const response: MockDataOneApiResponse = mockDataOne;
      dispatch(requestMockDataOne());
      dispatch(receiveMockDataOne(response.data.MockDataOne));
    };
  }

  const response: MockDataOneApiResponse = mockDataOne;

  return response.data;
};
