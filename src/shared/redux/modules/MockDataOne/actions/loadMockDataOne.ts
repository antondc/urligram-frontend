import { Dispatch } from 'redux';
import { MockDataOneApiResponse } from 'Modules/MockDataOne/mockDataOne.types';
import { requestMockDataOne } from './requestMockDataOne';
import { receiveMockDataOne } from './receiveMockDataOne';
import mockDataOne from 'Modules/MockDataOne/mockDataOne.data.json';

export const loadMockDataOne = () => {
  return (dispatch?: Dispatch) => {
    if (isBrowser) {
      const response: MockDataOneApiResponse = mockDataOne;
      dispatch(requestMockDataOne());
      dispatch(receiveMockDataOne(response.data.MockDataOne));

      return;
    }

    const response: MockDataOneApiResponse = mockDataOne;

    return response.data;
  };
};
