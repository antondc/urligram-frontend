import C from './constants';
import mockDataOne from './modules/MockDataOne/mockDataOne.data.json';
import mockDataTwo from './modules/MockDataTwo/mockDataTwo.data.json';
import languages from './modules/Language/language.data.json';

const actions = {
  requestLanguages: () => {
    return {
      type: C.LOAD_LANGUAGES_STARTED,
    };
  },

  receiveLanguages: data => {
    return {
      type: C.LOAD_LANGUAGES_SUCCESS,
      data,
    };
  },

  loadLanguages: () => {
    if (isBrowser) {
      return dispatch => {
        dispatch(actions.requestLanguages());
        dispatch(actions.receiveLanguages(languages.data));
      };
    }
    return languages.data;
  },

  requestMockDataOne: () => {
    return {
      type: C.LOAD_MOCK_DATA_ONE_STARTED,
    };
  },

  receiveMockDataOne: data => {
    return {
      type: C.LOAD_MOCK_DATA_ONE_SUCCESS,
      data,
    };
  },

  loadMockDataOne: () => {
    if (isBrowser) {
      return dispatch => {
        dispatch(actions.requestMockDataOne());
        dispatch(actions.receiveMockDataOne(mockDataOne.data));
      };
    }
    return mockDataOne.data;
  },

  requestMockDataTwo: () => {
    return {
      type: C.LOAD_MOCK_DATA_TWO_STARTED,
    };
  },

  receiveMockDataTwo: data => {
    return {
      type: C.LOAD_MOCK_DATA_TWO_SUCCESS,
      data,
    };
  },

  loadMockDataTwo: () => {
    if (isBrowser) {
      return dispatch => {
        dispatch(actions.requestMockDataTwo());
        dispatch(actions.receiveMockDataTwo(mockDataTwo.data));
      };
    }
    return mockDataTwo.data;
  },
};

export default actions;
