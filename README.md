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

## Docs

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
