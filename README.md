# antoniodiaz.me

## Installing / Getting started

Install packages

    npm i
    npm run start

Local server will run in port `4000`, production conf in `config.test.json`.

## Stack

- React
- Redux
- TypeScript
- Webpack
- Gitlab CI/CD
- Jest & Enzyme
- Less (BEM)

### Prerequisites

- NVM
- NPM

## Development

- Using webpack-hot-middleware and webpack-dev-middleware:

  - https://github.com/webpack-contrib/webpack-hot-middleware
  - https://github.com/webpack/webpack-hot-middleware

## Docs

### Cookies

- Cookies are accesssed from backend only thanks to HttpOnly

- The cookies dependencies are:

  - cookie-parser: https://github.com/expressjs/cookie-parser, official parser to access cookies on express

- Cookies are set with following steps:

  - Client

    - User navigates to /login
    - User populates form and submit: src/shared/routes/Login/index.js
    - Action logIn is called: src/shared/redux/actions.js
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

### API calls

- An API client is created for each case in Services/Api. Currently using axios

### Globals

Globals are set in globals.d.ts as in https://bit.ly/2t5bgjr.
Currently empty due to issues with exports

### Enzyme

- Enzyme needs adapter for React 16, see: https://github.com/Microsoft/TypeScript-React-Starter/issues/131

### TypeScript breaking change

https://github.com/microsoft/TypeScript/issues/25260

Needed `"keyofStringsOnly": true`

### React-router Switch and location

In previous implementation Swith and StaticRouter were receiving `location`

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

## License

The MIT License (MIT)

Copyright (c) 2018 Antonio Díaz
