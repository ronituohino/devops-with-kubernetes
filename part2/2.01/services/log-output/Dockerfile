FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
