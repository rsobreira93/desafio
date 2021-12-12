FROM node:alpine3.14

WORKDIR /user/app

COPY package*.json yarn.lock ormconfig.docker.json ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]