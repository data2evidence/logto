###### [STAGE] Build ######
FROM node:20-alpine as builder
WORKDIR /etc/logto
ENV CI=true

# No need for Docker build
ENV PUPPETEER_SKIP_DOWNLOAD=true

### Install toolchain ###
RUN npm add --location=global pnpm@^9.0.0
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#node-gyp-alpine
RUN apk add --no-cache python3 make g++ rsync py3-setuptools git 

COPY . .

RUN git clone --branch v0.0.1-alpha https://github.com/OHDSI/d2e.git /etc/d2e
RUN cp /etc/d2e/services/alp-logto/to-replace/SignIn/Main.tsx /etc/logto/packages/experience/src/pages/SignIn/Main.tsx
RUN cp /etc/d2e/services/alp-logto/to-replace/core/src/libraries/jwt-customizer.ts /etc/logto/packages/core/src/libraries/jwt-customizer.ts
RUN cp -r /etc/d2e/services/alp-logto/connector-alp-azuread /etc/logto/packages/connectors/connector-alp-azuread

### Install dependencies and build ###
RUN pnpm i

### Set if dev features enabled ###
ARG dev_features_enabled
ENV DEV_FEATURES_ENABLED=${dev_features_enabled}

ARG applicationinsights_connection_string
ENV APPLICATIONINSIGHTS_CONNECTION_STRING=${applicationinsights_connection_string}

RUN pnpm -r build

### Add official connectors ###
ARG additional_connector_args
ENV ADDITIONAL_CONNECTOR_ARGS=${additional_connector_args}
RUN pnpm cli connector link $ADDITIONAL_CONNECTOR_ARGS -p .

### Prune dependencies for production ###
RUN rm -rf node_modules packages/**/node_modules
RUN NODE_ENV=production pnpm i

### Clean up ###
RUN rm -rf .scripts pnpm-*.yaml packages/cloud
RUN rm -rf /etc/d2e

###### [STAGE] Seal ######
FROM node:20-alpine as app
RUN apk update && apk add openssl>3
WORKDIR /etc/logto
COPY --from=builder /etc/logto .
RUN mkdir -p /etc/logto/packages/cli/alteration-scripts && chmod g+w /etc/logto/packages/cli/alteration-scripts
EXPOSE 3001
ENTRYPOINT ["npm", "run"]
CMD ["start"]
