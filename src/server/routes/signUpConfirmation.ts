import express from 'express';

import HttpClient from 'Root/src/shared/services/HttpClient';
import { TokenService } from 'Root/src/shared/services/TokenService';
import { URLWrapper } from 'Root/src/shared/services/URLWrapper';

type SignUpConfirmationResponse = {
  data: {
    attributes: {
      id?: string;
      name?: string;
    };
  };
};

const router = express.Router();

// Route not rendered
// On user creation name and token will be validated, session will be embedded in the cookie, and user will be routed accordingly
router.get('/:lang([a-z]{2})?/sign-up-confirmation/check', async (req: any, res: any) => {
  const queryParams = {
    name: req.query.name,
    token: req.query.token,
  };
  try {
    const { data } = await HttpClient.post<void, SignUpConfirmationResponse>(
      '/users/sign-up-confirmation',
      queryParams
    );

    const tokenService = new TokenService();
    const token = await tokenService.createToken(data?.attributes);
    const urlWrapper = await new URLWrapper(`${req.protocol}://${req.hostname}`);
    const domainForCookie = await urlWrapper.getDomainWithoutSubdomain(); // Return domain only for recognized clients

    await res
      .cookie('sessionToken', token, {
        maxAge: 24 * 60 * 60 * 1000 * 30, // One month
        httpOnly: true,
        path: '/',
        domain: domainForCookie, // We need to prepend «.» to enable any subdomain
      })
      .redirect('/sign-up-confirmation?success=true');
  } catch {
    await res.redirect('/sign-up-confirmation?failure=true');
  }
});

export default router;
