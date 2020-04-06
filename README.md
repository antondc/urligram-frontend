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

- Cargar todo el glosario y no solo el current Language, cargar junto con initial data ❌
- Transform js and jsx files to ts and tsx ❌
- Add reselect ❌
- Modularize Redux ❌
- Restructure state: ❌
- Navigated route to routerLocations ❌
- Remove default Languages first load from allRoutes 👍
- loadInitialRoute a array de acciones 👍
- Renombrar «Languages.languages»en allRoutes. 👍
- Use httpOnly and retrieve cookies on server only 👍
- Replace express-device for https://www.npmjs.com/package/express-useragent 👍
- Update Jest 👍
- Webpack add autoprefixer 👍
- const device = require('express-device'); replace for https://www.npmjs.com/package/express-useragent 👍
- Webpack configure webpack production css build 👍
- Webpack enable imports from root: e.g. config.test.json 👍
- Open browser on start. Wont work «webpack --watch --config ./webpack.server.dev.js & node --inspect=9228 ./dist/server.js & open http://0.0.0.0:4000"» 👍
- Clean and sort packages on package.json and clean unused dependencies 👍
- Check «Move code from componentWillMount to componentDidMount» 👍
- Webpack HMR 👍
- Rename Control/Control 👍
- Eliminar cookies library 👍

## Development

- Using webpack-hot-middleware and webpack-dev-middleware:

  - https://github.com/webpack-contrib/webpack-hot-middleware
  - https://github.com/webpack/webpack-hot-middleware

Restarting the server has to be done after the bundles are built, but nodemon will disconnect webpack-hot-middleware https://medium.com/@binyamin/get-nodemon-to-restart-after-webpack-re-build-8746db80548e

Have a look to this repository:

- https://medium.com/@binyamin/get-nodemon-to-restart-after-webpack-re-build-8746db80548e
- https://github.com/glenjamin/ultimate-hot-reloading-example

## Docs

### Cookies

- Cookies are accesssed from backend only thanks to HttpOnly

- The cookies dependencies are:

  - cookie-parser: https://github.com/expressjs/cookie-parser, official parser to access cookies on express

- Cookies are set with following steps:

  - Client

    - User navigates to /login
    - User populates form and submit: src/shared/routes/Login/index.js
    - Action requestLogIn is called: src/shared/redux/actions.js
    - Request to GET /login is called, the response has a cookie with user data, along with user data itself
    - Reducer is triggered and user data is saved on store: src/shared/redux/reducers.js
    - User navigates
    - The HTTP request has cookie included

  - Server

    - For all requests, cookies are checked: src/server/routes/allRoutes.tsx
    - If cookie is ok, user data is included in window.data

  - Client

    - Token validator is wrapped in src/shared/services/Cookies.ts to handle error

- On <Main/> we have the <Redirect /> component that is loaded depending on the login status of the user, and allows or disallows to access to specific routes: src/shared/routes/Main/index.js

### CSS

- Used less without css modules. The reason is the lack of selector nesting. Instead, a custom variant of BEM is used:

      MyModule-myElement--myModifier

- Autoprefixes are coming from a webpack loader

### Webpack build

- Webpack building is done in parallel: client and server.

      webpack.client.dev.ts
      webpack.client.prod.ts
      webpack.server.dev.ts
      webpack.server.prod.ts

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
