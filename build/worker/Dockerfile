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
VOLUME src

ADD ./tests ./tests
VOLUME tests

RUN echo '*/10 * * * * /app/node_modules/.bin/ts-node --compiler typescript --project /app/tsconfig.json /app/src/Scheduler/jobs.ts' > /etc/crontabs/root

CMD [ "crond", "-f" ]