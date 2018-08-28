FROM node:alpine

LABEL maintainer="Eden Reich<eden.reich@gmail.com>"

WORKDIR /app

COPY nodemon.json .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN apk add --no-cache make gcc g++ python && \
  npm install --silent && \
  apk del make gcc g++ python

ADD ./src ./src
VOLUME /app/src

ADD ./tests ./tests
VOLUME /app/tests

EXPOSE 3000

CMD [ "npm", "run", "watch" ]