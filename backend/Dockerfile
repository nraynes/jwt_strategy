FROM node:16.7.0-alpine3.11

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 3001

CMD [ "npm", "start" ]