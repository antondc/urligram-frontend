import { Dispatch } from 'redux';
import { receiveLanguages } from './receiveLanguages';
import { requestLanguages } from './requestLanguages';
import languages from 'Modules/Languages/languages.data.json';
import { LanguagesApiResponse } from 'Modules/Languages/languages.types';

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
