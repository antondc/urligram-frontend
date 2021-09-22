# Frontend Starter Kit

Starter kit for frontend projects.

## Install

Install packages

    nvm use
    npm ci
    npm run prod

## Development

    nvm use
    npm ci
    npm run dev

Hot module reloading with `webpack-hot-middleware` and `webpack-dev-middleware.

API endpoint points to staging: `https://linking-api-staging.woprs.com/api/v1/`. For API development with both API and client dev set it temporarily to `https://dev.linking.me:3000/api/v1/`.
A different option is to add local IP to clients allowed on API config.test.json, and access frontend from this ip.

## Docs

### Data Loading

- Languages data is loaded only from server via `initialLanguagesLoader`. There are no methods to load them from frontend.

### Create certificate

#### Generate ssl certificates with Subject Alt Names on OSX

<https://gist.github.com/croxton/ebfb5f3ac143cd86542788f972434c96>

#### Create `ssl.conf` file

      [ req ]
      default_bits       = 4096
      distinguished_name = req_distinguished_name
      req_extensions     = req_ext

      [ req_distinguished_name ]
      countryName                 = ES
      countryName_default         = MA
      stateOrProvinceName         = MA
      stateOrProvinceName_default = MA
      localityName                = MA
      localityName_default        = MA
      organizationName            = Linking
      organizationName_default    = Linking
      commonName                  = linking.me
      commonName_max              = 64
      commonName_default          = localhost

      [ req_ext ]
      subjectAltName = @alt_names

      [alt_names]
      DNS.1   = linking.me
      DNS.2   = dev.linking.me

Create a directory ./ssl for your project close to server, and place ssl.conf.
Open this folder.

#### Generate a private key

    openssl genrsa -out private.key 4096

#### Generate a Certificate Signing Request

    openssl req -new -sha256 \
        -out private.csr \
        -key private.key \
        -config ssl.conf

(You will be asked a series of questions about your certificate. Answer however you like, but for 'Common name' enter the name of your project, e.g. `my_project`)

#### Now check the CSR

    openssl req -text -noout -in private.csr

You should see this:

    `X509v3 Subject Alternative Name: DNS:my-project.site` and
    `Signature Algorithm: sha256WithRSAEncryption`

#### Generate the certificate

    openssl x509 -req \
        -sha256 \
        -days 3650 \
        -in private.csr \
        -signkey private.key \
        -out private.crt \
        -extensions req_ext \
        -extfile ssl.conf

#### Add the certificate to Mac keychain and trust it

    sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain private.crt

(Alternatively, double click on the certificate file `private.crt` to open Keychain Access. Your project name `my_project` will be listed under the login keychain. Double click it and select 'Always trust' under the 'Trust' section.)

### Pre-commit tasks

Add to package.json

        "husky": {
          "hooks": {
            "pre-commit": "npm run test:precommit",
            "pre-push": "npm run test:precommit"
          }
        },

### Cookies

Cookies are accessed from backend only thanks to HttpOnly.

Cookie-parser: <https://github.com/expressjs/cookie-parser>, official `Express` parser to access cookies.

Cookies options are set checking if the APP referer is recognized by the API. If so, «domain» will be set with prepending «.» to allow any subdomain. If is not recognised, «domain» will be null; servers will be allowed.

        const cookieOptions: CookieOptions = {
          maxAge: 900000,
          httpOnly: true,
          path: '/',
          sameSite: PRODUCTION ? 'strict' : 'none',
          secure: DEVELOPMENT ? false : true,
        };

Cookies are set in the following steps:

- Client

  - User navigates to `/login`
  - User populates form and submit: src/shared/routes/Login/index.js
  - Action `sessionLogIn` is called: `src/shared/redux/actions.js`
  - Request to `GET` `/login` is called, the response has a cookie with user data, along with user data itself
  - Reducer is triggered and user data is saved on store: `src/shared/redux/reducers.js`
  - User navigates
  - The `HTTPS` request has the cookie included

- Server

  - For all requests, cookies are checked at `src/infrastructure/http/controllers/UserLoginController.ts`, as cookies are an implementation detail.
  - If cookie can be decrypted, user data is returned

- Client

  - Token validator is wrapped in `src/shared/services/Authentication.ts` to handle error

On `<Router/>` we have `<Redirect />` components that are loaded depending on the login status of the user, and allows or disallows to access to specific routes: `src/shared/routes/Router/index.tsx`

### CSS

Used `less`.
The use of `css modules` is discouraged: the reason is the lack of selector nesting. Instead, a custom variant of `BEM` is used:

    MyModule-myElement--myModifier

Autoprefixes are set at webpack

### Webpack build

Webpack building is done in parallel: client and server.

    webpack.client.dev.ts
    webpack.client.prod.ts
    webpack.server.dev.ts
    webpack.server.prod.ts

### API calls

We use Axios, wrapped within an HttpClient singleton.

### Globals

Globals are set in globals.d.ts, see <https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript/45352250#45352250>.

### Enzyme

Enzyme needs adapter for React 16, see: <https://github.com/Microsoft/TypeScript-React-Starter/issues/131>

### React-router `<Switch />` and `location`

In previous implementation `<Swith />` and `<StaticRouter />` were receiving `location`

    ```jsx
    <Switch location={location}></Switch>
    ```

and

    ```jsx
    <StaticRouter location={req.url} context={context}>
      <Route path="/" render={(props): React.ReactNode => <Layout {...props} />} />
    </StaticRouter>
    ```

This prop was removed, as it seems unnecessary

### Thunks, client and server

The data is retrieved from the API via thunks.
The thunks returns async functions to use async/await syntax. On client they are used as usual; on server, we first have to call the thunk, and then the function within it.
See src/server/routes/allRoutes.tsx:27 and src/server/routes/allRoutes.tsx:32

## License

The MIT License (MIT)

Copyright (c) 2020 Antonio Díaz

## Rebuild

[1][2]
