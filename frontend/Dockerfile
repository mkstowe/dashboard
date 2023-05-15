FROM node:18 as build
WORKDIR /app
COPY ./package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./ ./
RUN yarn build

FROM nginx:1.23.0-alpine
EXPOSE 8080
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/hass-angular /usr/share/nginx/html
