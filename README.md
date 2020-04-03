# antoniodiaz.me

## Installing / Getting started

Install packages

        npm i
        npm run start

Local server will run in port `4000`, production conf in `config.test.json`.

## Stack

- React
- Redux
- React-Final-form
- TypeScript
- Node/Express REST API
- Webpack
- Gitlab CI/CD
- Jest & Enzyme
- Less (BEM)

### Prerequisites

- NVM
- NPM

## TODO

- Eliminar cookies library
- Webpack HMR
- Check «Move code from componentWillMount to componentDidMount»
- Webpack enable imports from root: e.g. config.test.json
- Transform js and jsx files to ts and tsx
- Add reselect
- Modularize Redux
- Restructure state:
  - Navigated route to routerLocations
- Rename Control/Control
- const device = require('express-device'); replace for https://www.npmjs.com/package/express-useragent
- Clean unused dependencies

## Docs

### Cookies

-The cookies dependencies are:

    - universal-cookie: https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie#readme, to set and retrieve cookies both from browser and node
    - @types/universal-cookie: https://www.npmjs.com/package/@types/universal-cookie, types for universal-cookie
    - cookie-parser: https://github.com/expressjs/cookie-parser, official parser to access cookies on express

- Cookies are set with following steps:

  - Client

    - User navigates to /login
    - User populates form and submit: src/shared/routes/Login/index.js
    - Action requestToken is called: src/shared/redux/actions.js
    - Request to API is called, the response has a token with user data
    - Token is saved to cookies
    - Reducer is triggered and user data is saved on store: src/shared/redux/reducers.js
    - User navigates
    - The HTTP request has cookie included
    - For all
      -Server
    - For all requests, cookies are checked: src/server/routes/allRoutes.tsx
    - If cookie is ok, user data is included in window.data

  - Client

    - Logic to check cookies is in Cookies: src/shared/services/Cookies.ts
    - For every redux action a Redux middleware will use Cookies to test cookies: If cookies state === COOKIES_INVALID, it will call actions.logOut
    - For every reload Layout component use Cookies to test cookies. If cookies state === COOKIES_INVALID, it will call actions.logOut

  - On Main we have the <Redirect /> component that is loaded depending on the login status of the user, and allows or disallows to access to specific routes: src/shared/routes/Main/index.js

### Webpack build

- Webpack building is done in parallel: client and server. Common configurations are stored in `webpack.dev.js`, also split in dev and prod.

### Cookies

- Cookies set with `universal-cookie`: https://www.npmjs.com/package/universal-cookie. Httponly not in use because client needs access to the cookie. Secure not in use because local deployment needs access via http.

### API calls library

- Fetch is available both on frontend and backend thanks to `isomorphic-fetch`, which adds fetch as a global variable

### React router

- Due to server side rendering we need routes to be described in an object. It is possible to iterate the routes:

      import Routes from '../../routes/routes';
      {Object.values(Routes).map(({ path, exact, component: Component, ...rest }) => {
          return (
              <Route
                  key={path}
                  path={path}
                  exact={exact}
                  render={(props) => {
                      return <Component {...props} {...rest} />;
                  }}
              />
          );
      })}

  Is simpler to maintain them flat tough:

      import Routes from '../../routes/routes';
      <Route
          exact={Routes.Projects.exact}
          path={Routes.Projects.path}
          render={(props) => {
              return <Routes.Projects.component {...props} {...Routes.Projects} />;
          }}
      />
      <Route
          exact={Routes.ProjectsDetail.exact}
          path={Routes.ProjectsDetail.path}
          render={(props) => {
              return <Routes.ProjectsDetail.component {...props} {...Routes.ProjectsDetail} />;
          }}
      />

### Globals

Globals are set in globals.d.ts as in https://bit.ly/2t5bgjr.
Currently empty due to issues with exports

### Enzyme

- Enzyme needs adapter for React 16, see: https://github.com/Microsoft/TypeScript-React-Starter/issues/131

### TypeScript breaking change

https://github.com/microsoft/TypeScript/issues/25260

Needed `"keyofStringsOnly": true`

## License

The MIT License (MIT)

Copyright (c) 2018 Antonio Díaz
