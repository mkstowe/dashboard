FROM node AS build
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN node_modules/.bin/ng build

FROM nginx:alpine

COPY --from=build /app/dist/dashboard/ /usr/share/nginx/html

EXPOSE 80
