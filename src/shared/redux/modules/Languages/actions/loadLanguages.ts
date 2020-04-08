import { Dispatch } from 'redux';
import { receiveLanguages } from './receiveLanguages';
import { requestLanguages } from './requestLanguages';
import languages from '../languages.data.json';
import { LanguagesApiResponse } from '../languages.types';

export const loadLanguages = () => {
  if (isBrowser) {
    return (dispatch: Dispatch) => {
      const response: LanguagesApiResponse = languages;

      dispatch(requestLanguages());
      dispatch(receiveLanguages(response.data.Languages));
    };
  }
  const response: LanguagesApiResponse = languages;

  return response.data;
};
