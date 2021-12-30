FROM node:14-alpine3.12
ADD . /opt/home-app
WORKDIR /opt/home-app

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]