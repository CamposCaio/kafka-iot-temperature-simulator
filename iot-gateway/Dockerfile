FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn

RUN yarn global add @nestjs/cli

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]
