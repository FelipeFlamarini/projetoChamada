FROM node:20.18.0-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN ["npm", "i"]

CMD ["npm", "run", "dev"]