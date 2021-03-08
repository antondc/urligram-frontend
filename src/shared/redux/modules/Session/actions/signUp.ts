import { Dispatch } from 'redux';

import { switchLoginModal } from 'Modules/Ui/actions/switchLoginModal';
// import HttpClient from 'Services/HttpClient';
import { SignUpRequest, SignUpResponse } from './../session.types';
import { signUpFailure } from './signUpFailure';
import { signUpRequest } from './signUpRequest';
import { signUpSuccess } from './signUpSuccess';

export const signUp = (userData: SignUpRequest) => async (dispatch: Dispatch): Promise<void> => {
  try {
    await dispatch(signUpRequest());

    const HttpClient = (userData): Promise<SignUpResponse> => {
      console.log(JSON.stringify(userData, null, 4));

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              success: true,
              attributes: {
                id: 'string',
                name: 'string',
                email: 'string',
                status: 'inactive',
                level: 'user',
                token: 'string',
              },
            },
          });
        }, 1000);
      });
    };
    // const { data }: SignUpResponse = await HttpClient.post('/sign-up', userData);
    const { data }: SignUpResponse = await HttpClient(userData);
    // if (!data.success) throw new Error(data.error.message);

    console.log(JSON.stringify(data, null, 4));

    await dispatch(switchLoginModal(false));
    await dispatch(signUpSuccess(data.attributes));
  } catch (err) {
    await dispatch(signUpFailure(err));
    throw new Error(err);
  }
};
