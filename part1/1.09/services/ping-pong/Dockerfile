FROM node:22-alpine3.19

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3001

CMD ["npm", "run", "start"]
