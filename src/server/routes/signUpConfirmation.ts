import express from 'express';

import HttpClient from 'Services/HttpClient';
import { URLWrapper } from 'Services/URLWrapper';
import { TokenService } from '../services/TokenService';

const ROUTE_REGEX = '/:lang([a-z]{2})?/sign-up-confirmation/check';

type SignUpConfirmationResponse = {
  data: {
    attributes: {
      id?: string;
      name?: string;
    };
  };
};

const router = express.Router();

// Route not rendered, only redirects
// 1. Received token is validated against API endpoint /users/sign-up-confirmation
// 2. If request succeeded, we create new token using user data and redirect redirect with failure=true with two cookies: sessionData and sessionToken.
// 3. If request failed, we redirect with failure=true

router.get(ROUTE_REGEX, async (req: any, res: any) => {
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
    const sessionToken = await tokenService.createToken(data?.attributes);

    const urlWrapper = new URLWrapper(`${req.protocol}://${req.hostname}`);
    const domainWithoutSubdomain = urlWrapper.getDomainWithoutSubdomain();
    const domainForCookie = `.${domainWithoutSubdomain}`; // Return domain only for recognized clients

    // Disallow robots —crawlers, spiders, etc.—
    res.set({ 'X-Robots-Tag': 'noindex' });

    res
      .cookie('sessionToken', sessionToken, {
        maxAge: 24 * 60 * 60 * 1000 * 30, // One month
        httpOnly: true,
        path: '/',
        domain: domainForCookie,
      })
      .redirect(`/sign-up-confirmation?success=true`);
  } catch (err) {
    await res.redirect('/sign-up-confirmation?failure=true');
  }
});

export default router;
