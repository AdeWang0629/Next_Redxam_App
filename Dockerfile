## BASE ##
FROM node:14.18.1-alpine AS base
RUN apk --no-cache add git py3-pip

WORKDIR /app

## BUILDER ##
FROM base AS builder

# Install production dependencies
COPY *.json ./
# COPY *.json yarn.lock ./
COPY packages/backend/*.json ./packages/backend/
# COPY packages/backend/*.lock ./packages/backend/
# COPY packages/frontend/*.json ./packages/frontend/

RUN yarn --cwd ./packages/backend/ install --production
RUN cp -RL packages/backend/node_modules/ /tmp/backend/node_modules/
# RUN cp -RL packages/frontend/node_modules/ /tmp/frontend/node_modules/

# Install all dependencies
RUN yarn --cwd ./packages/backend/ install --pure-lockfile

# Copy source files
COPY packages/backend/ ./packages/backend/
# COPY packages/frontend/ ./packages/frontend/

# Build
RUN yarn --cwd ./packages/backend/ build
# RUN yarn --cwd ./packages/frontend/ build
RUN yarn install --pure-lockfile

### RUNNER ###
FROM base

# Copy runtime dependencies
COPY --from=builder /tmp/backend/node_modules/ ./backend/node_modules/
# COPY --from=builder /tmp/frontend/node_modules/ ./frontend/node_modules/

# Copy runtime project
COPY --from=builder /app/packages/backend/dist/src/ ./backend/src/
# COPY --from=builder /app/packages/frontend/dist/src/ ./frontend/src/
COPY packages/backend/package.json ./
# COPY packages/frontend/package.json ./

USER node

# RUN yarn start

# CMD ["node", "-r", "tsconfig-paths/register", "src/server.js"]
CMD ["yarn", "start"]