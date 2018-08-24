FROM node:alpine

LABEL maintainer="Eden Reich<eden.reich@gmail.com"

WORKDIR /app

COPY nodemon.json .
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY ormconfig.json .

RUN npm install

ADD ./src ./src
VOLUME src

EXPOSE 3000

CMD [ "npm", "run", "watch" ]