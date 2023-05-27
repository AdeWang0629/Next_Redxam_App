## BASE ##
FROM node:14.18.1-alpine AS base

RUN apt-get update && apt-get install --no-install-recommends --yes openssl

WORKDIR /app

## BUILDER ##
FROM base AS builder

# Install production dependencies
COPY *.json yarn.lock ./
COPY packages/backend/*.json ./packages/backend/


RUN yarn install --production --pure-lockfile
RUN cp -RL packages/backend/node_modules/ /tmp/node_modules/


COPY . /app

CMD [ "npm", "run", "start:prod" ]