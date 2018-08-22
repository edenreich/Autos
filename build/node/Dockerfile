FROM node:latest

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .

RUN npm install

COPY src src

EXPOSE 3000

CMD ["npm", "run", "start"]