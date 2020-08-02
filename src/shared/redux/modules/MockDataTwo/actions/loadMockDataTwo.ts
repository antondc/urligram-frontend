import { Dispatch } from 'redux';
import { MockDataTwoApiResponse } from 'Modules/MockDataTwo/mockDataTwo.types';
import { requestMockDataTwo } from './requestMockDataTwo';
import { receiveMockDataTwo } from './receiveMockDataTwo';
import mockDataTwo from 'Modules/MockDataTwo/mockDataTwo.data.json';

export const loadMockDataTwo = () => {
  return (dispatch?: Dispatch) => {
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
};
