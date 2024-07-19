FROM node:20-alpine

ENV NODE_ENV development
ENV PORT 3000

WORKDIR /app

COPY package*.json yarn.lock ./

RUN apk add --no-cache tini

RUN yarn install --frozen-lockfile && \
    yarn cache clean

COPY . .

ENV NODE_ENV production

RUN yarn run build

EXPOSE $PORT

ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node", "dist/main"]
