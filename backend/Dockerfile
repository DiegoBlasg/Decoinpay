FROM node:16

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm link

COPY . .

EXPOSE 4000

CMD [ "npm", "start"]