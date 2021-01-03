# Frontend Starter Kit

Starter kit for frontend projects.

### Prerequisites

- TypeScript

## Install

Install packages

    nvm use
    npm ci
    npm run prod

Local server will run in port `4000`, production conf in `config.test.json`.

## Development

    nvm use
    npm ci
    npm run dev

Hot module reloading with `webpack-hot-middleware` and `webpack-dev-middleware.

## Stack

- React
- Redux
- Express
- Reselect
- Less
- TypeScript
- Webpack
- Gitlab CI/CD
- Jest & Enzyme

## Docs

### Cookies

Cookies are accesssed from backend only thanks to HttpOnly.

Cookie-parser: https://github.com/expressjs/cookie-parser, official `Express` parser to access cookies.

Cookies are set in the following steps:

- Client

  - User navigates to `/login`
  - User populates form and submit: src/shared/routes/Login/index.js
  - Action `logIn` is called: `src/shared/redux/actions.js`
  - Request to `GET` `/login` is called, the response has a cookie with user data, along with user data itself
  - Reducer is triggered and user data is saved on store: `src/shared/redux/reducers.js`
  - User navigates
  - The `HTTP` request has the cookie included

- Server

  - For all requests, cookies are checked at `src/server/routes/allRoutes.tsx`
  - If cookie can be decrypted, user data is included in `window.__PRELOADED_STATE__`

- Client

  - Token validator is wrapped in `src/shared/services/Cookies.ts` to handle error

On `<Router/>` we have `<Redirect />` components that are loaded depending on the login status of the user, and allows or disallows to access to specific routes: `src/shared/routes/Router/index.js`

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

Globals are set in globals.d.ts, see https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript/45352250#45352250.

### Enzyme

Enzyme needs adapter for React 16, see: https://github.com/Microsoft/TypeScript-React-Starter/issues/131

### React-router `<Switch />` and `location`

In previous implementation `<Swith />` and `<StaticRouter />` were receiving `location`

```
<Switch location={location}></Switch>
```

and

```
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
