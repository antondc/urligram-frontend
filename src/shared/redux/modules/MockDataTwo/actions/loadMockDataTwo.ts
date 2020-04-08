import { Dispatch } from 'redux';
import { MockDataTwoApiResponse } from '../mockDataTwo.types';
import { requestMockDataTwo } from './requestMockDataTwo';
import { receiveMockDataTwo } from './receiveMockDataTwo';
import mockDataTwo from '../mockDataTwo.data.json';

export const loadMockDataTwo = () => {
  if (isBrowser) {
    return (dispatch: Dispatch) => {
      const response: MockDataTwoApiResponse = mockDataTwo;
      dispatch(requestMockDataTwo());
      dispatch(receiveMockDataTwo(response.data.MockDataTwo));
    };
  }

  const response: MockDataTwoApiResponse = mockDataTwo;

  return response.data;
};
