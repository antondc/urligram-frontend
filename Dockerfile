# syntax=docker/dockerfile:1

FROM node:18-bookworm AS base
WORKDIR /app

ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

ARG API_URL
ENV API_URL=${API_URL}
ARG APP_ENV
ENV APP_ENV=${APP_ENV}

COPY package.json package-lock.json ./
COPY .npmrc ./.npmrc

# Dependencies (dev)
FROM base AS deps-dev
ENV NODE_ENV=development
RUN npm ci

# Dependencies (prod)
FROM base AS deps-prod
ENV NODE_ENV=production
RUN npm ci --omit=dev


# Dev runtime
FROM base AS development-runtime
WORKDIR /app
ENV NODE_ENV=development

COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .

CMD ["npm", "run", "dev"]


# Prod build
FROM base AS production-build
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .

RUN npm run prod


# Prod runtime
FROM node:18-bookworm-slim AS production-runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps-prod /app/node_modules ./node_modules

COPY --from=production-build /app/dist ./dist
COPY --from=production-build /app/src ./src

CMD ["node", "dist/server.js"]
