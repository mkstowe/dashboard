FROM node:lts-alpine AS build
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
COPY .env .
RUN yarn install

COPY . .

EXPOSE 3000
CMD [ "node", "index.js" ]
